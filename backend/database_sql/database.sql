-- SQLBook: Code
-- Active: 1687179359586@@127.0.0.1@5432@foodhelper_bd
-- SQLBook: Code
-- Удалить таблицы
DROP TABLE dish_product;
DROP TABLE dish;
DROP TABLE "user";
-- SQLBook: Code
-- Добавить столбик в таблицу
ALTER TABLE product ADD image_name text
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
  carbonhydragete FLOAT,
  image_path text,
  image_name text
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
-- Active: 1687179359586@@127.0.0.1@5432@foodhelper_bd

create TABLE dish_product(
  id SERIAL PRIMARY KEY,
  dish_id INTEGER,
  FOREIGN KEY (dish_id) REFERENCES dish (id),
  product_id INTEGER,
  FOREIGN KEY (product_id) REFERENCES product (id),
  count DECIMAL,
  unit VARCHAR(10)
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

SELECT * from "user" WHERE email = 'email123@mail.ru'


-- SQLBook: Code
-- Active: 1687179359586@@127.0.0.1@5432@foodhelper_bd
TRUNCATE TABLE "user"
-- SQLBook: Code
select 
tab3.title as title_product, 
tab3.info as info_product
from dish as tab1
LEFT JOIN dish_product as tab2 ON tab1.id = tab2.dish_id
LEFT JOIN product as tab3 ON tab2.product_id = tab3.id;