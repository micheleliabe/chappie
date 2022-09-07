FROM node:latest
WORKDIR /home/chappie
COPY package.json .
RUN npm install
COPY . .
EXPOSE 3000
ENTRYPOINT [ "npm", "start" ]
