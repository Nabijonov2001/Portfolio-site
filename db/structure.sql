
create table developer (
    id serial primary key,
    fullname varchar(32) not null,
    about_me text not null,
    job varchar(32) not null,
    my_image text
);

insert into developer (fullname, about_me, job) values ('Shamsiddin Nabijonov', 'I am a backend developer', 'Node.js backend developer');

create table blog (
    id serial primary key,
    post_image text not null,
    title text not null,
    snippet text not null,
    main text not null
);

create table project (
    id serial primary key,
    project_name text not null,
    about text not null,
    link text not null
);

create table skill (
    id serial primary key,
    skill_name varchar(32) not null
);

create table msg (
    id serial primary key,
    fullname varchar(32) not null,
    email varchar(32) not null,
    msg_text text not null

);

create table contact (
    id serial primary key,
    telegram text not null,
    github text not null,
    phone_number varchar(16) not null,
    address text not null,
    email text not null
);

insert into contact (telegram, github, phone_number, address, email) 
        values ('Telegram', 'Github', '94 155 46 07', 'Toshkent shahri Yunusobot tumani', 'fazliddinnabijonov6@gmail.com');
ALTER TABLE contact ALTER COLUMN phone_number TYPE VARCHAR(64);