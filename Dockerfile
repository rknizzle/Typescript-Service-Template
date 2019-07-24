# Builder stage -- compiles typescript into javascript
FROM node:10.6-alpine AS builder
WORKDIR /app
COPY . .

RUN npm install
RUN npm run clean
RUN npm run build

# Production stage -- creates an image for production
FROM node:10.6-alpine AS prod
WORKDIR /app
COPY --from=builder ./app/dist ./dist
COPY package* ./
RUN npm install --production

CMD npm start
