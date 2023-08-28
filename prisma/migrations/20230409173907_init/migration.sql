-- CreateEnum
CREATE TYPE "Color" AS ENUM ('BLACK', 'WHITE', 'RED');

-- CreateTable
CREATE TABLE "User"
(
    "id"      SERIAL  NOT NULL,
    "email"   TEXT    NOT NULL,
    "name"    TEXT    NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Monke"
(
    "id"      SERIAL           NOT NULL,
    "name"    TEXT             NOT NULL,
    "weight"  DOUBLE PRECISION NOT NULL,
    "height"  DOUBLE PRECISION NOT NULL,
    "color"   "Color"          NOT NULL,
    "gender"  BOOLEAN          NOT NULL,
    "ownerId" INTEGER          NOT NULL,

    CONSTRAINT "Monke_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post"
(
    "id"          SERIAL  NOT NULL,
    "title"       TEXT    NOT NULL,
    "content"     TEXT    NOT NULL,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "authorId"    INTEGER NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment"
(
    "id"       SERIAL  NOT NULL,
    "content"  TEXT    NOT NULL,
    "postId"   INTEGER NOT NULL,
    "authorId" INTEGER NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Feedback"
(
    "id"       SERIAL   NOT NULL,
    "content"  TEXT     NOT NULL,
    "rating"   SMALLINT NOT NULL,
    "authorId" INTEGER  NOT NULL,

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User" ("email");

-- AddForeignKey
ALTER TABLE "Monke"
    ADD CONSTRAINT "Monke_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post"
    ADD CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment"
    ADD CONSTRAINT "Comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment"
    ADD CONSTRAINT "Comment_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback"
    ADD CONSTRAINT "Feedback_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;
