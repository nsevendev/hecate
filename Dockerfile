ARG RUST_VERSION
ARG PORT_DOCKER_INIT_PROJECT
FROM rust:${RUST_VERSION} AS builder
RUN cargo install cargo-watch
RUN rustup component add rustfmt
RUN rustup component add clippy
WORKDIR /app
COPY . .
RUN cargo fetch
    
FROM builder AS dev
RUN cargo build
EXPOSE ${PORT_DOCKER_INIT_PROJECT}
CMD ["cargo", "watch", "-x", "run"]
    
FROM builder AS test
RUN cargo build
CMD ["cargo", "watch", "-x", "test"]

FROM builder AS clippy
RUN cargo build
CMD ["cargo", "watch", "-x", "clippy"]

# en construction
FROM debian:buster-slim AS production
RUN apt-get update && apt-get install -y libssl-dev ca-certificates && \
    rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY --from=builder /app/target/release/my_rust_project /app/
EXPOSE 8000
CMD ["./my_rust_project"]