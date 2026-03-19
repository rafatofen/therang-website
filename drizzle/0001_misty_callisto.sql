CREATE TABLE `admin_users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`username` varchar(64) NOT NULL,
	`passwordHash` varchar(255) NOT NULL,
	`displayName` varchar(128),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `admin_users_id` PRIMARY KEY(`id`),
	CONSTRAINT `admin_users_username_unique` UNIQUE(`username`)
);
--> statement-breakpoint
CREATE TABLE `partners` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(128) NOT NULL,
	`type` varchar(128) NOT NULL,
	`perk` text,
	`description` text,
	`imageUrl` text,
	`website` varchar(512),
	`address` varchar(512),
	`sortOrder` int NOT NULL DEFAULT 0,
	`visible` int NOT NULL DEFAULT 1,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `partners_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `seo_settings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`pageKey` varchar(64) NOT NULL,
	`title` varchar(256),
	`description` text,
	`ogImage` text,
	`keywords` text,
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `seo_settings_id` PRIMARY KEY(`id`),
	CONSTRAINT `seo_settings_pageKey_unique` UNIQUE(`pageKey`)
);
--> statement-breakpoint
CREATE TABLE `site_content` (
	`id` int AUTO_INCREMENT NOT NULL,
	`sectionKey` varchar(128) NOT NULL,
	`title` text,
	`subtitle` text,
	`body` text,
	`buttonText` varchar(128),
	`buttonLink` varchar(512),
	`imageUrl` text,
	`extraData` json,
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `site_content_id` PRIMARY KEY(`id`),
	CONSTRAINT `site_content_sectionKey_unique` UNIQUE(`sectionKey`)
);
--> statement-breakpoint
CREATE TABLE `site_links` (
	`id` int AUTO_INCREMENT NOT NULL,
	`linkKey` varchar(64) NOT NULL,
	`label` varchar(128) NOT NULL,
	`url` text NOT NULL,
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `site_links_id` PRIMARY KEY(`id`),
	CONSTRAINT `site_links_linkKey_unique` UNIQUE(`linkKey`)
);
--> statement-breakpoint
CREATE TABLE `testimonials` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(128) NOT NULL,
	`source` varchar(64) NOT NULL DEFAULT 'Google',
	`text` text NOT NULL,
	`rating` int NOT NULL DEFAULT 5,
	`sortOrder` int NOT NULL DEFAULT 0,
	`visible` int NOT NULL DEFAULT 1,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `testimonials_id` PRIMARY KEY(`id`)
);
