FROM node:lts
WORKDIR /usr
COPY package.json yarn.lock ./
RUN yarn
COPY . .
ENTRYPOINT [ "yarn", "start" ]
