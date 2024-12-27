# Chess App

A feature-rich chess web application built with Nuxt 3, Supabase, and Chess.js.

[Link to App](https://chess.joshmclain.com/)

## Feature Completion 

### Phase One - Alpha

- [x] Google OAuth via Supabase 
- [ ] Real-time chat, online users, and game invitations 
  - [ ] Lobby for player match open
  - [ ] In game chat
- [ ] Game logic powered by Chess.js
- [ ] Player profile game history and insights 

### Phase Two - Beta

- In game previous move highlighting
- [ ] Openings Catalog
  - [ ] The main lines and variations browsing
  - [ ] in game display banner on pattern recognition 
- [ ] Additional OAuth providers (Facebook, Spotify, Apple, etc.)
- [ ] Mail inbox and direct/private chat

## Using this repo

### Prerequisites

- Docker Desktop
- Supabase CLI (for local self hosted database, this can be replaced for environment variables to online instance)
- Node.js w/PNPM

### Getting started in development mode

1. Clone the repo

```bash
git clone https://github.com/daemon-node-byte/chess-app.git
```

2. Change working directory add install node dependencies 

```bash
cd ./chess-app && pnpm install
```


3. Start local supabase add collect environment variables

```bash
supabase start
# output sample
# API URL: xxxxxxxxxxxxxxx  
# GraphQL URL: xxxxxxxxxxxxxxx  
# S3 Storage URL: xxxxxxxxxxxxxxx 
# DB URL: xxxxxxxxxxxxxxx 
# Studio URL: xxxxxxxxxxxxxxx 
# Inbucket URL: xxxxxxxxxxxxxxx 
# JWT secret: xxxxxxxxxxxxxxx 
# anon key: xxxxxxxxxxxxxxx 
# service_role key: xxxxxxxxxxxxxxx 
# S3 Access Key: xxxxxxxxxxxxxxx  
# S3 Secret Key: xxxxxxxxxxxxxxx  
# S3 Region: xxxxxxxxxxxxxxx  
```

4. Copy dotenv example to local file with formatted values from step 3

```bash
cp .env.example .env.local
```

5. Migrate database table schemas

```bash
pnpm prisma:push:local
```


