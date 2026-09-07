FROM node:20-bookworm AS frontend-build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY project.inlang ./project.inlang
COPY scripts ./scripts
COPY static ./static
RUN npm run i18n

FROM rust:1-bookworm AS build
WORKDIR /app

COPY Cargo.toml Cargo.lock ./
COPY src ./src
COPY data ./data
COPY static ./static
COPY --from=frontend-build /app/static/paraglide ./static/paraglide

RUN cargo build --release --locked

FROM debian:bookworm-slim AS runtime
WORKDIR /app

RUN apt-get update \
    && apt-get install -y --no-install-recommends ca-certificates curl \
    && rm -rf /var/lib/apt/lists/*

COPY --from=build /app/target/release/grabitmap /usr/local/bin/grabitmap
COPY --from=build /app/static ./static
COPY --from=build /app/data ./data

# Keep the service process unprivileged even if an HTTP handler is compromised.
RUN useradd --system --uid 10001 --no-create-home grabit \
    && mkdir -p /app/data \
    && chown -R grabit:grabit /app/data

ENV PORT=3000 \
    DATABASE_URL=sqlite:data/votes.db \
    CHAT_MEDIA_DIR=data/chat-media \
    PUBLIC_BASE_URL=https://grabitmap.com \
    GRABIT_COOKIE_SECURE=1

USER grabit

EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s \
    CMD curl -fsS http://127.0.0.1:3000/health || exit 1

CMD ["grabitmap"]
