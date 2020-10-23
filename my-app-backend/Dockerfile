FROM node:8.7.0-alpine

# Create app directory and use it as the working directory
RUN mkdir -p /survey/backend
WORKDIR /survey/backend

COPY package.json /survey/backend
COPY package-lock.json /survey/backend

RUN npm install

COPY . /survey/backend

CMD ["npm", "run", "devStart"]