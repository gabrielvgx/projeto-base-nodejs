FROM node:25-slim

RUN apt-get update -y && apt-get install -y openssl &&\
    apt-get clean && rm -rf /var/lib/apt/lists/*