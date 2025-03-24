-- AlterTable
ALTER TABLE `distributor` MODIFY `distributorPhone` VARCHAR(191) NULL,
    MODIFY `distributorEmail` VARCHAR(191) NULL,
    MODIFY `distributorProfilePicture` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `distributor_history` MODIFY `updatedAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `description` VARCHAR(191) NULL;
