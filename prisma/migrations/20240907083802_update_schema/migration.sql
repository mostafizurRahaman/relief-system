/*
  Warnings:

  - You are about to drop the column `relifName` on the `Relief` table. All the data in the column will be lost.
  - Added the required column `reliefName` to the `Relief` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Relief" DROP COLUMN "relifName",
ADD COLUMN     "reliefName" VARCHAR NOT NULL;
