# Use Node.js v14 as the base image
FROM node:14

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the application files to the container
COPY . .

# Expose port 3000 for the application
EXPOSE 3000

# Set environment variables
ENV NODE_ENV=production
ENV MONGO_URI=mongodb://mongo:27017/myapp

# Add a volume for the data directory
VOLUME ["/data/db"]

# Start the application
CMD ["npm", "start"]
