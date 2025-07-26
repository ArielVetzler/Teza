import aioredis
import json
from typing import Dict, Any


class RedisJobQueue:
    def __init__(self, redis_url: str = "redis://localhost"):
        self.redis_url = redis_url
        self.redis = None

    async def connect(self):
        self.redis = await aioredis.create_redis_pool(self.redis_url)

    async def disconnect(self):
        if self.redis:
            await self.redis.close()

    async def push_job(self, queue_name: str, job_data: Dict[str, Any]):
        """Pushes a job onto the specified Redis queue."""
        if not self.redis:
            await self.connect()
        await self.redis.rpush(queue_name, json.dumps(job_data))

    async def pop_job(self, queue_name: str, timeout: int = 1) -> Dict[str, Any] or None:
        """Pops a job from the specified Redis queue, blocking until a job is available or timeout occurs."""
        if not self.redis:
            await self.connect()
        result = await self.redis.blpop(queue_name, timeout=timeout)
        job_data_bytes = str()
        if result:
            _, job_data_bytes = result
        if job_data_bytes:
            return json.loads(job_data_bytes)
        return None


# Example Usage (for testing the class independently)
async def main():
    queue = RedisJobQueue()
    await queue.connect()

    # Test pushing and popping a job
    test_job = {"article_id": "123", "content": "This is a test article for LLM processing."}
    await queue.push_job("llm_jobs", test_job)
    print(f"Pushed job: {test_job}")

    popped_job = await queue.pop_job("llm_jobs")
    print(f"Popped job: {popped_job}")

    await queue.disconnect()


if __name__ == "__main__":
    import asyncio

    asyncio.run(main())
