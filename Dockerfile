FROM node:8.9

COPY . /usr/src/app

RUN npm install --production -q && \
    yarn run build && \
    yarn cache clean

