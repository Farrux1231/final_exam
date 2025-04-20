-- CreateTable
CREATE TABLE "_MasterToOrder" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_MasterToOrder_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_MasterToOrder_B_index" ON "_MasterToOrder"("B");

-- AddForeignKey
ALTER TABLE "_MasterToOrder" ADD CONSTRAINT "_MasterToOrder_A_fkey" FOREIGN KEY ("A") REFERENCES "Master"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MasterToOrder" ADD CONSTRAINT "_MasterToOrder_B_fkey" FOREIGN KEY ("B") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;
