FROM node:16 as depends
LABEL app=backend
WORKDIR /usr/src/build/app

COPY package-lock.json ./
COPY package.json .
RUN npm i

FROM node:16-alpine as runtime
WORKDIR /usr/src/app
COPY --from=depends /usr/src/build/app/node_modules /usr/src/app/node_modules
COPY . .
EXPOSE 3001
CMD [ "node", "index.js" ]
