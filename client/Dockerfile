# Use the official Node.js 16 image as a parent image
FROM node:16

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (or yarn.lock) to the working directory
COPY package*.json ./


# Copy the rest of your application code to the working directory
COPY . .

# Install dependencies
RUN npm install

# Expose the port your app runs on
EXPOSE 3001

# Command to run your app
CMD ["npm", "run", "dev"]
