FROM node

# Set the working directory to /clientWORKDIR /client
WORKDIR /client

# copy package.json into the container at /clientCOPY package*.json /client/
COPY package*.json /client/

# install dependencies
RUN npm install

# Copy the current directory contents into the container at /client
COPY . /client/

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Run the app when the container launches
CMD ["npm", "start"]