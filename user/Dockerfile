# Use the official Node.js 16 image as a parent image
FROM node:16

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (or yarn.lock) to the working directory
COPY package*.json ./

# Copy the rest of your application code to the working directory
COPY . .

RUN npm install

COPY entrypoint.sh entrypoint.sh

# Make the entrypoint script executable
RUN chmod +x entrypoint.sh

# Set the entrypoint script to run when the container starts
ENTRYPOINT ["./entrypoint.sh"]

# Expose the port your app runs on
EXPOSE 3000

# Command to run your app
CMD ["npm", "run", "dev"]
