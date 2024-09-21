FROM node:18-alpine AS depsbackend_image
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

FROM node:18-alpine AS buildbackend_image
WORKDIR /app

COPY --from=depsbackend_image /app/node_modules ./node_modules
COPY . .

FROM node:18-alpine AS productionbackend_image
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --prod
COPY --from=buildbackend_image /app ./
# Copia el archivo .env
COPY .env .env

CMD ["node", "index"]
