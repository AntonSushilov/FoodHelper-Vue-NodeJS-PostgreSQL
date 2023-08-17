-- Active: 1687179359586@@127.0.0.1@5432@foodhelper_bd
-- SQLBook: Code
create TABLE "user"(
  "id" SERIAL PRIMARY KEY,
  "email" VARCHAR(255),
  "password" VARCHAR(255),
  "name" VARCHAR(255),
  "surname" VARCHAR(255)
)
-- SQLBook: Code

create TABLE product(
  id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  info text,
  properties text,
  composition text,
  kcal FLOAT,
  protein FLOAT,
  fat FLOAT,
  carbonhydragete FLOAT
)
-- SQLBook: Code
create TABLE dish(
  id SERIAL PRIMARY KEY,
  author_id INTEGER,
  FOREIGN KEY (author_id) REFERENCES "user" (id),
  title VARCHAR(255),
  info text,
  recipe text
)
-- SQLBook: Code

create TABLE dish_product(
  id SERIAL PRIMARY KEY,
  author_id INTEGER,
  FOREIGN KEY (author_id) REFERENCES "user" (id),
  product_id INTEGER,
  FOREIGN KEY (product_id) REFERENCES product (id)
)
-- SQLBook: Code



select * from "user"

 SELECT TABLE_NAME,
           COLUMN_NAME,
           DATA_TYPE,
           IS_NULLABLE
   FROM INFORMATION_SCHEMA.COLUMNS
   WHERE table_name='user'

-- SQLBook: Code
INSERT INTO "user" (email, password, name, surname) VALUES ('email', 'password', 'name', 'surname') RETURNING *

UPDATE "user" set email = '${email}', password = '${password}', name = '${name}', surname = '${surname}' WHERE id = 1 RETURNING *

