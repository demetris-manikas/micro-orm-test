FROM node:20-buster

ARG dev_enable_debug_mode=false
ENV EMPOWER_DEV_ENABLE_DEBUG_MODE $dev_enable_debug_mode

# include some dev tools
RUN apt-get update -y && apt-get install -y --no-install-recommends \
    net-tools \
    dnsutils \
    htop \
    mc \
    vim \
    less \
    postgresql-client \
    dumb-init \
    netcat \
    && rm -rf /var/lib/apt/lists/*

RUN wget -O /usr/local/bin/wait-for https://github.com/eficode/wait-for/releases/download/v2.2.2/wait-for
RUN chmod +x /usr/local/bin/wait-for

USER node

RUN mkdir -p /home/node/app && chown -R node:node /home/node/app
WORKDIR /home/node/app

EXPOSE 3000
EXPOSE 9230

ENTRYPOINT ["/usr/bin/dumb-init", "--"]
CMD ["/home/node/app/entrypoint.sh"]

