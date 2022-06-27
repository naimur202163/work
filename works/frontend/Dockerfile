FROM node:lts-alpine as builder
WORKDIR /usr/src/app
COPY ./ ./
RUN npm install
RUN npm run build


FROM nginx:latest
WORKDIR /usr/share/nginx/html
RUN rm -rf /usr/share/nginx/html/*
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
