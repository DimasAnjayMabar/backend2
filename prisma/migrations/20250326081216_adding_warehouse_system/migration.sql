/*
  Warnings:

  - You are about to drop the column `productPrice` on the `warehouse` table. All the data in the column will be lost.
  - Added the required column `productSellPrice` to the `warehouse` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productStockPrice` to the `warehouse` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `warehouse` DROP COLUMN `productPrice`,
    ADD COLUMN `productSellPrice` DECIMAL(65, 30) NOT NULL,
    ADD COLUMN `productStockPrice` DECIMAL(65, 30) NOT NULL;

-- CreateTable
CREATE TABLE `transaction` (
    `transactionId` INTEGER NOT NULL AUTO_INCREMENT,
    `transactionCode` VARCHAR(191) NOT NULL,
    `transactionDate` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `distributorId` INTEGER NULL,
    `transactionType` VARCHAR(191) NULL,
    `transactionTotal` DECIMAL(65, 30) NULL,
    `discountId` INTEGER NULL,
    `transactionStatus` VARCHAR(191) NULL,
    `customerId` INTEGER NULL,

    UNIQUE INDEX `transaction_transactionCode_key`(`transactionCode`),
    INDEX `transaction_transactionId_idx`(`transactionId`),
    PRIMARY KEY (`transactionId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `transaction_history` (
    `transactionHistoryId` INTEGER NOT NULL AUTO_INCREMENT,
    `transactionId` INTEGER NOT NULL,
    `description` VARCHAR(191) NULL,
    `dateUpdated` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `transaction_history_transactionHistoryId_idx`(`transactionHistoryId`),
    PRIMARY KEY (`transactionHistoryId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `transaction_detail` (
    `detailTransactionId` INTEGER NOT NULL AUTO_INCREMENT,
    `transactionId` INTEGER NOT NULL,
    `productId` INTEGER NOT NULL,
    `subtotal` DECIMAL(65, 30) NULL,

    INDEX `transaction_detail_detailTransactionId_idx`(`detailTransactionId`),
    PRIMARY KEY (`detailTransactionId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `transaction_detail_history` (
    `transactionDetailHistoryId` INTEGER NOT NULL AUTO_INCREMENT,
    `transactionDetailId` INTEGER NOT NULL,
    `description` VARCHAR(191) NULL,
    `dateUpdated` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `transaction_detail_history_transactionDetailHistoryId_idx`(`transactionDetailHistoryId`),
    PRIMARY KEY (`transactionDetailHistoryId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `discount` (
    `discountId` INTEGER NOT NULL AUTO_INCREMENT,
    `discountName` VARCHAR(191) NULL,
    `percentage` DECIMAL(65, 30) NULL,

    INDEX `discount_discountId_idx`(`discountId`),
    PRIMARY KEY (`discountId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `customer` (
    `customerId` INTEGER NOT NULL AUTO_INCREMENT,
    `customerName` VARCHAR(191) NULL,
    `customerEmail` VARCHAR(191) NULL,
    `customerPhone` VARCHAR(191) NULL,
    `customerNIK` VARCHAR(191) NULL,

    INDEX `customer_customerId_idx`(`customerId`),
    PRIMARY KEY (`customerId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `transaction` ADD CONSTRAINT `transaction_distributorId_fkey` FOREIGN KEY (`distributorId`) REFERENCES `distributor`(`distributorId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transaction` ADD CONSTRAINT `transaction_discountId_fkey` FOREIGN KEY (`discountId`) REFERENCES `discount`(`discountId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transaction` ADD CONSTRAINT `transaction_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `customer`(`customerId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transaction_history` ADD CONSTRAINT `transaction_history_transactionId_fkey` FOREIGN KEY (`transactionId`) REFERENCES `transaction`(`transactionId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transaction_detail` ADD CONSTRAINT `transaction_detail_transactionId_fkey` FOREIGN KEY (`transactionId`) REFERENCES `transaction`(`transactionId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transaction_detail` ADD CONSTRAINT `transaction_detail_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `warehouse`(`productId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transaction_detail_history` ADD CONSTRAINT `transaction_detail_history_transactionDetailId_fkey` FOREIGN KEY (`transactionDetailId`) REFERENCES `transaction_detail`(`detailTransactionId`) ON DELETE RESTRICT ON UPDATE CASCADE;
