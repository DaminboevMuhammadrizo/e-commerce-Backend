/*
  Warnings:

  - Added the required column `street` to the `Accomodation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Accomodation" ADD COLUMN     "street" TEXT NOT NULL;
