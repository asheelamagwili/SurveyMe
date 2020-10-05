# Specify the node base image with node version
FROM node:10
# Create a directory for docker
WORKDIR /app
# Copy dependencies from project to docker files
COPY package.json ./app
# Run any necessary packages
RUN npm install
COPY . /app
CMD ["npm", "run", "devStart"]