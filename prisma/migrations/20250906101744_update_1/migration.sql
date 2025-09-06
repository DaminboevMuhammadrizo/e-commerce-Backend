/*
  Warnings:

  - Made the column `img` on table `Category` required. This step will fail if there are existing NULL values in that column.
  - Made the column `icon_img` on table `Category` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."Category" ALTER COLUMN "img" SET NOT NULL,
ALTER COLUMN "icon_img" SET NOT NULL;
