FROM node:lts-alpine AS builder
LABEL org.opencontainers.image.source=https://github.com/saviusz/yapa-poster-con
WORKDIR /src
RUN --mount=src=package.json,target=package.json \
--mount=src=package-lock.json,target=package-lock.json \
--mount=type=cache,target=/root/.npm \
npm ci
COPY . .
RUN --mount=type=cache,target=/root/.npm \
npm run build

# release creates the runtime image
FROM node:lts-alpine AS release
LABEL org.opencontainers.image.source=https://github.com/saviusz/yapa-poster-con
WORKDIR /app
COPY --from=builder /src/ .
EXPOSE 3000
CMD ["npm", "run", "start"]