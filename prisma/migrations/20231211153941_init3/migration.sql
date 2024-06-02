/*
  Warnings:

  - You are about to drop the column `network_id` on the `Withdrawal` table. All the data in the column will be lost.
  - You are about to drop the `Network` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `network` to the `Withdrawal` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Network` DROP FOREIGN KEY `Network_exchange_id_fkey`;

-- DropForeignKey
ALTER TABLE `Withdrawal` DROP FOREIGN KEY `Withdrawal_network_id_fkey`;

-- AlterTable
ALTER TABLE `Withdrawal` DROP COLUMN `network_id`,
    ADD COLUMN `network` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `Network`;
