FROM node:20

WORKDIR /app

# انسخ ملفات package.json فقط
COPY package*.json ./
COPY prisma ./prisma/

# نزّل dependencies
RUN npm ci
RUN npx prisma generate

# انسخ بقية المشروع
COPY . .

# ابني TypeScript
RUN npm run build

EXPOSE 3000

# شغّل backend
CMD ["npm", "run", "start"]