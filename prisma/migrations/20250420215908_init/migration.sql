-- CreateTable
CREATE TABLE "_CommentToMaster" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_CommentToMaster_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_CommentToMaster_B_index" ON "_CommentToMaster"("B");

-- AddForeignKey
ALTER TABLE "_CommentToMaster" ADD CONSTRAINT "_CommentToMaster_A_fkey" FOREIGN KEY ("A") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CommentToMaster" ADD CONSTRAINT "_CommentToMaster_B_fkey" FOREIGN KEY ("B") REFERENCES "Master"("id") ON DELETE CASCADE ON UPDATE CASCADE;
