# Build stage
FROM node:16-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:16-alpine

# Set the working directory
WORKDIR /app

# Copy only the build output and necessary files
COPY --from=build /app/package*.json ./
COPY --from=build /app/dist ./dist

# Install production dependencies only
RUN npm install --only=production

# Expose the application port (if required)
EXPOSE 3000

# Run the application
CMD ["node", "dist/index.js"]
