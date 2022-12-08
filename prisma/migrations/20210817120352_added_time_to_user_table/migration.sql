/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `User`;

-- CreateTable
CREATE TABLE `accounts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `transfers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `amount` FLOAT NOT NULL,
    `to_account` VARCHAR(50) NOT NULL,
    `to_bank` VARCHAR(50) NOT NULL,
    `to_name` VARCHAR(50) NOT NULL,
    `bal_after` FLOAT NOT NULL,
    `createAt` DATETIME(0) NOT NULL,
    `updateAt` DATETIME(0) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `acces_tokens` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `token` VARCHAR(300) NOT NULL,
    `status` VARCHAR(11) NOT NULL,
    `createAt` DATETIME(0) NOT NULL,
    `updateAt` DATETIME(0) NOT NULL,
    `visible` INTEGER NOT NULL DEFAULT 1,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `bills` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `bill_id` INTEGER NOT NULL,
    `bill_type` VARCHAR(50) NOT NULL,
    `amount` FLOAT NOT NULL,
    `description` VARCHAR(300) NOT NULL,
    `createAt` DATETIME(0) NOT NULL,
    `updateAt` DATETIME(0) NOT NULL,
    `status` VARCHAR(50) NOT NULL,
    `access_details` LONGTEXT NOT NULL,
    `visible` INTEGER NOT NULL DEFAULT 1,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191),
    `password` VARCHAR(300) NOT NULL,
    `ccode` VARCHAR(20) NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `fingerprint` VARCHAR(191),
    `phone_number` VARCHAR(191),
    `pin` INTEGER NOT NULL,
    `createAt` DATETIME(0) NOT NULL,
    `updateAt` DATETIME(0) NOT NULL,
    `visibility` INTEGER NOT NULL DEFAULT 1,
    `wallet_balance` DOUBLE NOT NULL DEFAULT 0,

    UNIQUE INDEX `users.email_unique`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
