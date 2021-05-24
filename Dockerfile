FROM golang:latest as builder
ADD . /app/
WORKDIR /app/backend

FROM node:14.15-alpine3.12 as node_builder
COPY --from=builder /app/frontend ./
RUN yarn install
RUN yarn build

FROM alpine:latest
RUN apk --no-cache add ca-certificates
COPY --from=node_builder /build ./web
EXPOSE 8080