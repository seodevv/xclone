# Dockerfile
# builder
FROM node:18-alpine AS builder

# work directory
WORKDIR /app

# copy package.json 
COPY package*.json ./

# install dependencies
RUN npm install

# copy source code
COPY . .

# build
RUN npm run build

#########
# runner
FROM node:18-alpine AS runner

# work direcory
WORKDIR /app

# copy build result
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

# setting environment
ENV NODE_ENV=production
ENV PORT=3000

# port expose
EXPOSE 3000

CMD ["npm", "start"]