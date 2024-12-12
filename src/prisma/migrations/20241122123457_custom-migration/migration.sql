-- CreateTable for User (Create first)
CREATE TABLE `User` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL UNIQUE,
    `password` VARCHAR(255) NOT NULL,
    `avatar` VARCHAR(255),
    'company' VARCHAR(255),
    'role' VARCHAR(255),
    'username' VARCHAR(255),
    'country' VARCHAR(255),
    'contact' VARCHAR(255),
    'currentplan' VARCHAR(255),
    'status' VARCHAR(255),
    'avatarColor'VARCHAR(255),
    'taxID' INT,
    'language' VARCHAR(255),
    'suspend' VARCHAR(255),
);

-- CreateTable for Account (Foreign Key references User.id)
CREATE TABLE `Account` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `userId` INT,  -- Change this to INT to match User.id
    `type` VARCHAR(255),
    `provider` VARCHAR(255),
    `providerAccountId` VARCHAR(255),
    `refresh_token` TEXT,
    `access_token` TEXT,
    `expires_at` INT,
    `token_type` VARCHAR(255),
    `scope` VARCHAR(255),
    `id_token` TEXT,
    `session_state` TEXT,
    FOREIGN KEY (`userId`)  REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable for Session (Foreign Key references User.id)
CREATE TABLE `Session` (
    `id` VARCHAR(255) NOT NULL PRIMARY KEY,
    `sessionToken` VARCHAR(255) NOT NULL,
    `userId` INT NOT NULL,  -- Change this to INT to match User.id
    `expires` DATETIME NOT NULL,
    FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable for VerificationToken
CREATE TABLE `VerificationToken` (
    `identifier` VARCHAR(255) NOT NULL,
    `token` VARCHAR(255) NOT NULL,
    `expires` DATETIME NOT NULL
);

-- Create Indexes
CREATE UNIQUE INDEX `Account_provider_providerAccountId_key` ON `Account`(`provider`, `providerAccountId`);
CREATE UNIQUE INDEX `Session_sessionToken_key` ON `Session`(`sessionToken`);
CREATE UNIQUE INDEX `User_email_key` ON `User`(`email`);
CREATE UNIQUE INDEX `VerificationToken_token_key` ON `VerificationToken`(`token`);
CREATE UNIQUE INDEX `VerificationToken_identifier_token_key` ON `VerificationToken`(`identifier`, `token`);
