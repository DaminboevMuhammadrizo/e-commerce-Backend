/*
  Warnings:

  - You are about to drop the `AccomodationImg` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `img` to the `Accomodation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."AccomodationImg" DROP CONSTRAINT "AccomodationImg_accomodationId_fkey";

-- AlterTable
ALTER TABLE "public"."Accomodation" ADD COLUMN     "img" JSONB NOT NULL;

-- DropTable
DROP TABLE "public"."AccomodationImg";
