-- CreateTable
CREATE TABLE "House" (
    "id" TEXT NOT NULL,
    "wordNo" INTEGER NOT NULL,
    "name" VARCHAR NOT NULL,
    "addBy" VARCHAR NOT NULL,

    CONSTRAINT "House_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "House" ADD CONSTRAINT "House_addBy_fkey" FOREIGN KEY ("addBy") REFERENCES "admins"("phoneNumber") ON DELETE RESTRICT ON UPDATE CASCADE;
