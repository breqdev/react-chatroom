import functools
import asyncio

from quart import Quart, websocket, copy_current_websocket_context

app = Quart(__name__)

websockets = set()


def collect_websocket(func):
    @functools.wraps(func)
    async def wrapper(*args, **kwargs):
        global websockets
        queue = asyncio.Queue()
        websockets.add(queue)
        try:
            return await func(queue, *args, **kwargs)
        finally:
            websockets.remove(queue)
    return wrapper


async def broadcast(message):
    for queue in websockets:
        await queue.put(message)


async def consumer():
    while True:
        data = await websocket.receive()
        await broadcast(data)


async def producer(queue):
    while True:
        data = await queue.get()
        await websocket.send(data)


@app.websocket("/")
@collect_websocket
async def index(queue):
    consumer_task = asyncio.create_task(
        copy_current_websocket_context(consumer)())
    producer_task = asyncio.create_task(
        copy_current_websocket_context(producer)(queue))
    try:
        await asyncio.gather(consumer_task, producer_task)
    finally:
        consumer_task.cancel()
        producer_task.cancel()


if __name__ == "__main__":
    app.run("0.0.0.0")
