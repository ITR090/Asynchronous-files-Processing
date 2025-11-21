# --- Frontend Stage: Build React App ---
    FROM node:20 AS build-frontend

    WORKDIR /app/client
    
    # Copy and install dependencies
    COPY frontend/package.json frontend/package-lock.json ./
    RUN npm install
    
    # Copy the rest of the frontend code
    COPY frontend/ .
    
    # Build the frontend
    RUN npm run build
    
    # --- Backend Stage: Setup Express Server ---
    FROM node:20-slim 
    
    WORKDIR /app/server
    
    # Copy backend package.json first and install deps
    COPY backend-api/package.json backend-api/package-lock.json ./
    RUN npm install
    
    # Copy backend code
    COPY backend-api/ .
    
    # Copy built frontend into backend
    COPY --from=build-frontend /app/client/dist ./dist
    
    # Expose server port
    EXPOSE 8080
    
    # Start the server
    CMD ["node", "server.js"]
    