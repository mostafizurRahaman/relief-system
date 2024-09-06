-- CreateEnum
CREATE TYPE "ReliefStatus" AS ENUM ('RUNNING', 'CLOSED');

-- CreateTable
CREATE TABLE "Relief" (
    "id" TEXT NOT NULL,
    "relifName" VARCHAR NOT NULL,
    "providerName" VARCHAR NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "status" "ReliefStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Relief_pkey" PRIMARY KEY ("id")
);
