FROM node:18-alpine as deps
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

FROM node:18-alpine as builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules

COPY . .


from node:18-alpine as runner
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --prod
COPY --from=builder /app ./

CMD ["node", "index"]