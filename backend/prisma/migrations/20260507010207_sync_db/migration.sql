/*
  Warnings:

  - Added the required column `size` to the `Media` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Media" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "filename" TEXT NOT NULL,
    "originalName" TEXT NOT NULL,
    "originalType" TEXT,
    "targetFormat" TEXT,
    "status" TEXT NOT NULL DEFAULT 'uploaded',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "size" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Media_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Media" ("createdAt", "filename", "id", "originalName", "originalType", "status", "targetFormat", "userId") SELECT "createdAt", "filename", "id", "originalName", "originalType", "status", "targetFormat", "userId" FROM "Media";
DROP TABLE "Media";
ALTER TABLE "new_Media" RENAME TO "Media";
CREATE INDEX "Media_userId_idx" ON "Media"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
