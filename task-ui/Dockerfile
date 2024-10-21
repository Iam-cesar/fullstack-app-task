FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE ${PORT}

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

CMD if [ "$NODE_ENV" = "development" ]; then npm start -- --host 0.0.0.0; else npm run build --prod && npx serve -s dist; fi
