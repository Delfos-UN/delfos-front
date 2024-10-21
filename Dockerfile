FROM oven/bun:alpine AS builder

WORKDIR /app

COPY . .

RUN bun install

RUN bun run build --outdir=build

FROM oven/bun:distroless

WORKDIR /app

COPY --from=builder /app/build .

EXPOSE 3000

CMD ["bun", "run", "preview"]
