FROM node:14

# Create app directory
RUN mkdir -p /code
WORKDIR /code

# Bundle app source
COPY . /code
RUN npm install

EXPOSE 8081
CMD [ "npm", "start" ]