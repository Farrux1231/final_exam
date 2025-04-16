-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "role" TEXT NOT NULL,
    "regionId" INTEGER NOT NULL,
    "stir" INTEGER,
    "mfo" INTEGER,
    "hr" INTEGER,
    "bank" TEXT,
    "oked" INTEGER,
    "manzil" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Region" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Region_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" SERIAL NOT NULL,
    "ip" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Level" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Level_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "message" TEXT NOT NULL,
    "star" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Brand" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Brand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Power" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Power_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Size" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Size_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Master" (
    "id" SERIAL NOT NULL,
    "fullname" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "isActive" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "passportImage" TEXT NOT NULL,
    "star" DOUBLE PRECISION NOT NULL,
    "about" TEXT NOT NULL,

    CONSTRAINT "Master_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "masterProfessions" (
    "id" SERIAL NOT NULL,
    "minWorking_h" INTEGER NOT NULL,
    "professionId" INTEGER NOT NULL,
    "levelId" INTEGER NOT NULL,
    "price_h" DOUBLE PRECISION NOT NULL,
    "price_d" DOUBLE PRECISION NOT NULL,
    "experience" INTEGER NOT NULL,

    CONSTRAINT "masterProfessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "professionLevel" (
    "id" SERIAL NOT NULL,
    "minWorking_h" INTEGER NOT NULL,
    "price_h" INTEGER NOT NULL,
    "price_d" INTEGER NOT NULL,

    CONSTRAINT "professionLevel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profession" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "isActive" TEXT NOT NULL,
    "professionToolId" INTEGER NOT NULL,
    "professionLevelId" INTEGER NOT NULL,
    "orderProductId" INTEGER NOT NULL,

    CONSTRAINT "Profession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "professionTool" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "professionTool_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tools" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "price_h" DOUBLE PRECISION NOT NULL,
    "price_d" DOUBLE PRECISION NOT NULL,
    "quantity" INTEGER NOT NULL,
    "code" INTEGER NOT NULL,
    "brandId" INTEGER NOT NULL,
    "isActive" TEXT NOT NULL,
    "capacityId" INTEGER NOT NULL,
    "sizeId" INTEGER NOT NULL,
    "image" TEXT NOT NULL,
    "productId" INTEGER NOT NULL,
    "professionToolId" INTEGER NOT NULL,

    CONSTRAINT "Tools_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "location" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "pay_type" TEXT NOT NULL,
    "withDelivery" BOOLEAN NOT NULL,
    "status" TEXT NOT NULL,
    "instruction" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orderProduct" (
    "id" SERIAL NOT NULL,
    "isActive" TEXT NOT NULL,
    "timeUnit" TEXT NOT NULL,
    "workingTime" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "count" INTEGER NOT NULL,
    "orderId" INTEGER NOT NULL,

    CONSTRAINT "orderProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FAQ" (
    "id" SERIAL NOT NULL,
    "answer" TEXT NOT NULL,
    "quiteions" TEXT NOT NULL,

    CONSTRAINT "FAQ_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contact" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "message" TEXT NOT NULL,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "generalInfo" (
    "id" SERIAL NOT NULL,
    "link" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,

    CONSTRAINT "generalInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_LevelToorderProduct" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_LevelToorderProduct_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_LevelToprofessionLevel" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_LevelToprofessionLevel_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_MasterTomasterProfessions" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_MasterTomasterProfessions_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Region_name_key" ON "Region"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Level_name_key" ON "Level"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Brand_name_key" ON "Brand"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Power_name_key" ON "Power"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Size_name_key" ON "Size"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Tools_code_key" ON "Tools"("code");

-- CreateIndex
CREATE INDEX "_LevelToorderProduct_B_index" ON "_LevelToorderProduct"("B");

-- CreateIndex
CREATE INDEX "_LevelToprofessionLevel_B_index" ON "_LevelToprofessionLevel"("B");

-- CreateIndex
CREATE INDEX "_MasterTomasterProfessions_B_index" ON "_MasterTomasterProfessions"("B");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "Region"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "masterProfessions" ADD CONSTRAINT "masterProfessions_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "Level"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "masterProfessions" ADD CONSTRAINT "masterProfessions_professionId_fkey" FOREIGN KEY ("professionId") REFERENCES "Profession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profession" ADD CONSTRAINT "Profession_orderProductId_fkey" FOREIGN KEY ("orderProductId") REFERENCES "orderProduct"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profession" ADD CONSTRAINT "Profession_professionToolId_fkey" FOREIGN KEY ("professionToolId") REFERENCES "professionTool"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profession" ADD CONSTRAINT "Profession_professionLevelId_fkey" FOREIGN KEY ("professionLevelId") REFERENCES "professionLevel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tools" ADD CONSTRAINT "Tools_professionToolId_fkey" FOREIGN KEY ("professionToolId") REFERENCES "professionTool"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tools" ADD CONSTRAINT "Tools_productId_fkey" FOREIGN KEY ("productId") REFERENCES "orderProduct"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tools" ADD CONSTRAINT "Tools_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tools" ADD CONSTRAINT "Tools_capacityId_fkey" FOREIGN KEY ("capacityId") REFERENCES "Power"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tools" ADD CONSTRAINT "Tools_sizeId_fkey" FOREIGN KEY ("sizeId") REFERENCES "Size"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orderProduct" ADD CONSTRAINT "orderProduct_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LevelToorderProduct" ADD CONSTRAINT "_LevelToorderProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "Level"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LevelToorderProduct" ADD CONSTRAINT "_LevelToorderProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "orderProduct"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LevelToprofessionLevel" ADD CONSTRAINT "_LevelToprofessionLevel_A_fkey" FOREIGN KEY ("A") REFERENCES "Level"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LevelToprofessionLevel" ADD CONSTRAINT "_LevelToprofessionLevel_B_fkey" FOREIGN KEY ("B") REFERENCES "professionLevel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MasterTomasterProfessions" ADD CONSTRAINT "_MasterTomasterProfessions_A_fkey" FOREIGN KEY ("A") REFERENCES "Master"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MasterTomasterProfessions" ADD CONSTRAINT "_MasterTomasterProfessions_B_fkey" FOREIGN KEY ("B") REFERENCES "masterProfessions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
