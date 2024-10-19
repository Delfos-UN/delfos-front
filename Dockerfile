FROM oven/bun AS builder

WORKDIR /app

COPY . .

RUN bun install
RUN bun run build

FROM oven/bun

WORKDIR /app

COPY --from=builder /app/.svelte-kit/output /app/.svelte-kit/output
COPY --from=builder /app/package.json /app/package.json
COPY --from=builder /app/bun.lockb /app/bun.lockb

EXPOSE 3000

CMD ["bun", "run", "preview"]
