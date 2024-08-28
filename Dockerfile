# Step 1: Use a Node.js image to build the app
FROM node:18 as build

# Step 2: Set the working directory
WORKDIR /app

# Step 3: Copy the package.json and package-lock.json files
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application
COPY . .

# Step 6: Build the Vite app
RUN npm run build

# Step 7: Use a lightweight Nginx image to serve the built files
FROM nginx:alpine

# Step 8: Copy the built files from the previous stage
COPY --from=build /app/dist /usr/share/nginx/html

# Step 9: Expose port 80
EXPOSE 80

# Step 10: Start Nginx
CMD ["nginx", "-g", "daemon off;"]
