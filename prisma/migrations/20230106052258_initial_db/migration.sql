-- CreateEnum
CREATE TYPE "LEVEL_OF_EXPERIENCE" AS ENUM ('BASIC', 'INTERMIDIATE', 'ADVANCED');

-- CreateTable
CREATE TABLE "Query" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL,
    "domainName" TEXT NOT NULL,
    "skillName" TEXT[],
    "levelOfExperience" "LEVEL_OF_EXPERIENCE" NOT NULL DEFAULT 'BASIC',
    "yearOfExperience" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Query_pkey" PRIMARY KEY ("id")
);
