# Etapa de compilación
# Se puede cambiar por la versión de node que tu quieras
FROM node:14 AS build-stage 
# Directorio de trabajo, lo puedes ajustar a tu gusto
WORKDIR /app
# comando para copiar el package.json y el package-lock.json
# esto es para que no se instalen las dependencias cada vez que se haga un cambio
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run serve

# Etapa de producción
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
# Exponer el puerto 80, lo puedes cambiar si lo necesitas
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
