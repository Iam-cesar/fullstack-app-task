FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE ${UI_PORT}

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

CMD if [ "$NODE_ENV" = "development" ]; then npm run dev; else npm run build && npm run preview; fi
