FROM node:16.20.2


WORKDIR /app

COPY . /app/

RUN npm install

EXPOSE 3000

ENTRYPOINT [ "node", "app.mjs" ]