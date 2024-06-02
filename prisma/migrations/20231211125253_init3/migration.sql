/*
  Warnings:

  - You are about to drop the column `exchangeId` on the `Network` table. All the data in the column will be lost.
  - You are about to drop the `Transaction` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[exchange_id]` on the table `Network` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `exchange_id` to the `Network` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Network` DROP FOREIGN KEY `Network_exchangeId_fkey`;

-- DropForeignKey
ALTER TABLE `Transaction` DROP FOREIGN KEY `Transaction_exchangeId_fkey`;

-- DropForeignKey
ALTER TABLE `Transaction` DROP FOREIGN KEY `Transaction_networkId_fkey`;

-- AlterTable
ALTER TABLE `Network` DROP COLUMN `exchangeId`,
    ADD COLUMN `exchange_id` INTEGER NOT NULL;

-- DropTable
DROP TABLE `Transaction`;

-- CreateTable
CREATE TABLE `Withdrawal` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `amount` DECIMAL(65, 30) NOT NULL,
    `user_id` INTEGER NOT NULL,
    `to_wallet_address` VARCHAR(42) NOT NULL,
    `currency` VARCHAR(191) NOT NULL,
    `status` ENUM('PENDING', 'COMPLETED', 'FAILED', 'CANCELED') NOT NULL DEFAULT 'PENDING',
    `exchange_id` INTEGER NOT NULL,
    `network_id` INTEGER NOT NULL,

    UNIQUE INDEX `Withdrawal_exchange_id_key`(`exchange_id`),
    UNIQUE INDEX `Withdrawal_network_id_key`(`network_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Network_exchange_id_key` ON `Network`(`exchange_id`);

-- AddForeignKey
ALTER TABLE `Network` ADD CONSTRAINT `Network_exchange_id_fkey` FOREIGN KEY (`exchange_id`) REFERENCES `Exchange`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Withdrawal` ADD CONSTRAINT `Withdrawal_exchange_id_fkey` FOREIGN KEY (`exchange_id`) REFERENCES `Exchange`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Withdrawal` ADD CONSTRAINT `Withdrawal_network_id_fkey` FOREIGN KEY (`network_id`) REFERENCES `Network`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
