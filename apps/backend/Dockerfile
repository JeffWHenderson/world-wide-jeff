# Use a lightweight Node.js image as the base
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port your Express app listens on
EXPOSE 3000

# Command to run the application
CMD ["node", "app.js"]