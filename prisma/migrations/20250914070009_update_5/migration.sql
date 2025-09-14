/*
  Warnings:

  - You are about to drop the `Idea` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."Idea";

-- CreateTable
CREATE TABLE "public"."Opinion" (
    "id" SERIAL NOT NULL,
    "fullName" TEXT NOT NULL,
    "message" TEXT NOT NULL,

    CONSTRAINT "Opinion_pkey" PRIMARY KEY ("id")
);
