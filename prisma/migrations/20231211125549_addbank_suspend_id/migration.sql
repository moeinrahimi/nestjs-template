/*
  Warnings:

  - Added the required column `bank_suspend_id` to the `Withdrawal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Withdrawal` ADD COLUMN `bank_suspend_id` INTEGER NOT NULL;
