FROM node:14.15.1 as builder
RUN mkdir -p /app/src
WORKDIR /app/src
COPY package.json .
RUN npm install
COPY . .


FROM builder as test
RUN yarn test


FROM builder as runner
EXPOSE 3000
CMD [ "npm", "start" ]
