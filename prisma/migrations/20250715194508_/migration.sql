-- CreateTable
CREATE TABLE `link` (
    `ref_link` VARCHAR(191) NOT NULL,
    `Short_Link` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `link_ref_link_key`(`ref_link`),
    UNIQUE INDEX `link_Short_Link_key`(`Short_Link`),
    PRIMARY KEY (`Short_Link`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
