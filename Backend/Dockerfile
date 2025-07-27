FROM python:3.10-slim

WORKDIR /app

COPY Backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt &&     pip install --no-cache-dir torch==2.2.2+cpu torchvision==0.17.2+cpu torchaudio==2.2.2+cpu -f https://download.pytorch.org/whl/torch_stable.html &&     rm -rf /root/.cache

COPY Backend/. .

EXPOSE 8000

CMD ["python", "-m", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "1"]
