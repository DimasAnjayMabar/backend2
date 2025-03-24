-- CreateTable
CREATE TABLE `distributor` (
    `distributorId` INTEGER NOT NULL AUTO_INCREMENT,
    `distributorName` VARCHAR(191) NOT NULL,
    `distributorPhone` VARCHAR(191) NOT NULL,
    `distributorEmail` VARCHAR(191) NOT NULL,
    `distributorProfilePicture` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `distributor_distributorEmail_key`(`distributorEmail`),
    INDEX `distributor_distributorId_idx`(`distributorId`),
    PRIMARY KEY (`distributorId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
