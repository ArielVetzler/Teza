FROM python:3.10-slim

WORKDIR /app

# # Only copy requirements first to enable Docker cache
# COPY Backend/requirements.txt .
#
# RUN pip install --no-cache-dir -r requirements.txt
#
# # Then copy the rest
# COPY Backend/ .

EXPOSE 8000

# Define the ENTRYPOINT for the container.
# This makes the container behave like an executable.
# We explicitly use the full path to python for robustness.
ENTRYPOINT ["/usr/local/bin/python", "-m", "uvicorn"]

# CMD provides the default arguments to the ENTRYPOINT.
# If you run the container with additional arguments, they will override this CMD.
CMD ["echo", "?"]