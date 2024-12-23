# Use Node.js runtime as the base image
FROM node:16

# Set working directory in the container
WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Install nodemon globally (if not already in package.json)
RUN npm install -g nodemon

# Expose the port used by the API
EXPOSE 5000

# Start the application using npx nodemon
CMD ["npx", "nodemon", "src/index.js"]

