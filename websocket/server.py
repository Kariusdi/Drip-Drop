import asyncio
import websockets
import random

connected_clients = set()

async def broadcast_numbers():
    while True:
        if connected_clients:
            upper_limit = random.randint(0, 10)
            print(f"Broadcasting numbers 0 to {upper_limit} to all clients...")
            for number in range(upper_limit + 1):
                message = str(number)
                # Broadcast to all connected clients
                await asyncio.gather(
                    *[client.send(message) for client in connected_clients if client.open],
                    return_exceptions=True  # avoids cancellation due to one failing client
                )
                print(f"Sent: {message}")
                await asyncio.sleep(0.2)  # simulate delay per number
                if not connected_clients:
                    break
            await asyncio.sleep(3)
        else:
            await asyncio.sleep(1)

async def handler(websocket):
    connected_clients.add(websocket)
    print(f"Client connected: {websocket.remote_address}")
    try:
        await websocket.wait_closed()
    finally:
        connected_clients.remove(websocket)
        print(f"Client disconnected: {websocket.remote_address}")

async def main():
    server = await websockets.serve(handler, "localhost", 8765)
    print("WebSocket server is running on ws://localhost:8765")
    await broadcast_numbers()  # start broadcasting loop

if __name__ == "__main__":
    asyncio.run(main())
