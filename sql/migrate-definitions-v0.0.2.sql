create table
  public.games (
    id uuid not null default gen_random_uuid (),
    host_user uuid not null,
    opponent_user uuid null,
    status character varying(15) not null,
    created_at timestamp without time zone null default current_timestamp,
    constraint games_pkey primary key (id),
    constraint games_host_user_fkey foreign key (host_user) references users (id) on delete cascade,
    constraint games_opponent_user_fkey foreign key (opponent_user) references users (id) on delete set null
  ) tablespace pg_default;

create index if not exists idx_games_status on public.games using btree (status) tablespace pg_default;

create table
  public.lobby (
    id uuid not null default gen_random_uuid (),
    name character varying(50) not null,
    created_at timestamp without time zone null default current_timestamp,
    constraint lobby_pkey primary key (id)
  ) tablespace pg_default;

create table
  public.users (
    id uuid not null default gen_random_uuid (),
    username character varying(50) not null,
    created_at timestamp without time zone null default current_timestamp,
    status public.platform_status null,
    constraint users_pkey primary key (id)
  ) tablespace pg_default;

create unique index if not exists unique_username on public.users using btree (username) tablespace pg_default;

create table
  public.chat (
    id uuid not null default gen_random_uuid (),
    user_id uuid not null,
    message text not null,
    created_at timestamp without time zone null default current_timestamp,
    lobby_id uuid null,
    game_id uuid null,
    constraint chat_pkey primary key (id),
    constraint chat_game_id_fkey foreign key (game_id) references games (id) on delete cascade,
    constraint chat_lobby_id_fkey foreign key (lobby_id) references lobby (id) on delete cascade,
    constraint chat_user_id_fkey foreign key (user_id) references users (id) on delete cascade
  ) tablespace pg_default;

create index if not exists idx_chat_created_at on public.chat using btree (created_at desc) tablespace pg_default;