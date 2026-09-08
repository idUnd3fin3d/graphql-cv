FROM node:22-bookworm-slim

WORKDIR /app

RUN corepack enable

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY prisma ./prisma
COPY prisma7.config.ts nest-cli.json tsconfig.json tsconfig.build.json declarations.d.ts ./
COPY src ./src

RUN yarn prisma generate
RUN yarn build

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

CMD ["sh", "-c", "npx prisma migrate deploy && npx prisma db seed && node dist/main.js"]
