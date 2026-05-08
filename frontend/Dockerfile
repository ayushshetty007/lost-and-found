# Use official Node.js 20 image as the base image (Required for Vite 8+)
FROM node:20

# Set the working directory to /usr/src/app inside the container
WORKDIR /usr/src/app

# Copy package files first to cache dependencies
COPY package*.json ./

# Install frontend dependencies
RUN npm install

# Copy the rest of the frontend code
COPY . .

# Expose port 5173, the default Vite development server port
EXPOSE 5173

# Define the command to run Vite on 0.0.0.0 so it is accessible from outside the container
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
