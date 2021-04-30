FROM node:current-alpine AS build-react-app
WORKDIR /app
COPY ./frontend/  .
RUN npm install
RUN npm run build


FROM node:current-alpine
WORKDIR /app
COPY ./webapi/ .
COPY --from=build-react-app /app/build/ /app/static/
RUN npm install
# RUN chmod +x entrypoint.sh
EXPOSE 8000
ENTRYPOINT [ "/app/entrypoint.sh" ]

