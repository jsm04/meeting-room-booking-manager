# 1. Use official Bun image
FROM oven/bun:latest

# 2. Set working directory
WORKDIR /app

# 3. Copy dependencies first for cache optimization
COPY bun.lockb package.json ./

# 4. Install dependencies
RUN bun install

# 5. Copy the rest of your app
COPY . .

# 6. Build (optional, if you use bundling or transpiling)
RUN bun run build

# 7. Set default command
CMD ["bun", "run", "start"]
