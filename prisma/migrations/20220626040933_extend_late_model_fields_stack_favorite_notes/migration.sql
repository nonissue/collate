-- AlterTable
ALTER TABLE "Late" ADD COLUMN     "favorite" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "stack" BOOLEAN NOT NULL DEFAULT false;
