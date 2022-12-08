/*
  Warnings:

  - A unique constraint covering the columns `[password]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ccode` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_at` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pin` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `ccode` BIGINT NOT NULL,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL,
    ADD COLUMN `fingerprint` VARCHAR(191),
    ADD COLUMN `password` VARCHAR(191) NOT NULL,
    ADD COLUMN `phone_number` VARCHAR(191),
    ADD COLUMN `pin` INTEGER NOT NULL,
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL,
    ADD COLUMN `visibility` INTEGER NOT NULL DEFAULT 1,
    ADD COLUMN `wallet_balance` DOUBLE NOT NULL DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX `User.password_unique` ON `User`(`password`);
