FROM python:3.10-slim
WORKDIR /app

COPY Backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY Backend/ .

# Debugging (optional)
RUN which uvicorn
RUN ls -la $(which uvicorn)
RUN ls -la /app

EXPOSE 8000

CMD ["python", "-m", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
