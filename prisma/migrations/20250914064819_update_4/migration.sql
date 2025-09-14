-- CreateTable
CREATE TABLE "public"."Idea" (
    "id" SERIAL NOT NULL,
    "fullName" TEXT NOT NULL,
    "message" TEXT NOT NULL,

    CONSTRAINT "Idea_pkey" PRIMARY KEY ("id")
);
