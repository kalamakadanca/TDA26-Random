# Stage 1: Build React frontend
FROM node:20-alpine AS frontend-build
WORKDIR /app/client

# Copy package files
COPY src/client/package*.json ./
RUN npm ci

# Copy client source
COPY src/client/ ./

# Build and show where files go
RUN npm run build && \
    echo "=== Build output location ===" && \
    ls -la && \
    echo "=== Checking for dist folder ===" && \
    ls -la dist/ || echo "No dist folder" && \
    echo "=== Checking for build folder ===" && \
    ls -la build/ || echo "No build folder"

# Stage 2: Build .NET backend
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS backend-build
WORKDIR /app

# Copy solution and project files
COPY TdA-26-Random.sln ./
COPY src/TdA-26-Random.Domain/*.csproj ./src/TdA-26-Random.Domain/
COPY src/TdA-26-Random.Application/*.csproj ./src/TdA-26-Random.Application/
COPY src/TdA-26-Random.Infrastructure/*.csproj ./src/TdA-26-Random.Infrastructure/
COPY src/TdA-26-Random.WebApi/*.csproj ./src/TdA-26-Random.WebApi/

# Restore dependencies
RUN dotnet restore

# Copy all source code
COPY src/ ./src/

# Try to copy from either dist or build folder
COPY --from=frontend-build /app/client/build/. ./src/TdA-26-Random.WebApi/wwwroot/ 2>/dev/null || \
     COPY --from=frontend-build /app/client/dist/. ./src/TdA-26-Random.WebApi/wwwroot/

# Build and publish
WORKDIR /app/src/TdA-26-Random.WebApi
RUN dotnet publish -c Release -o /app/publish --no-restore

# Stage 3: Runtime image
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS runtime
WORKDIR /app

# Install curl for health checks
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

# Create non-root user
RUN useradd -m -u 1000 appuser && chown -R appuser:appuser /app
USER appuser

# Copy published app
COPY --from=backend-build --chown=appuser:appuser /app/publish ./

# Expose ports
EXPOSE 8080
EXPOSE 8081

# Set environment variables
ENV ASPNETCORE_URLS=http://+:8080
ENV ASPNETCORE_ENVIRONMENT=Production

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:8080/api/ || exit 1

ENTRYPOINT ["dotnet", "TdA-26-Random.WebApi.dll"]