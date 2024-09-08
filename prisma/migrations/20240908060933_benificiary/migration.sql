-- CreateTable
CREATE TABLE "Benificiary" (
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

    CONSTRAINT "Benificiary_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Benificiary_phoneNumber_key" ON "Benificiary"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Benificiary_nid_key" ON "Benificiary"("nid");

-- AddForeignKey
ALTER TABLE "Benificiary" ADD CONSTRAINT "Benificiary_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "admins"("phoneNumber") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Benificiary" ADD CONSTRAINT "Benificiary_house_id_fkey" FOREIGN KEY ("house_id") REFERENCES "House"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
