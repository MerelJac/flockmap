-- Internal file only for backups 


-- USERS come from supabase.auth.users (already managed)

-- Users table (linked to Supabase Auth users)
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  username text unique,
  avatar_url text,
  created_at timestamp default now()
);

-- Groups table (for Flockmap)
create table groups (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  description text,
  latitude double precision not null,
  longitude double precision not null,
  created_by uuid references auth.users(id),
  created_at timestamptz default now()
);


-- Chat rooms or groups
create table chats (
  id uuid primary key default uuid_generate_v4(),
  name text,
  is_group boolean default false,
  created_at timestamp with time zone default now()
);

-- Join table between users and chats
create table chat_participants (
  id uuid primary key default uuid_generate_v4(),
  chat_id uuid references chats(id) on delete cascade,
  user_id uuid references auth.users(id) on delete cascade,
  last_read_at timestamp with time zone default now()
);

-- Messages table
create table messages (
  id uuid primary key default uuid_generate_v4(),
  chat_id uuid references chats(id) on delete cascade,
  sender_id uuid references auth.users(id) on delete cascade,
  content text not null,
  created_at timestamp with time zone default now()
);

-- Indexes for performance
create index on messages (chat_id);
create index on chat_participants (chat_id);
