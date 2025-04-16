/*
  Warnings:

  - You are about to drop the `_MasterTomasterProfessions` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `masterId` to the `masterProfessions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_MasterTomasterProfessions" DROP CONSTRAINT "_MasterTomasterProfessions_A_fkey";

-- DropForeignKey
ALTER TABLE "_MasterTomasterProfessions" DROP CONSTRAINT "_MasterTomasterProfessions_B_fkey";

-- AlterTable
ALTER TABLE "masterProfessions" ADD COLUMN     "masterId" INTEGER NOT NULL,
ALTER COLUMN "minWorking_h" DROP NOT NULL,
ALTER COLUMN "price_h" DROP NOT NULL,
ALTER COLUMN "price_d" DROP NOT NULL;

-- DropTable
DROP TABLE "_MasterTomasterProfessions";

-- AddForeignKey
ALTER TABLE "masterProfessions" ADD CONSTRAINT "masterProfessions_masterId_fkey" FOREIGN KEY ("masterId") REFERENCES "Master"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
