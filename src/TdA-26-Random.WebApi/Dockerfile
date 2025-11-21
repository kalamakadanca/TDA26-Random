FROM node:20-alpine AS frontend-build
WORKDIR /src/client

COPY client/package*.json ./
RUN npm ci

COPY client/ ./
RUN npm run build

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS backend-build
WORKDIR /src

# Copy all project files
COPY TdA-26-Random.Domain/*.csproj ./TdA-26-Random.Domain/
COPY TdA-26-Random.Application/*.csproj ./TdA-26-Random.Application/
COPY TdA-26-Random.Infrastructure/*.csproj ./TdA-26-Random.Infrastructure/
COPY TdA-26-Random.WebApi/*.csproj ./TdA-26-Random.WebApi/

# Restore dependencies
RUN dotnet restore ./TdA-26-Random.WebApi/TdA-26-Random.WebApi.csproj

# Copy all source files
COPY TdA-26-Random.Domain/ ./TdA-26-Random.Domain/
COPY TdA-26-Random.Application/ ./TdA-26-Random.Application/
COPY TdA-26-Random.Infrastructure/ ./TdA-26-Random.Infrastructure/
COPY TdA-26-Random.WebApi/ ./TdA-26-Random.WebApi/

# Copy frontend build output
COPY --from=frontend-build /src/client/dist ./TdA-26-Random.WebApi/wwwroot

# Publish without --no-restore to catch any missing dependencies
RUN dotnet publish ./TdA-26-Random.WebApi/TdA-26-Random.WebApi.csproj \
    -c Release \
    -o /app/publish \
    /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS runtime
WORKDIR /app

COPY --from=backend-build /app/publish .

EXPOSE 80

ENV ASPNETCORE_URLS=http://+:80
ENV ASPNETCORE_ENVIRONMENT=Production

ENTRYPOINT ["dotnet", "TdA-26-Random.WebApi.dll"]