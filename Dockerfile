FROM rust:1-bookworm AS build
WORKDIR /app

COPY Cargo.toml Cargo.lock ./
COPY src ./src
COPY data ./data
COPY static ./static

RUN cargo build --release --locked

FROM debian:bookworm-slim
WORKDIR /app

RUN apt-get update \
    && apt-get install -y --no-install-recommends ca-certificates curl \
    && rm -rf /var/lib/apt/lists/*

COPY --from=build /app/target/release/grabitmap /usr/local/bin/grabitmap
COPY --from=build /app/static ./static
COPY --from=build /app/data ./data

ENV PORT=3000 \
    DATABASE_URL=sqlite:data/votes.db \
    PUBLIC_BASE_URL=https://grabitmap.com \
    GRABIT_COOKIE_SECURE=1

EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s \
    CMD curl -fsS http://127.0.0.1:3000/health || exit 1

CMD ["grabitmap"]
