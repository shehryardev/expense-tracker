/*
  Warnings:

  - Added the required column `bgColor` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `color` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `icon` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `category` ADD COLUMN `bgColor` VARCHAR(191) NOT NULL,
    ADD COLUMN `color` VARCHAR(191) NOT NULL,
    ADD COLUMN `icon` VARCHAR(191) NOT NULL;
