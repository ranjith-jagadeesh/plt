FROM node:14-alpine

# Create app directory
WORKDIR /plt

# Copy both package.json file and yarn.lock file
COPY package.json /plt
COPY yarn.lock /plt

# Install app dependencies
RUN yarn install

# Bundle app source
COPY . /plt

# Expose Port 300
EXPOSE 3000

# Run app
CMD yarn dev