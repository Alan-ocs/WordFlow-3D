FROM node:16-alpine

WORKDIR /app

# Install netcat
RUN apk add --no-cache netcat-openbsd

COPY package*.json ./
RUN npm install --production

COPY . .

# Make scripts executable
RUN chmod +x wait-for.sh start.sh

EXPOSE 3001

CMD ["./wait-for.sh", "mongo", "./start.sh"]
