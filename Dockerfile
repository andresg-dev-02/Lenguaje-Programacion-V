# ETAPA 1: Compilación
# Cambiado de 10.0 a 8.0 para coincidir con tu Framework
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copiar archivos de proyecto y restaurar dependencias
COPY *.sln .
# Si tienes el .csproj en la raíz, esto está bien
COPY *.csproj ./
RUN dotnet restore

# Copiar todo el código fuente y publicar
COPY . .
RUN dotnet publish "MarketPlace.csproj" -c Release -o out

# ETAPA 2: Runtime
# Cambiado de 10.0 a 8.0
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/out .

# Configuración de puerto para Render
ENV ASPNETCORE_URLS=http://+:10000
EXPOSE 10000

ENTRYPOINT ["dotnet", "MarketPlace.dll"]