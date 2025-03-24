-- DropForeignKey
ALTER TABLE `distributor_history` DROP FOREIGN KEY `distributor_history_distributorId_fkey`;

-- DropIndex
DROP INDEX `distributor_history_distributorId_fkey` ON `distributor_history`;

-- AddForeignKey
ALTER TABLE `distributor_history` ADD CONSTRAINT `distributor_history_distributorId_fkey` FOREIGN KEY (`distributorId`) REFERENCES `distributor`(`distributorId`) ON DELETE CASCADE ON UPDATE CASCADE;
