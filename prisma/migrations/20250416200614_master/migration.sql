/*
  Warnings:

  - The `isActive` column on the `Master` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[phone]` on the table `Master` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Master" DROP COLUMN "isActive",
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "image" DROP NOT NULL,
ALTER COLUMN "passportImage" DROP NOT NULL,
ALTER COLUMN "star" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Master_phone_key" ON "Master"("phone");
