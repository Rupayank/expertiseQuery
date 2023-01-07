/*
  Warnings:

  - You are about to drop the `Query` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Query";

-- CreateTable
CREATE TABLE "ExpertiseQuery" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL,
    "domainName" TEXT NOT NULL,
    "skillName" TEXT[],
    "levelOfExperience" "LEVEL_OF_EXPERIENCE" NOT NULL DEFAULT 'BASIC',
    "yearOfExperience" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "ExpertiseQuery_pkey" PRIMARY KEY ("id")
);
