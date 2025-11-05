# Build stage for React frontend
FROM node:20-alpine AS frontend-build
WORKDIR /src/client

# Copy package files and install dependencies
COPY client/package*.json ./
RUN npm ci

# Copy frontend source and build
COPY client/ ./
RUN npm run build

# Build stage for .NET backend
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS backend-build
WORKDIR /src

# Copy solution and project files
COPY TdA-26-Random.Domain/*.csproj ./TdA-26-Random.Domain/
COPY TdA-26-Random.Application/*.csproj ./TdA-26-Random.Application/
COPY TdA-26-Random.Infrastructure/*.csproj ./TdA-26-Random.Infrastructure/
COPY TdA-26-Random.WebApi/*.csproj ./TdA-26-Random.WebApi/

# Restore dependencies
RUN dotnet restore ./TdA-26-Random.WebApi/TdA-26-Random.WebApi.csproj

# Copy source code
COPY TdA-26-Random.Domain/ ./TdA-26-Random.Domain/
COPY TdA-26-Random.Application/ ./TdA-26-Random.Application/
COPY TdA-26-Random.Infrastructure/ ./TdA-26-Random.Infrastructure/
COPY TdA-26-Random.WebApi/ ./TdA-26-Random.WebApi/

# Copy frontend build output to wwwroot
COPY --from=frontend-build /src/client/dist ./TdA-26-Random.WebApi/wwwroot

# Build and publish
RUN dotnet publish ./TdA-26-Random.WebApi/TdA-26-Random.WebApi.csproj \
    -c Release \
    -o /app/publish \
    --no-restore

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS runtime
WORKDIR /app

# Copy published application
COPY --from=backend-build /app/publish .

# Expose port 80
EXPOSE 80

# Set environment variables
ENV ASPNETCORE_URLS=http://+:80
ENV ASPNETCORE_ENVIRONMENT=Production

# Run application
ENTRYPOINT ["dotnet", "TdA-26-Random.WebApi.dll"]

