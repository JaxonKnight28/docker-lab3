FROM node:16.3.0

LABEL maintainer="Jaxon Knight"
LABEL cohort = '13'
LABEL description = 'This is my first docker image using a previous node project'
LABEL animal = 'Dog'

WORKDIR /app

COPY . .

EXPOSE 3000

RUN npm install

CMD ["node", "app.js"]
