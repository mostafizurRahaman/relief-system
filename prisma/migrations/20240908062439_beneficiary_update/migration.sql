/*
  Warnings:

  - You are about to drop the `Benificiary` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Benificiary" DROP CONSTRAINT "Benificiary_createdBy_fkey";

-- DropForeignKey
ALTER TABLE "Benificiary" DROP CONSTRAINT "Benificiary_house_id_fkey";

-- DropTable
DROP TABLE "Benificiary";

-- CreateTable
CREATE TABLE "Beneficiary" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "profileImg" TEXT,
    "email" VARCHAR NOT NULL,
    "phoneNumber" VARCHAR NOT NULL,
    "nid" VARCHAR(14) NOT NULL,
    "fatherName" TEXT,
    "husbandName" TEXT,
    "createdBy" TEXT NOT NULL,
    "house_id" TEXT NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Beneficiary_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Beneficiary_phoneNumber_key" ON "Beneficiary"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Beneficiary_nid_key" ON "Beneficiary"("nid");

-- CreateIndex
CREATE UNIQUE INDEX "Beneficiary_house_id_key" ON "Beneficiary"("house_id");

-- AddForeignKey
ALTER TABLE "Beneficiary" ADD CONSTRAINT "Beneficiary_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "admins"("phoneNumber") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Beneficiary" ADD CONSTRAINT "Beneficiary_house_id_fkey" FOREIGN KEY ("house_id") REFERENCES "House"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
