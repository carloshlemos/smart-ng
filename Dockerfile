# Estagio 1 - Será responsavel em construir nossa aplicação
FROM node:14 as node
WORKDIR /app
COPY package.json /app/
RUN npm i npm@latest -g
RUN npm install --silent
COPY ./ /app/
RUN npm run build

# Estagio 2 - Será responsavel por expor a aplicação
FROM nginx:1.13
VOLUME /var/cache/nginx
COPY --from=node /app/dist/smart-ng /usr/share/nginx/html
COPY ./nginx-confing.conf /etc/nginx/conf.d/default.conf