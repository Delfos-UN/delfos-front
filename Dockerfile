FROM oven/bun AS builder

WORKDIR /app

COPY . .

RUN bun install
RUN bun run build

FROM oven/bun

WORKDIR /app

COPY --from=builder /app/.svelte-kit/output /app

EXPOSE 3000
