FROM node:14.16-slim-buster AS install

WORKDIR /app
COPY . /app
RUN apt update -y && apt install yarn -y && rm -rf /var/lib/apt/lists/*
RUN yarn install




