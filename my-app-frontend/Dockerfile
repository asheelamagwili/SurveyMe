FROM node:8.7.0-alpine

# Create app directory and use it as the working directory
RUN mkdir -p /survey/frontend
WORKDIR /survey/frontend

COPY package.json /survey/frontend
COPY package-lock.json /survey/frontend

RUN npm install

COPY . /survey/frontend

CMD ["npm", "start"]