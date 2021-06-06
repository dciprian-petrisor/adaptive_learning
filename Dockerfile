# base image for all others
FROM node:14.16.1-alpine3.13 as base

WORKDIR /app
ENV PATH=$PATH:/app/node_modules/.bin
COPY package.json yarn.lock ./
RUN yarn global add @quasar/cli
RUN yarn --frozen-lockfile --production


# test stage
FROM base as test


# make yarn install deps, this time without the --production flag (we need dev deps for testing)
RUN yarn --frozen-lockfile \
    && apk --no-cache add bash libevent chromium xwininfo xvfb dbus eudev ttf-freefont fluxbox procps tzdata
COPY . /app


FROM base as dev
# create a mount point in /app, so we can dev in the container
VOLUME ["/app"]
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




