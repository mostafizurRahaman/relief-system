-- DropForeignKey
ALTER TABLE "Beneficiary" DROP CONSTRAINT "Beneficiary_createdBy_fkey";

-- AddForeignKey
ALTER TABLE "Beneficiary" ADD CONSTRAINT "Beneficiary_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "users"("phoneNumber") ON DELETE RESTRICT ON UPDATE CASCADE;
