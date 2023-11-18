FROM python:3.12

# Set the working directory to /app
WORKDIR /backend

COPY requirements.txt /backend

# Install any needed packages specified in requirements.txt
RUN pip3 install -r requirements.txt

# Copy the current directory contents into the container at /app
COPY . /backend

# Make port 8000 available to the world outside this container
EXPOSE 8000

ENV PYTHONPATH=/

CMD ["uvicorn", "main:app", "--host", ""]
