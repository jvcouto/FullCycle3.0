FROM node:16.20.2


WORKDIR /app

COPY ./src /app/

RUN npm install

EXPOSE 3000

CMD [ "node", "app.mjs" ]