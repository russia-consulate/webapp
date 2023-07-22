FROM node:18-alpine as base

###################
# DEPS
###################

FROM base AS deps
WORKDIR /deps

COPY package.json yarn.lock* ./

RUN yarn install --frozen-lockfile && yarn cache clean

###################
# BUILD
###################

FROM base AS build
WORKDIR /build

COPY --from=deps /deps/node_modules ./node_modules
COPY . .

RUN yarn build

###################
# FINAL
###################

FROM node:18-alpine AS final
WORKDIR /final

RUN apk update
RUN apk add nginx

COPY --from=build /build/dist ./
COPY --from=build /build/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /build/scripts /scripts
COPY --from=build /build/entrypoint.sh /

ENV NODE_ENV production

ENTRYPOINT ["/entrypoint.sh"]
