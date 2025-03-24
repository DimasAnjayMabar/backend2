-- AlterTable
ALTER TABLE `distributor` ADD COLUMN `isDistributorActive` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `isDistributorDeleted` BOOLEAN NOT NULL DEFAULT false;
