# Stage 1: Build frontend
FROM node:24 AS frontend-build
WORKDIR /app/src/client
COPY src/client/package*.json ./
RUN npm install
COPY src/client .
RUN npm run build

# Stage 2: Build and publish backend
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS backend-build
WORKDIR /app
COPY src/TdA-26-Random.WebApi ./TdA-26-Random.WebApi
COPY src/TdA-26-Random.Application ./TdA-26-Random.Application
COPY src/TdA-26-Random.Domain ./TdA-26-Random.Domain
COPY src/TdA-26-Random.Infrastructure ./TdA-26-Random.Infrastructure
RUN dotnet publish TdA-26-Random.WebApi/TdA-26-Random.WebApi.csproj -c Release -o /app/publish

# Stage 3: Runtime
FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /app
COPY --from=backend-build /app/publish .
COPY --from=frontend-build /app/src/client/build ./wwwroot
EXPOSE 80
ENTRYPOINT ["dotnet", "TdA-26-Random.WebApi.dll"]