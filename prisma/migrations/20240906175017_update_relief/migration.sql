/*
  Warnings:

  - Added the required column `number_of_recipients` to the `Relief` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity_of_relief` to the `Relief` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Relief" ADD COLUMN     "number_of_recipients" INTEGER NOT NULL,
ADD COLUMN     "quantity_of_relief" INTEGER NOT NULL;
