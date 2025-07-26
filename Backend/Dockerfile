# Stage 1: Build the application
FROM python:3.10-slim AS builder

WORKDIR /app

# Install system dependencies
RUN apt-get update && \
    apt-get install -y --no-install-recommends build-essential git && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY Backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY Backend/ .

# Stage 2: Final image
FROM python:3.10-slim

WORKDIR /app

# Copy installed dependencies and binaries
COPY --from=builder /usr/local/lib/python3.10/site-packages /usr/local/lib/python3.10/site-packages
COPY --from=builder /usr/local/bin /usr/local/bin
COPY --from=builder /app /app

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
