CREATE EXTENSION IF NOT EXISTS "plv8";
CREATE EXTENSION IF NOT EXISTS "hstore";


CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(30) NOT NULL UNIQUE,
  alias VARCHAR(30),
  password CHAR(60) NOT NULL,
  time TIMESTAMPTZ NOT NULL default CURRENT_TIMESTAMP
);

CREATE TABLE contacts (
  requester_id INT REFERENCES users(id),
  requestee_id INT REFERENCES users(id),
  requestee_alias VARCHAR(30),
  UNIQUE(requester_id, requestee_id)
);

CREATE TABLE images (
  id SERIAL PRIMARY KEY,
  owner_email VARCHAR(30) REFERENCES users(email) NOT NULL,
  success BOOLEAN,
  size INT,
  name VARCHAR(40) UNIQUE,
  url VARCHAR(60) UNIQUE
);

-- Index commonly queried fields in users
CREATE INDEX users_id_index ON users USING btree (id);
CREATE INDEX users_email_index ON users USING btree (email);

-- Index commonly queried fields in contacts
CREATE INDEX contacts_requester_id ON contacts USING btree (requester_id);
CREATE INDEX contacts_requestee_id ON contacts USING btree (requestee_id);

-- Index commonly queried fields in images
CREATE INDEX images_id ON images USING btree (id);
CREATE INDEX images_owner ON images USING btree (owner);
CREATE INDEX images_url ON images USING btree (url);
