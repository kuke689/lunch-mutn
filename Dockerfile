FROM node
MAINTAINER Thibault Maekelbergh <thibault.maekelbergh@icloud.com>

ENV ROOT /src/bot

RUN mkdir -p $ROOT
WORKDIR $ROOT

RUN npm install -g forever

COPY package.json $ROOT
RUN npm install

COPY . $ROOT

CMD ["npm", "start"]
