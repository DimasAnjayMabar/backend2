-- CreateTable
CREATE TABLE `distributor_history` (
    `distributorHistoryId` INTEGER NOT NULL AUTO_INCREMENT,
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `description` VARCHAR(191) NOT NULL,
    `distributorId` INTEGER NOT NULL,

    INDEX `distributor_history_distributorHistoryId_idx`(`distributorHistoryId`),
    PRIMARY KEY (`distributorHistoryId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `distributor_history` ADD CONSTRAINT `distributor_history_distributorId_fkey` FOREIGN KEY (`distributorId`) REFERENCES `distributor`(`distributorId`) ON DELETE RESTRICT ON UPDATE CASCADE;
