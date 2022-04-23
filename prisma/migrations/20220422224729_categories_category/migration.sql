/*
  Warnings:

  - You are about to drop the `CategoryOnLates` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CategoryOnLates" DROP CONSTRAINT "CategoryOnLates_categoryID_fkey";

-- DropForeignKey
ALTER TABLE "CategoryOnLates" DROP CONSTRAINT "CategoryOnLates_lateId_fkey";

-- AlterTable
ALTER TABLE "Late" ADD COLUMN     "categoryId" INTEGER;

-- DropTable
DROP TABLE "CategoryOnLates";

-- AddForeignKey
ALTER TABLE "Late" ADD CONSTRAINT "Late_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
