-- DropForeignKey
ALTER TABLE "Tools" DROP CONSTRAINT "Tools_brandId_fkey";

-- DropForeignKey
ALTER TABLE "orderProduct" DROP CONSTRAINT "orderProduct_levelId_fkey";

-- DropForeignKey
ALTER TABLE "orderProduct" DROP CONSTRAINT "orderProduct_professionId_fkey";

-- DropForeignKey
ALTER TABLE "orderProduct" DROP CONSTRAINT "orderProduct_toolId_fkey";

-- AlterTable
ALTER TABLE "Tools" ALTER COLUMN "brandId" DROP NOT NULL,
ALTER COLUMN "isActive" SET DEFAULT true;

-- AlterTable
ALTER TABLE "orderProduct" ALTER COLUMN "toolId" DROP NOT NULL,
ALTER COLUMN "levelId" DROP NOT NULL,
ALTER COLUMN "professionId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Tools" ADD CONSTRAINT "Tools_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orderProduct" ADD CONSTRAINT "orderProduct_toolId_fkey" FOREIGN KEY ("toolId") REFERENCES "Tools"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orderProduct" ADD CONSTRAINT "orderProduct_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "Level"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orderProduct" ADD CONSTRAINT "orderProduct_professionId_fkey" FOREIGN KEY ("professionId") REFERENCES "Profession"("id") ON DELETE SET NULL ON UPDATE CASCADE;
