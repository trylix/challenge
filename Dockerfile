FROM node:12.14.0-alpine3.11

WORKDIR /app
COPY . .

RUN npm install --no-optional
RUN npm run build
RUN printenv

EXPOSE 8000
CMD ["npm", "run", "start:prod"]
