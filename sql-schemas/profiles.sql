create table profiles (

id uuid primary key references auth.users(id) on delete cascade,

full_name text,

email text unique,

role text check (role in ('Admin','Driver','Analyst')),

created_at timestamp default now()

);


