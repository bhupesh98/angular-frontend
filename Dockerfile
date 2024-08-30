FROM node:22.1-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.15-alpine
COPY --from=builder /app/dist/frontend/browser /usr/share/nginx/html
