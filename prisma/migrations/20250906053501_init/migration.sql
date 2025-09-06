-- CreateEnum
CREATE TYPE "public"."UserRole" AS ENUM ('SELLER', 'BUYER', 'ADMIN', 'SUPERADMIN');

-- CreateEnum
CREATE TYPE "public"."ListingType" AS ENUM ('ForSale', 'ForRent');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "public"."UserRole" NOT NULL DEFAULT 'BUYER',
    "password" TEXT NOT NULL,
    "avatar" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Accomodation" (
    "id" SERIAL NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    "title" TEXT NOT NULL,
    "beds" INTEGER NOT NULL,
    "baths" INTEGER NOT NULL,
    "garage" INTEGER NOT NULL,
    "sq_ft" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "discount" DOUBLE PRECISION,
    "build_year" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "documents" JSONB,
    "map_url" TEXT,
    "latitude" TEXT NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "country" TEXT NOT NULL,
    "extra_features" JSONB,
    "listing_type" "public"."ListingType" NOT NULL,
    "user_id" INTEGER NOT NULL,
    "category_id" INTEGER NOT NULL,

    CONSTRAINT "Accomodation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."AccomodationImg" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "accomodationId" INTEGER NOT NULL,

    CONSTRAINT "AccomodationImg_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "img" TEXT,
    "icon_img" TEXT,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Rating" (
    "id" SERIAL NOT NULL,
    "clean" DOUBLE PRECISION NOT NULL,
    "location" DOUBLE PRECISION NOT NULL,
    "communicate" DOUBLE PRECISION NOT NULL,
    "user_id" INTEGER NOT NULL,
    "accommodation_id" INTEGER NOT NULL,

    CONSTRAINT "Rating_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Contact" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "time" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "accommodation_id" INTEGER NOT NULL,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Like" (
    "id" SERIAL NOT NULL,
    "like" BOOLEAN NOT NULL,
    "user_id" INTEGER NOT NULL,
    "accommodation_id" INTEGER NOT NULL,

    CONSTRAINT "Like_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- AddForeignKey
ALTER TABLE "public"."Accomodation" ADD CONSTRAINT "Accomodation_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Accomodation" ADD CONSTRAINT "Accomodation_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "public"."Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."AccomodationImg" ADD CONSTRAINT "AccomodationImg_accomodationId_fkey" FOREIGN KEY ("accomodationId") REFERENCES "public"."Accomodation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Rating" ADD CONSTRAINT "Rating_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Rating" ADD CONSTRAINT "Rating_accommodation_id_fkey" FOREIGN KEY ("accommodation_id") REFERENCES "public"."Accomodation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Contact" ADD CONSTRAINT "Contact_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Contact" ADD CONSTRAINT "Contact_accommodation_id_fkey" FOREIGN KEY ("accommodation_id") REFERENCES "public"."Accomodation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Like" ADD CONSTRAINT "Like_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Like" ADD CONSTRAINT "Like_accommodation_id_fkey" FOREIGN KEY ("accommodation_id") REFERENCES "public"."Accomodation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
