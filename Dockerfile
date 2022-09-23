 FROM node:17-alpine as build
# set working directory
# this is the working folder in the container
# from which the app will be running from
WORKDIR /app
# copy everything to /app directory
# as opposed to on dev, in prod everything is copied to docker
COPY . /app
# add the node_modules folder to $PATH
ENV PATH /app/node_modules/.bin:$PATH
# install and cache dependencies
RUN yarn
#build the project for production
RUN yarn build
# set up production environment
# the base image for this is an alpine based nginx image


FROM nginx:1.15.2-alpine

#  COPY --from=build /app/build /var/www
# # COPY --from=node /usr/src/app/src/index.html  /var/www
# # COPY --from=node /usr/src/app/src/main.ts  /var/www
# # COPY --from=node /usr/src/app/src//polyfills.ts  /var/www
# # COPY --from=node /usr/src/app/src/tsconfig.app.json /var/www

# COPY nginx.conf /etc/nginx/nginx.conf

# COPY nginx.conf /etc/nginx/nginx.conf




COPY --from=build /app/build /var/www
# --------- only for those using react router ----------
# if you are using react router 
# you need to overwrite the default nginx configurations
# remove default nginx configuration file
RUN rm /etc/nginx/conf.d/default.conf
# replace with custom one
COPY nginx.conf /etc/nginx/conf.d


EXPOSE 8080
#expose ports

ENTRYPOINT ["nginx","-g","daemon off;"]