FROM node:20.12.2-alpine

RUN mkdir /work
WORKDIR /work

COPY . /work

RUN npm install

VOLUME /work/node_modules