FROM oven/bun AS builder

WORKDIR /app

COPY . .

RUN bun i
RUN bun run build

FROM oven/bun

COPY --from=builder /app/build .

EXPOSE 3000

# Iniciar el servidor con Bun
CMD ["bun", "run", "preview"]
