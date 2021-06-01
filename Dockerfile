# base image for all others
FROM node:14.16.0-buster-slim as base

WORKDIR /app
ENV PATH=$PATH:/app/node_modules/.bin
COPY package.json yarn.lock ./
RUN yarn global add @quasar/cli
RUN yarn --frozen-lockfile --production


# test stage
FROM base as test

# some additional deps for cypress
RUN apt-get update -y && apt-get install libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb -y && rm -rf /var/lib/apt/lists/*
# make yarn install deps, this time without the --production flag (we need dev deps for testing)
RUN yarn --frozen-lockfile
COPY . /app


FROM base as dev
# create a mount point in /app, so we can dev in the container
VOLUME ["/app"]
# some additional deps for cypress, don't clean apt cache (prevents docker from caching this layer)
RUN apt-get update -y && apt-get install libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb -y  && rm -rf /var/lib/apt/lists/*
# make yarn install deps, this time without the --production flag (we need dev deps for testing)
RUN yarn --frozen-lockfile
COPY . /app
# hot-reload doesn't work on save, but on polling while in container
ENV CHOKIDAR_USEPOLLING=true

FROM base as preprod
COPY . /app
RUN quasar build

FROM preprod as prod

COPY --from=preprod /app/dist /app
EXPOSE 4000
CMD ["quasar", "serve"]




