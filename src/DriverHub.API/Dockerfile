FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy csproj and restore
COPY ["DriverHub.API/DriverHub.API.csproj", "DriverHub.API/"]
COPY ["DriverHub.Application/DriverHub.Application.csproj", "DriverHub.Application/"]
COPY ["DriverHub.Domain/DriverHub.Domain.csproj", "DriverHub.Domain/"]
COPY ["DriverHub.Infrastructure/DriverHub.Infrastructure.csproj", "DriverHub.Infrastructure/"]

RUN dotnet restore "DriverHub.API/DriverHub.API.csproj"

# Copy everything else
COPY . .

# Build
WORKDIR "/src/DriverHub.API"
RUN dotnet build "DriverHub.API.csproj" -c Release -o /app/build

# Publish
FROM build AS publish
RUN dotnet publish "DriverHub.API.csproj" -c Release -o /app/publish

# Final stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=publish /app/publish .
EXPOSE 8080
ENTRYPOINT ["dotnet", "DriverHub.API.dll"]
