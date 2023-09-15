-- CreateTable
CREATE TABLE "dish" (
    "id" SERIAL NOT NULL,
    "author_id" INTEGER,
    "title" VARCHAR(255),
    "info" TEXT,
    "recipe" TEXT,

    CONSTRAINT "dish_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dish_product" (
    "id" SERIAL NOT NULL,
    "dish_id" INTEGER,
    "product_id" INTEGER,
    "count" DECIMAL,
    "unit" VARCHAR(10),

    CONSTRAINT "dish_product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255),
    "info" TEXT,
    "properties" TEXT,
    "composition" TEXT,
    "kcal" DOUBLE PRECISION,
    "protein" DOUBLE PRECISION,
    "fat" DOUBLE PRECISION,
    "carbonhydragete" DOUBLE PRECISION,
    "image_path" TEXT,
    "image_name" TEXT,

    CONSTRAINT "product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(255),
    "password" VARCHAR(255),
    "name" VARCHAR(255),
    "surname" VARCHAR(255),

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "dish" ADD CONSTRAINT "dish_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dish_product" ADD CONSTRAINT "dish_product_dish_id_fkey" FOREIGN KEY ("dish_id") REFERENCES "dish"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dish_product" ADD CONSTRAINT "dish_product_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

