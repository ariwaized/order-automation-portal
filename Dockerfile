# Use the official Microsoft Playwright image matching our version
FROM mcr.microsoft.com/playwright:v1.44.1-jammy

# Set the working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Prevent Playwright from downloading browsers again (they are already in the base image)
ENV PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1

# Install npm dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the backend port
EXPOSE 3000

# Set default environment variables
ENV PORT=3000
ENV HEADLESS=true
ENV NODE_ENV=production

# Start the application
CMD ["node", "server.js"]
