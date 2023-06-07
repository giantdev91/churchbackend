import { Client } from 'pg';

/**
 * @typedef BaseUser
 * @property id - User's ID
 * @property username - User's username
 * @property displayName - User's display name
 */

/**
 * Creates a new PostgreSQL client based on the values in the .env file.
 */
const client = new Client({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	port: process.env.DB_PORT,
	ssl: { rejectUnauthorized: false }
});

client.connect((err) => {
	if (err) {
		console.error(`Database connection failed:${err.stack}`);
		return;
	}
	console.log('connected to Database');
});

// language=sql
client.query(`
	do
	$$
		begin
			create type music_service as enum ('apple', 'spotify', 'none');
		exception
			when duplicate_object then null;
		end
	$$;

	do
	$$
		begin
			create type gender as enum ('male', 'female');
		exception
			when duplicate_object then null;
		end
	$$;

	-- User avatars will be available at /uploads/images/avatars/"userId".jpg
	-- User profile cover images will be available at /uploads/images/covers/"userId".jpg
	create table if not exists app_user
	(
		id integer primary key generated always as identity,
		username text not null unique,
		email text unique,
		password_hash text not null,
		display_name text not null,
		bio text,
		phone_number text unique,
		country text,
		city text,
		date_of_birth timestamptz not null,
		gender gender,
		music_service music_service,
		score int not null default 0,
		level_up int not null default 0,
		monz int not null default 0,
		date_joined date not null default now(),
		is_admin bool not null default false,
		is_verified bool not null default true,
		ftux_completed bool not null default false,
	  referral_code text not null unique,
	  referred_by text
	);

	create table if not exists monz
	(
		id integer primary key generated always as identity,
		user_id int not null,
		username text not null,
		monz int not null default 0,
		exp int not null default 0,
		foreign key (user_id) references app_user (id) on delete cascade
	);

	-- Music can be found at /uploads/music/"musicId".mp3
	-- Cover art can be found at /uploads/music/artwork/"musicId".png
	create table if not exists music
	(
		id integer primary key generated always as identity,
		title text not null,
		has_linked_account boolean not null,
		times_used int not null default 0,
		date_uploaded timestamptz not null default now(),
		is_verified bool not null default true,
		-- Duration in milliseconds
		duration int not null,
		frontPage text default false,

		-- Tracked to pin down abusers of the system
		uploader_id int,
		foreign key (uploader_id) references app_user (id) on delete set null,

		-- User can either have an account
		artist_id int,
		foreign key (artist_id) references app_user (id) on delete set null,

		-- Or the artist name is directly associated with the music
		artist_name text
	);

	create table if not exists music_comment
	(
		id integer primary key generated always as identity,
		music_id int not null,
		user_id int not null,
		date_posted timestamptz not null default now(),
		content text not null,
		reply_of int,
		foreign key (music_id) references music (id) on delete cascade,
		foreign key (user_id) references app_user (id) on delete cascade,
		foreign key (reply_of) references music_comment (id) on delete cascade
	);

	alter table music add column if not exists genre text;

	-- Post urls will be available at /uploads/posts/photos/"postId".jpg
	create table if not exists post
	(
		id integer primary key generated always as identity,
		user_id int not null,
		title text not null,
		description text not null,
		is_photo bool not null,
		date_posted timestamptz not null default now(),
		date_updated timestamptz,
		is_processing bool not null default false,
		is_verified bool not null default true,
		music_id int,
		foreign key (user_id) references app_user (id) on delete cascade,
		foreign key (music_id) references music (id) on delete set null
	);

	DO $$ BEGIN
		create type post_type AS ENUM ('REGULAR', 'PERFORMANCE');
	EXCEPTION
		WHEN duplicate_object THEN null;
	END $$;

	alter table post add column if not exists type post_type not null default 'REGULAR';

	create table if not exists post_category
	(
		category text not null,
		post_id int not null,
		primary key (post_id, category),
		foreign key (post_id) references post (id) on delete cascade
	);

	create table if not exists post_comment
	(
		id integer primary key generated always as identity,
		post_id int not null,
		user_id int not null,
		date_posted timestamptz not null default now(),
		content text not null,
		reply_of int,
		foreign key (post_id) references post (id) on delete cascade,
		foreign key (user_id) references app_user (id) on delete cascade,
		foreign key (reply_of) references post_comment (id) on delete cascade
	);

	create table if not exists comment_hashtag
	(
		comment_id int not null,
		hashtag text not null,
		primary key (comment_id, hashtag),
		foreign key (comment_id) references post_comment (id) on delete cascade
	);

	create table if not exists comment_mention
	(
		comment_id int not null,
		user_id int not null,
		username text not null,
		primary key (comment_id, user_id),
		foreign key (comment_id) references post_comment (id) on delete cascade,
		foreign key (user_id) references app_user (id) on delete cascade
	);

	create table if not exists follow
	(
		follower_id int not null,
		following_id int not null,
		date_followed timestamptz not null default now(),
		primary key (follower_id, following_id),
		foreign key (follower_id) references app_user (id) on delete cascade,
		foreign key (following_id) references app_user (id) on delete cascade
	);

	create table if not exists block
	(
		blocker_id int not null,
		blocked_id int not null,
		primary key (blocker_id, blocked_id),
		foreign key (blocked_id) references app_user (id) on delete cascade,
		foreign key (blocker_id) references app_user (id) on delete cascade
	);

	create table if not exists post_like
	(
		user_id int not null,
		post_id int not null,
		date_liked timestamptz not null default now(),
		primary key (user_id, post_id),
		foreign key (user_id) references app_user (id) on delete cascade,
		foreign key (post_id) references post (id) on delete cascade
	);

	create table if not exists post_comment_like
	(
	  user_id int not null,
	  comment_id int not null,
	  date_liked timestamptz not null default now(),
	  primary key (user_id, comment_id),
	  foreign key (user_id) references app_user(id) on delete cascade,
	  foreign key (comment_id) references post_comment (id) on delete cascade
	);

	create table if not exists refresh_token
	(
		user_id int not null,
		token text not null unique,
		is_invalid bool not null default false,
		date_created timestamptz not null default now(),
		foreign key (user_id) references app_user (id) on delete cascade
	);

	create table if not exists password_reset_request
	(
		id_hash text not null,
		user_id int not null,
		date_created timestamptz not null default now(),
		foreign key (user_id) references app_user (id) on delete cascade
	);

	create table if not exists post_hashtag
	(
		post_id int not null,
		hashtag text not null,
		primary key (post_id, hashtag),
		foreign key (post_id) references post (id) on delete cascade
	);

	create table if not exists post_mention
	(
		post_id int not null,
		user_id int not null,
		username text not null,
		primary key (post_id, user_id),
		foreign key (post_id) references post (id) on delete cascade,
		foreign key (user_id) references app_user (id) on delete cascade
	);

	create table if not exists notification
	(
		id integer primary key generated always as identity,
		notifier_id int not null,
		notified_id int not null,
		type text not null,
		post_id int,
		date_notified timestamptz not null default now(),
		foreign key (notifier_id) references app_user(id) on delete cascade,
		foreign key (notified_id) references app_user(id) on delete cascade,
		foreign key (post_id) references post (id) on delete cascade
	);

	create table if not exists push_token
	(
	  id integer primary key generated always as identity,
	  user_id int not null,
	  token text not null,
		foreign key (user_id) references app_user(id) on delete cascade
	);

	create table if not exists report
	(
	  id integer primary key generated always as identity,
	  reporter_id integer not null,
	  reported_id integer not null,
	  reason text not null,
	  description text
	);

	create table if not exists block
	(
	  blocker_id integer not null,
	  blocked_id integer not null,
	  primary key (blocker_id, blocked_id),
	  foreign key (blocker_id) references app_user(id) on delete cascade,
	  foreign key (blocked_id) references app_user(id) on delete cascade
	);

	create table if not exists affiliate_request
	(
		first_name text not null,
		last_name text not null,
		email text not null,
		occupation text not null,
		age int not null,
		province text not null,
		country text not null,
		postal_code text not null,
		phone text not null,
		profession text not null,
		reasoning text not null,
		worked_as_promotional bool not null,
		used_app bool not null,
		knowledge_of_app int not null,
		been_part_of_group bool not null,
		times_per_week_danced int not null,
		favorite_movie_genre text not null,
		favorite_social_media text not null,
		social_media text not null,
		list_of_social_media_verifications text not null,
		special_talents text not null,
		headshot_url text not null,
		full_body_shot_url text not null
	);

	create table if not exists favorites
	(
        user_id int not null,
        fav_music_id int,
        fav_user_id	int
  );
  create table if not exists referrals(
	id int generated always as identity,
	username text not null,
	code_used integer default 0,
	referred_by text
	);

	DO $$ BEGIN
	    create type request_status AS ENUM ('NEW', 'COMPLETE', 'CANCELLED');
	EXCEPTION
    	WHEN duplicate_object THEN null;
	END $$;
	

	create table if not exists performance_requests
	(
		id int primary key generated always as identity,
		requested_by_user_id int,
		requested_for_user_id int,
		description text,
		status request_status default 'NEW',
		requested_date timestamptz not null default now(),
		foreign key (requested_by_user_id) references app_user (id),
		foreign key (requested_for_user_id) references app_user (id)
	);

	create table if not exists performance_posts
	(
		id int primary key generated always as identity,
		performance_request_id int not null,
		
		foreign key (performance_request_id) references performance_requests (id) on delete cascade
	);

INSERT INTO referrals(id, username) overriding system value SELECT id, username from app_user WHERE NOT EXISTS (SELECT id FROM referrals WHERE id = 1);

create table if not exists feature_flack(
	id int generated always as identity,
	username text not null,
	email text not null,
	subscribed_to int[]


);
INSERT INTO feature_flack(id, username,email) overriding system value SELECT id, username,email from app_user WHERE NOT EXISTS (SELECT id FROM feature_flack WHERE id = 1);

	alter table post add column if not exists is_private bool default false;


  

	alter table app_user add column if not exists stripe_customer_id text;
	alter table app_user add column if not exists stripe_buyer_id text;
	alter table app_user add column if not exists stripe_customer_onboarding bool;
	alter table app_user alter column referral_code DROP NOT NULL;


CREATE TABLE IF NOT EXISTS user_interests_category(
	user_id int not null,
	value text not null,
	primary key (user_id, value),
	foreign key (user_id) references app_user (id)
);

CREATE TABLE IF NOT EXISTS user_interests_genre(
	user_id int not null,
	value text not null,
	primary key (user_id, value),
	foreign key (user_id) references app_user (id)
);

CREATE TABLE IF NOT EXISTS user_interests_artist(
	user_id int not null,
	value text not null,
	primary key (user_id, value),
	foreign key (user_id) references app_user (id)
);

CREATE TABLE IF NOT EXISTS suggested_users(
	genre text not null default 'ALL',
	category text not null default 'ALL',
	user_id int not null,
	priority int not null default 0,
	primary key (genre, category, user_id),
	foreign key (user_id) references app_user (id)
);

CREATE TABLE IF NOT EXISTS post_genre(
	id serial,
	genre text not null unique
);

ALTER TABLE post_genre DROP CONSTRAINT IF EXISTS post_genre_pk;
ALTER TABLE post_genre ADD CONSTRAINT post_genre_pk PRIMARY KEY (id, genre);

INSERT INTO post_genre(genre) 
	VALUES ('Challenges'), 
	('Dance'),
	('Concert'),
	('Covers'),
	('Singing'),
	('Official Music Videos'),
	('Freestyle'),
	('Producer'),
	('DJ'),
	('Guitar'),
	('Drums'),
	('Bass'),
	('Lifestyle'),
	('Sports'),
	('Art'),
	('Comedy'),
	('Fashion'),
	('Food'),
	('Gaming'), 
	('Memes')
    ON CONFLICT (genre) 
	DO 
   	UPDATE SET genre = post_genre.genre;


ALTER TABLE post add column if not exists genre_id int;

`);

export default client;
