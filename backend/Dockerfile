# Use official Node.js 20 image as the base image
# Node 20 is LTS (Long Term Support) and highly stable for Express applications
FROM node:20

# Set the working directory inside the container
# This ensures all subsequent commands (COPY, RUN) happen in this folder
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first
# This is a Docker best practice to cache npm install unless dependencies change
COPY package*.json ./

# Install the backend dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose port 5000 so the outside world can communicate with the backend
EXPOSE 5000

# Define the default command to start the application
CMD ["npm", "start"]
