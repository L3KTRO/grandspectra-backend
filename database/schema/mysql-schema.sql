/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
DROP TABLE IF EXISTS `cache`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cache` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `collection_movie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `collection_movie` (
  `collection_id` int unsigned NOT NULL,
  `movie_id` int unsigned NOT NULL,
  PRIMARY KEY (`collection_id`,`movie_id`),
  KEY `collection_movie_movie_id_foreign` (`movie_id`),
  CONSTRAINT `collection_movie_collection_id_foreign` FOREIGN KEY (`collection_id`) REFERENCES `collections` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `collection_movie_movie_id_foreign` FOREIGN KEY (`movie_id`) REFERENCES `movies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `collections`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `collections` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `name_sort` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `parts` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `overview` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `poster` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `backdrop` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `collection_name_index` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `companies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `companies` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `headquarters` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `homepage` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `logo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `origin_country` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `companies_name_index` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `company_movie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `company_movie` (
  `company_id` int unsigned NOT NULL,
  `movie_id` int unsigned NOT NULL,
  PRIMARY KEY (`company_id`,`movie_id`),
  KEY `company_movie_movie_id_foreign` (`movie_id`),
  CONSTRAINT `company_movie_company_id_foreign` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `company_movie_movie_id_foreign` FOREIGN KEY (`movie_id`) REFERENCES `movies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `company_tv`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `company_tv` (
  `company_id` int unsigned NOT NULL,
  `tv_id` int unsigned NOT NULL,
  PRIMARY KEY (`company_id`,`tv_id`),
  KEY `company_tv_tv_id_foreign` (`tv_id`),
  CONSTRAINT `company_tv_company_id_foreign` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `company_tv_tv_id_foreign` FOREIGN KEY (`tv_id`) REFERENCES `tv` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `credits`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `credits` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `person_id` int unsigned NOT NULL,
  `movie_id` int unsigned DEFAULT NULL,
  `tv_id` int unsigned DEFAULT NULL,
  `occupation_id` smallint unsigned NOT NULL,
  `order` int unsigned DEFAULT NULL,
  `character` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `credits_person_id_movie_id_tv_id_occupation_id_character_unique` (`person_id`,`movie_id`,`tv_id`,`occupation_id`,`character`),
  KEY `credits_occupation_id_foreign` (`occupation_id`),
  KEY `credits_movie_id_foreign` (`movie_id`),
  KEY `credits_tv_id_foreign` (`tv_id`),
  CONSTRAINT `credits_movie_id_foreign` FOREIGN KEY (`movie_id`) REFERENCES `movies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `credits_occupation_id_foreign` FOREIGN KEY (`occupation_id`) REFERENCES `occupations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `credits_person_id_foreign` FOREIGN KEY (`person_id`) REFERENCES `people` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `credits_tv_id_foreign` FOREIGN KEY (`tv_id`) REFERENCES `tv` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `episodes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `episodes` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `overview` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `production_code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `season_number` int NOT NULL,
  `season_id` int unsigned NOT NULL,
  `still` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tv_id` int unsigned NOT NULL,
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `vote_average` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `vote_count` int DEFAULT NULL,
  `air_date` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `episode_number` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `episodes_name_index` (`name`),
  KEY `episodes_season_id_index` (`season_id`),
  KEY `episodes_tv_id_foreign` (`tv_id`),
  CONSTRAINT `episodes_season_id_foreign` FOREIGN KEY (`season_id`) REFERENCES `seasons` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `episodes_tv_id_foreign` FOREIGN KEY (`tv_id`) REFERENCES `tv` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `genre_movie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `genre_movie` (
  `genre_id` int unsigned NOT NULL,
  `movie_id` int unsigned NOT NULL,
  PRIMARY KEY (`genre_id`,`movie_id`),
  KEY `genre_movie_movie_id_index` (`movie_id`),
  CONSTRAINT `genre_movie_genre_id_foreign` FOREIGN KEY (`genre_id`) REFERENCES `genres` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `genre_movie_movie_id_foreign` FOREIGN KEY (`movie_id`) REFERENCES `movies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `genre_tv`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `genre_tv` (
  `genre_id` int unsigned NOT NULL,
  `tv_id` int unsigned NOT NULL,
  PRIMARY KEY (`genre_id`,`tv_id`),
  KEY `genre_tv_tv_id_foreign` (`tv_id`),
  CONSTRAINT `genre_tv_genre_id_foreign` FOREIGN KEY (`genre_id`) REFERENCES `genres` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `genre_tv_tv_id_foreign` FOREIGN KEY (`tv_id`) REFERENCES `tv` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `genres`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `genres` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `genres_name_index` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `queue` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint(1) NOT NULL,
  `reserved_at` int unsigned DEFAULT NULL,
  `available_at` int unsigned NOT NULL,
  `created_at` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_reserved_at_index` (`queue`,`reserved_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `movies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `movies` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `tmdb_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `imdb_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `title_sort` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `original_language` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `adult` tinyint(1) DEFAULT NULL,
  `backdrop` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `budget` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `homepage` mediumtext COLLATE utf8mb4_unicode_ci,
  `original_title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `overview` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `popularity` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `poster` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `release_date` date DEFAULT NULL,
  `revenue` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `runtime` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tagline` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `vote_average` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `vote_count` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `trailer` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `movie_title_index` (`title`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `network_tv`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `network_tv` (
  `network_id` int unsigned NOT NULL,
  `tv_id` int unsigned NOT NULL,
  PRIMARY KEY (`network_id`,`tv_id`),
  KEY `network_tv_tv_id_foreign` (`tv_id`),
  CONSTRAINT `network_tv_network_id_foreign` FOREIGN KEY (`network_id`) REFERENCES `networks` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `network_tv_tv_id_foreign` FOREIGN KEY (`tv_id`) REFERENCES `tv` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `networks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `networks` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `logo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `homepage` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `headquarters` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `origin_country` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `networks_name_index` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `occupations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `occupations` (
  `id` smallint unsigned NOT NULL AUTO_INCREMENT,
  `position` smallint NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `people`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `people` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `imdb_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `known_for_department` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `place_of_birth` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `popularity` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `profile` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `still` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `adult` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `also_known_as` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `biography` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `birthday` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deathday` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `gender` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `homepage` mediumtext COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id`),
  KEY `person_name_index` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `pulse_aggregates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pulse_aggregates` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `bucket` int unsigned NOT NULL,
  `period` mediumint unsigned NOT NULL,
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `key` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `key_hash` binary(16) GENERATED ALWAYS AS (unhex(md5(`key`))) VIRTUAL,
  `aggregate` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` decimal(20,2) NOT NULL,
  `count` int unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `pulse_aggregates_bucket_period_type_aggregate_key_hash_unique` (`bucket`,`period`,`type`,`aggregate`,`key_hash`),
  KEY `pulse_aggregates_period_bucket_index` (`period`,`bucket`),
  KEY `pulse_aggregates_type_index` (`type`),
  KEY `pulse_aggregates_period_type_aggregate_bucket_index` (`period`,`type`,`aggregate`,`bucket`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `pulse_entries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pulse_entries` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `timestamp` int unsigned NOT NULL,
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `key` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `key_hash` binary(16) GENERATED ALWAYS AS (unhex(md5(`key`))) VIRTUAL,
  `value` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `pulse_entries_timestamp_index` (`timestamp`),
  KEY `pulse_entries_type_index` (`type`),
  KEY `pulse_entries_key_hash_index` (`key_hash`),
  KEY `pulse_entries_timestamp_type_key_hash_value_index` (`timestamp`,`type`,`key_hash`,`value`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `pulse_values`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pulse_values` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `timestamp` int unsigned NOT NULL,
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `key` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `key_hash` binary(16) GENERATED ALWAYS AS (unhex(md5(`key`))) VIRTUAL,
  `value` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `pulse_values_type_key_hash_unique` (`type`,`key_hash`),
  KEY `pulse_values_timestamp_index` (`timestamp`),
  KEY `pulse_values_type_index` (`type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `ratings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ratings` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `type` enum('movie','tv') COLLATE utf8mb4_unicode_ci NOT NULL,
  `tmdb_id` bigint unsigned NOT NULL,
  `qualification` int NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ratings_user_id_type_tmdb_id_unique` (`user_id`,`type`,`tmdb_id`),
  CONSTRAINT `ratings_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `seasons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `seasons` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `tv_id` int unsigned NOT NULL,
  `season_number` int NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `overview` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `poster` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `air_date` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `seasons_name_index` (`name`),
  KEY `seasons_tv_id_foreign` (`tv_id`),
  CONSTRAINT `seasons_tv_id_foreign` FOREIGN KEY (`tv_id`) REFERENCES `tv` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint unsigned DEFAULT NULL,
  `ip_address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `payload` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `sessions_id_unique` (`id`),
  KEY `sessions_user_id_foreign` (`user_id`),
  CONSTRAINT `sessions_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `tv`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tv` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `tmdb_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `imdb_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tvdb_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `name_sort` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `overview` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `number_of_episodes` int DEFAULT NULL,
  `count_existing_episodes` int DEFAULT NULL,
  `count_total_episodes` int DEFAULT NULL,
  `number_of_seasons` int DEFAULT NULL,
  `episode_run_time` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `first_air_date` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `homepage` mediumtext COLLATE utf8mb4_unicode_ci,
  `in_production` tinyint(1) DEFAULT NULL,
  `last_air_date` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `next_episode_to_air` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `origin_country` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `original_language` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `original_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `popularity` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `backdrop` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `poster` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `vote_average` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `vote_count` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `trailer` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `tv_name_index` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_username_unique` (`username`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `view_conteo_filas`;
/*!50001 DROP VIEW IF EXISTS `view_conteo_filas`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `view_conteo_filas` AS SELECT 
 1 AS `nombre_tabla`,
 1 AS `total_filas`*/;
SET character_set_client = @saved_cs_client;
/*!50003 DROP PROCEDURE IF EXISTS `ContarFilasTodasTablas` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`grandspectra`@`%` PROCEDURE `ContarFilasTodasTablas`()
BEGIN
    DECLARE done INT DEFAULT FALSE;
    DECLARE tabla VARCHAR(100);
    DECLARE consulta VARCHAR(200);
    DECLARE analyze_query VARCHAR(200);
    DECLARE cur CURSOR FOR 
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = DATABASE();
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
    
    DROP TEMPORARY TABLE IF EXISTS resultado_conteo;
    CREATE TEMPORARY TABLE resultado_conteo (
        nombre_tabla VARCHAR(100),
        total_filas INT
    );
    
    OPEN cur;
    
    read_loop: LOOP
        FETCH cur INTO tabla;
        IF done THEN
            LEAVE read_loop;
        END IF;
        
        -- Primero ejecutamos ANALYZE TABLE para actualizar las estadísticas
        SET @analyze_query = CONCAT('ANALYZE TABLE ', tabla);
        PREPARE stmt FROM @analyze_query;
        EXECUTE stmt;
        DEALLOCATE PREPARE stmt;
        
        -- Luego hacemos el conteo real de filas
        SET @consulta = CONCAT('INSERT INTO resultado_conteo SELECT "', tabla, '", COUNT(*) FROM ', tabla);
        PREPARE stmt FROM @consulta;
        EXECUTE stmt;
        DEALLOCATE PREPARE stmt;
    END LOOP;
    
    CLOSE cur;
    
    SELECT * FROM resultado_conteo ORDER BY nombre_tabla;
    DROP TEMPORARY TABLE resultado_conteo;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `TotalFilasPorTabla` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`grandspectra`@`%` PROCEDURE `TotalFilasPorTabla`()
BEGIN
    SELECT * FROM view_conteo_filas 
    ORDER BY total_filas DESC, nombre_tabla ASC;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50001 DROP VIEW IF EXISTS `view_conteo_filas`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`grandspectra`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `view_conteo_filas` AS select `information_schema`.`tables`.`TABLE_NAME` AS `nombre_tabla`,`information_schema`.`tables`.`TABLE_ROWS` AS `total_filas` from `information_schema`.`TABLES` `tables` where (`information_schema`.`tables`.`TABLE_SCHEMA` = database()) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (1,'0000_00_00_000000_create_achievements_tables',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (2,'2017_12_10_020753_create_articles_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (3,'2017_12_10_020753_create_ban_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (4,'2017_12_10_020753_create_bon_exchange_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (5,'2017_12_10_020753_create_bon_transactions_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (6,'2017_12_10_020753_create_bookmarks_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (7,'2017_12_10_020753_create_categories_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (8,'2017_12_10_020753_create_clients_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (9,'2017_12_10_020753_create_comments_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (10,'2017_12_10_020753_create_failed_login_attempts_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (11,'2017_12_10_020753_create_featured_torrents_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (12,'2017_12_10_020753_create_files_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (13,'2017_12_10_020753_create_follows_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (14,'2017_12_10_020753_create_forums_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (15,'2017_12_10_020753_create_graveyard_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (16,'2017_12_10_020753_create_groups_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (17,'2017_12_10_020753_create_history_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (18,'2017_12_10_020753_create_invites_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (19,'2017_12_10_020753_create_jobs_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (20,'2017_12_10_020753_create_likes_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (21,'2017_12_10_020753_create_log_activities_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (22,'2017_12_10_020753_create_notifications_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (23,'2017_12_10_020753_create_options_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (24,'2017_12_10_020753_create_pages_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (25,'2017_12_10_020753_create_password_resets_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (26,'2017_12_10_020753_create_peers_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (27,'2017_12_10_020753_create_permissions_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (28,'2017_12_10_020753_create_personal_freeleech_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (29,'2017_12_10_020753_create_polls_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (30,'2017_12_10_020753_create_posts_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (31,'2017_12_10_020753_create_private_messages_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (32,'2017_12_10_020753_create_reports_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (33,'2017_12_10_020753_create_request_bounty_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (34,'2017_12_10_020753_create_request_claims_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (35,'2017_12_10_020753_create_requests_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (36,'2017_12_10_020753_create_rss_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (37,'2017_12_10_020753_create_sessions_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (38,'2017_12_10_020753_create_shoutbox_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (39,'2017_12_10_020753_create_tag_torrent_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (40,'2017_12_10_020753_create_tags_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (41,'2017_12_10_020753_create_thanks_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (42,'2017_12_10_020753_create_topics_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (43,'2017_12_10_020753_create_torrents_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (44,'2017_12_10_020753_create_types_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (45,'2017_12_10_020753_create_user_activations_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (46,'2017_12_10_020753_create_user_notes_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (47,'2017_12_10_020753_create_users_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (48,'2017_12_10_020753_create_voters_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (49,'2017_12_10_020753_create_warnings_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (50,'2017_12_10_020754_add_foreign_keys_to_articles_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (51,'2017_12_10_020754_add_foreign_keys_to_ban_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (52,'2017_12_10_020754_add_foreign_keys_to_clients_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (53,'2017_12_10_020754_add_foreign_keys_to_comments_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (54,'2017_12_10_020754_add_foreign_keys_to_history_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (55,'2017_12_10_020754_add_foreign_keys_to_peers_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (56,'2017_12_10_020754_add_foreign_keys_to_reports_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (57,'2017_12_10_020754_add_foreign_keys_to_rss_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (58,'2017_12_10_020754_add_foreign_keys_to_torrents_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (59,'2017_12_10_020754_add_foreign_keys_to_voters_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (60,'2017_12_10_020754_add_foreign_keys_to_warnings_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (61,'2017_12_10_020755_add_two_factor_columns_to_users_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (62,'2017_12_21_123452_add_custom_css_to_users_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (63,'2017_12_27_000000_add_locale_column',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (64,'2018_01_23_095412_add_implemented_to_topics_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (65,'2018_01_25_000000_add_twostep_to_users_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (66,'2018_02_06_142024_add_last_reply_at_to_topics_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (67,'2018_02_14_000000_add_is_internal_to_groups_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (68,'2018_03_13_000000_add_position_to_categories_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (69,'2018_03_21_000000_add_censor_to_users_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (70,'2018_03_27_000000_add_chat_hidden_to_users_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (71,'2018_04_19_221542_create_failed_jobs_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (72,'2018_04_21_181026_create_wishes_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (73,'2018_04_22_195516_alter_reports_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (74,'2018_04_28_021651_alter_shoutbox_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (75,'2018_04_28_022305_create_chatrooms_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (76,'2018_04_28_022344_add_chatroom_id_to_users_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (77,'2018_05_04_101711_create_chat_statuses_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (78,'2018_05_04_102055_add_chat_status_id_to_users_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (79,'2018_05_07_183534_add_can_upload_to_groups_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (80,'2018_05_15_223339_add_receiver_id_column_to_messages_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (81,'2018_05_18_144651_rename_ban_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (82,'2018_05_21_022459_add_torrent_layout_to_users_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (83,'2018_05_21_192858_alter_peers_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (84,'2018_05_22_224911_alter_private_messages_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (85,'2018_05_31_120936_create_albums_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (86,'2018_05_31_120955_create_images_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (87,'2018_06_11_110000_create_topic_subscriptions_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (88,'2018_07_12_114125_add_soft_deletes_to_warnings',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (89,'2018_08_19_212319_create_git_updates_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (90,'2018_09_08_153849_add_soft_deletes_to_user_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (91,'2018_09_24_205852_add_internal_to_torrents_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (92,'2018_09_29_163937_add_anon_to_requests_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (93,'2018_09_29_164525_add_anon_to_request_bounty_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (94,'2018_11_09_010002_add_immune_to_history_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (95,'2018_12_03_024251_create_applications_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (96,'2018_12_03_032701_create_application_image_proofs_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (97,'2018_12_03_032712_create_application_url_proofs_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (98,'2018_12_06_012908_update_tag_torrent_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (99,'2018_1_10_020753_create_freeleech_tokens_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (100,'2018_1_20_070937_create_two_step_auth_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (101,'2019_01_09_151754_alter_categories_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (102,'2019_01_09_175336_add_incognito_to_groups_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (103,'2019_01_10_102512_add_request_id_to_reports_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (104,'2019_01_11_001150_alter_rss_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (105,'2019_01_17_213210_add_torrent_filters_to_users_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (106,'2019_01_23_034500_alter_bon_transactions_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (107,'2019_01_24_033802_rename_topic_subscriptions_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (108,'2019_01_24_190220_alter_torrents_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (109,'2019_01_27_005216_create_user_privacy_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (110,'2019_01_28_031842_alter_groups_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (111,'2019_01_28_225127_create_user_notifications_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (112,'2019_01_29_054104_alter_users_tables',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (113,'2019_02_04_041644_create_user_echoes_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (114,'2019_02_05_220444_create_bots_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (115,'2019_02_06_005248_add_bot_id_to_messages_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (116,'2019_02_06_075938_create_bot_transactions_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (117,'2019_02_07_022409_create_user_audibles_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (118,'2019_02_10_010213_fix_chat_related_tables',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (119,'2019_02_21_133950_add_is_owner_to_groups_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (120,'2019_02_21_221047_add_request_to_user_privacy_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (121,'2019_03_20_214306_alter_users_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (122,'2019_06_17_172554_add_last_action_to_users_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (123,'2019_07_09_225645_add_release_year_to_torrents_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (124,'2019_07_30_210848_create_tv_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (125,'2019_07_30_210849_create_seasons_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (126,'2019_07_30_210850_create_cast_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (127,'2019_07_30_210850_create_collection_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (128,'2019_07_30_210850_create_companies_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (129,'2019_07_30_210850_create_episodes_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (130,'2019_07_30_210850_create_genres_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (131,'2019_07_30_210850_create_movie_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (132,'2019_07_30_210850_create_networks_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (133,'2019_07_30_210850_create_person_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (134,'2019_07_31_024816_alter_requests_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (135,'2019_07_31_210850_create_cast_episode_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (136,'2019_07_31_210850_create_cast_movie_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (137,'2019_07_31_210850_create_cast_season_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (138,'2019_07_31_210850_create_cast_tv_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (139,'2019_07_31_210850_create_company_tv_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (140,'2019_07_31_210850_create_crew_episode_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (141,'2019_07_31_210850_create_crew_movie_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (142,'2019_07_31_210850_create_crew_season_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (143,'2019_07_31_210850_create_crew_tv_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (144,'2019_07_31_210850_create_episode_guest_star_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (145,'2019_07_31_210850_create_episode_person_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (146,'2019_07_31_210850_create_genre_tv_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (147,'2019_07_31_210850_create_network_tv_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (148,'2019_07_31_210850_create_person_movie_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (149,'2019_07_31_210850_create_person_tv_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (150,'2019_07_31_210851_create_collection_movie_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (151,'2019_07_31_210851_create_company_movie_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (152,'2019_07_31_210851_create_genre_movie_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (153,'2019_07_31_210851_create_person_season_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (154,'2019_09_22_204439_create_playlists_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (155,'2019_09_22_204613_create_playlist_torrents_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (156,'2019_09_24_160123_alter_comments_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (157,'2019_11_05_233558_create_audits_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (158,'2019_11_27_025048_add_api_token_field_users',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (159,'2019_12_17_030908_create_keywords_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (160,'2020_01_02_203432_bdinfo_to_torrents_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (161,'2020_02_14_185120_add_foreign_key_to_options_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (162,'2020_02_14_202935_drop_ip_checking_in_polls_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (163,'2020_02_14_203001_drop_ip_address_in_voters_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (164,'2020_03_02_031656_update_comments_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (165,'2020_03_26_030235_create_subtitles_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (166,'2020_03_26_034620_create_media_languages_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (167,'2020_03_31_201107_add_is_double_upload_to_groups_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (168,'2020_05_19_023939_add_type_id_to_torrents_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (169,'2020_05_26_053632_add_type_id_to_requests_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (170,'2020_06_06_185230_create_resolutions_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (171,'2020_06_07_023938_add_resolution_id_to_torrents_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (172,'2020_06_07_054632_add_resolution_id_to_requests_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (173,'2020_06_10_014256_unique_groups',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (174,'2020_06_18_115296_add_bumped_at_to_torrents_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (175,'2020_07_07_202935_drop_tags_tables',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (176,'2020_10_06_143759_add_uuid_to_failed_jobs_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (177,'2020_10_07_012129_create_job_batches_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (178,'2020_10_18_235628_create_genre_torrent_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (179,'2020_11_01_165838_update_wishes_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (180,'2021_01_02_230512_update_users_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (181,'2021_01_06_360572_update_nfo_column_on_torrents_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (182,'2021_01_18_191121_create_tickets_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (183,'2021_01_18_191321_create_ticket_categories_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (184,'2021_01_18_191336_create_ticket_priorities_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (185,'2021_01_18_191357_create_ticket_attachments_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (186,'2021_01_18_191596_add_ticket_id_to_comments_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (187,'2021_03_04_042851_create_watchlists_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (188,'2021_03_11_024605_add_personal_release_to_torrents_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (189,'2021_03_14_093812_add_read_column_tickets_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (190,'2021_04_13_200421_update_about_column_on_users_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (191,'2021_04_18_085155_add_internals_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (192,'2021_05_26_215430_create_recommendations_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (193,'2021_06_28_123452_add_standalone_css_to_users_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (194,'2021_07_08_135537_add_flush_own_peers_to_users_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (195,'2021_07_27_140562_change_torrents_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (196,'2021_07_27_185231_create_distributors_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (197,'2021_07_27_285231_create_regions_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (198,'2021_07_31_172708_add_connectable_state_to_peers_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (199,'2021_08_20_121103_change_torrent_to_nullable_in_warning',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (200,'2021_10_03_180121_add_indexes_to_tables',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (201,'2021_11_22_115517_add_more_torrent_promos',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (202,'2021_11_26_024738_update_torrents_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (203,'2021_12_19_202317_fix_database_indexs',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (204,'2022_01_23_232931_update_comments_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (205,'2022_02_03_080630_update_groups_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (206,'2022_02_03_090219_update_torrents_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (207,'2022_02_06_210013_update_history_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (208,'2022_02_21_162827_create_torrent_downloads_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (209,'2022_04_27_143156_update_users_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (210,'2022_08_29_030244_update_history_table_add_refundable',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (211,'2022_08_29_030525_update_torrents_table_add_refundable',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (212,'2022_08_29_031309_update_groups_table_add_refundable',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (213,'2022_08_29_155715_create_client_blacklist_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (214,'2022_09_29_182332_alter_torrents_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (215,'2022_11_23_024350_update_history_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (216,'2022_11_23_195306_update_peers_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (217,'2022_11_24_032502_update_torrents_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (218,'2022_11_24_032521_update_requests_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (219,'2022_11_27_062458_drop_old_tables',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (220,'2022_11_29_010000_alter_reports_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (221,'2022_11_29_010010_alter_bon_transactions_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (222,'2022_11_29_030020_alter_user_id',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (223,'2022_12_05_012617_drop_conversations',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (224,'2022_12_21_014703_alter_torrent_id',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (225,'2022_12_22_004317_update_peers_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (226,'2022_12_22_213142_update_history_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (227,'2022_12_23_103322_update_requests_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (228,'2022_12_24_222839_update_follows_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (229,'2022_12_30_090331_update_user_notifications_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (230,'2022_12_30_090351_update_user_privacy_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (231,'2023_01_06_194157_remove_slugs',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (232,'2023_02_03_094806_update_rss_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (233,'2023_02_09_113903_clean_torrent_files',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (234,'2023_02_27_164336_credits_refactor',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (235,'2023_04_08_053641_alter_torrents_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (236,'2023_06_13_092029_alter_invites_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (237,'2023_06_14_102346_delete_user_activations',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (238,'2023_07_16_010906_add_indexes',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (239,'2023_07_20_084446_drop_distributor_position',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (240,'2023_07_22_023920_alter_movie_and_tv_ids',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (241,'2023_07_22_043634_post_playlist_html_special_chars_decode',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (242,'2023_07_22_165745_add_active_column_to_peers',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (243,'2023_07_22_204126_rename_bon_transactions_foreign_keys',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (244,'2023_07_23_190319_drop_genre_torrent_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (245,'2023_07_23_192525_rename_graveyard_to_resurrections',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (246,'2023_07_23_220207_alter_mediahub_ids',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (247,'2023_07_29_205035_add_torrent_folder_name',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (248,'2023_07_31_043749_drop_announce_column_from_torrents',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (249,'2023_08_05_231341_swap_username_for_user_id_on_request_claims',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (250,'2023_08_13_234828_add_forum_foreign_key_constraints',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (251,'2023_09_10_234654_create_blocked_ips_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (252,'2023_11_06_152351_drop_2fa_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (253,'2023_11_12_223126_create_passkeys',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (254,'2023_11_15_170525_create_apikeys',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (255,'2023_11_16_084506_create_rsskeys',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (256,'2023_11_16_122533_create_announces',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (257,'2023_12_19_133124_create_wiki_categories_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (258,'2023_12_19_233124_create_wikis_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (259,'2023_12_22_221619_plural_table_names',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (260,'2023_12_30_092415_add_peer_id_prefix_to_blacklist_client',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (261,'2024_01_08_025430_update_meta_tables',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (262,'2024_01_12_092724_alter_history_table_64_int_id',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (263,'2024_01_15_151522_update_groups_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (264,'2024_01_21_062125_create_email_updates',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (265,'2024_01_23_115425_add_created_at_index_to_torrent_downloads',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (266,'2024_02_02_222845_create_automatic_torrent_freeleeches_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (267,'2024_02_04_012321_remove_user_ratings',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (268,'2024_02_07_192449_add_requirements_to_groups',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (269,'2024_02_07_213520_add_visible_to_peers',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (270,'2024_02_08_095758_add_last_post_id_to_topics',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (271,'2024_02_08_144018_add_system_required_to_groups_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (272,'2024_02_09_190708_remove_show_forum_from_permissions',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (273,'2024_02_10_140207_create_forum_categories',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (274,'2024_02_13_033340_create_topic_reads',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (275,'2024_02_14_022118_fix_subtitle_filepaths',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (276,'2024_02_19_100212_add_primary_keys',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (277,'2024_02_19_100813_alter_year_type',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (278,'2024_02_19_102057_alter_floats_to_decimal',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (279,'2024_02_19_233644_add_permission_indexes',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (280,'2024_02_22_015442_create_post_tips_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (281,'2024_02_22_033718_create_gifts_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (282,'2024_02_22_092555_create_torrent_tips_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (283,'2024_02_23_154435_remove_request_bon_transactions',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (284,'2024_02_23_211021_create_internal_user',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (285,'2024_02_24_233030_rename_permissions_to_forum_permissions',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (286,'2024_02_26_000850_create_whitelisted_image_domains',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (287,'2024_03_06_062526_add_open_topics_to_forums',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (288,'2024_03_06_154000_add_user_indexes_to_torrents_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (289,'2024_03_19_211512_create_ticket_notes_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (290,'2024_03_21_145139_add_group_description',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (291,'2024_04_30_063509_remove_casino_triva_bet_bot',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (292,'2024_05_06_212348_create_donations_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (293,'2024_05_06_212410_create_donation_packages_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (294,'2024_05_06_212446_create_donation_gateways_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (295,'2024_05_08_000014_add_min_uploads_to_groups_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (296,'2024_05_23_184913_alter_wishes',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (297,'2024_05_26_034811_create_user_settings',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (298,'2024_05_26_043410_drop_user_stat_hidden_peer_hidden',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (299,'2024_05_29_075428_add_torrent_sort_field_to_user_settings',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (300,'2024_06_04_115016_add_torrent_search_autofocus_to_user_settings',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (301,'2024_06_06_042258_create_private_message_conversations',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (302,'2024_06_09_052006_drop_useless_columns_from_bots',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (303,'2024_06_13_125854_add_is_uploader_to_groups_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (304,'2024_06_13_185043_add_donation_columns_to_users_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (305,'2024_06_14_005443_add_soft_deletes_to_torrents_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (306,'2024_06_23_202341_add_prewarned_at_to_history',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (307,'2024_07_02_082323_add_indexes_to_torrents_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (308,'2024_07_16_083832_add_composite_primary_key_to_peers',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (309,'2024_07_19_143828_add_priority_to_topics',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (310,'2024_07_23_054141_add_composite_primary_key_to_history',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (311,'2024_07_23_054751_create_torrent_trumps_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (312,'2024_07_23_153202_add_poll_expiry',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (313,'2024_07_26_211112_fix_some_user_group_perms',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (314,'2024_07_28_231553_update_cat_type_res_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (315,'2024_08_14_012412_drop_release_year_from_torrents_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (316,'2024_08_17_140412_create_password_reset_history',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (317,'2024_08_25_121227_drop_num_torrent_from_categories',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (318,'2024_08_26_085452_fix_bot_systembot_nerdbot_flags',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (319,'2024_09_02_224259_alter_reports_add_snooze_until',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (320,'2024_09_27_072554_add_indexes_to_audits',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (321,'2024_09_29_041904_add_indexes_for_top10_performance',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (322,'2024_10_10_140532_update_mediainfo_from_text_to_longtext',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (323,'2024_10_13_221353_create_events_claimed_prizes_tables',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (324,'2024_10_29_180417_add_internal_note_to_invites_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (325,'2024_11_01_013426_add_soft_deletes_to_donation_packages_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (326,'2024_11_13_044550_create_unregistered_info_hashes_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (327,'2024_11_26_170256_add_is_torrent_modo_to_groups_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (328,'2024_12_09_175613_add_index_on_created_at_for_comments',2);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (329,'2025_02_26_142711_create_cache_table',3);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (330,'2025_02_27_095304_create_pulse_tables',4);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (331,'2025_02_27_220418_modify_recommendations_date_type',5);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (332,'2025_02_27_221257_modify_movie_homepage_length',6);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (333,'2025_03_04_181654_modify_tv_homepage_length',7);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (335,'2025_03_06_220010_drop_unused_tables',8);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (336,'2025_03_07_191221_modify_person_homepage_length',8);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (339,'2025_03_07_003709_modify_sessions_userid_type',9);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (340,'2025_03_07_194405_create_users_table',9);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (341,'2025_03_07_194673_create_ratings_table',9);
