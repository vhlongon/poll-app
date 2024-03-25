CREATE TABLE `events` (
	`text` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`author` text,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`max_participants` integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE `time_suggestions` (
	`id` integer PRIMARY KEY NOT NULL,
	`event_id` text NOT NULL,
	`time` text NOT NULL,
	`users` text DEFAULT '',
	`votes` integer DEFAULT 0 NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`event_id`) REFERENCES `events`(`text`) ON UPDATE no action ON DELETE no action
);
