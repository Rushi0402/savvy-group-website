/*
  Warnings:

  - You are about to drop the column `recipientCount` on the `Campaign` table. All the data in the column will be lost.
  - Made the column `previewText` on table `Campaign` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Campaign" DROP COLUMN "recipientCount",
ADD COLUMN     "recipients" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "previewText" SET NOT NULL;
