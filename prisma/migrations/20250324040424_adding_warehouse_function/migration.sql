-- CreateTable
CREATE TABLE `category` (
    `categoryId` INTEGER NOT NULL AUTO_INCREMENT,
    `categoryName` VARCHAR(191) NOT NULL,

    INDEX `category_categoryId_idx`(`categoryId`),
    PRIMARY KEY (`categoryId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `warehouse` (
    `productId` INTEGER NOT NULL AUTO_INCREMENT,
    `dateAdded` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `distributorId` INTEGER NOT NULL,
    `productName` VARCHAR(191) NOT NULL,
    `productPrice` DECIMAL(65, 30) NOT NULL,
    `percentProfit` DECIMAL(65, 30) NOT NULL,
    `productStock` INTEGER NOT NULL,
    `categoryId` INTEGER NOT NULL,

    INDEX `warehouse_productId_idx`(`productId`),
    PRIMARY KEY (`productId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `warehouse_history` (
    `warehouseHistoryId` INTEGER NOT NULL AUTO_INCREMENT,
    `updatedAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `description` VARCHAR(191) NULL,
    `productId` INTEGER NOT NULL,

    INDEX `warehouse_history_warehouseHistoryId_idx`(`warehouseHistoryId`),
    PRIMARY KEY (`warehouseHistoryId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `warehouse` ADD CONSTRAINT `warehouse_distributorId_fkey` FOREIGN KEY (`distributorId`) REFERENCES `distributor`(`distributorId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `warehouse` ADD CONSTRAINT `warehouse_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `category`(`categoryId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `warehouse_history` ADD CONSTRAINT `warehouse_history_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `warehouse`(`productId`) ON DELETE RESTRICT ON UPDATE CASCADE;
