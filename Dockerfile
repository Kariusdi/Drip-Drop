# Dockerfile
FROM node:24

WORKDIR /app
COPY /oil-collector .

RUN npm install
RUN npm run build

EXPOSE 3000
ENV PORT=3000

CMD ["npm", "start"]