# Install node version 12
FROM node:12
# Create app root directory
WORKDIR /usr/src/app
# Install app dependencies
COPY package*.json ./
RUN npm install
# Bundle app
COPY . .
# Publish on port 3000
EXPOSE 3000
# Run the app
CMD [ "node","server.js"]
