-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           8.0.30 - MySQL Community Server - GPL
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              12.1.0.6537
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Copiando estrutura do banco de dados para serious_game_db
CREATE DATABASE IF NOT EXISTS `serious_game_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `serious_game_db`;

-- Copiando estrutura para tabela serious_game_db.access_levels
CREATE TABLE IF NOT EXISTS `access_levels` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Nome do nível de acesso do usuário como ''''Administrador'', ''Supervisor'', ''Básico'';',
  `active` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;

-- Copiando dados para a tabela serious_game_db.access_levels: ~3 rows (aproximadamente)
INSERT IGNORE INTO `access_levels` (`id`, `name`, `active`, `created_at`, `updated_at`, `deleted_at`) VALUES
	(1, 'Administrator', 1, '2019-08-29 14:54:58', '2021-07-01 18:11:25', NULL),
	(2, 'Professor', 1, '2021-07-01 20:53:48', '2021-07-01 20:53:48', NULL),
	(3, 'Jogador', 1, '2021-07-01 20:54:04', '2023-04-15 18:11:16', NULL);

-- Copiando estrutura para tabela serious_game_db.access_level_user_permission
CREATE TABLE IF NOT EXISTS `access_level_user_permission` (
  `access_level_id` int NOT NULL,
  `user_permission_id` int NOT NULL,
  `allow` tinyint(1) NOT NULL,
  PRIMARY KEY (`access_level_id`,`user_permission_id`) USING BTREE,
  KEY `fk_access_levels_has_user_permissions_user_permissions1_idx` (`user_permission_id`) USING BTREE,
  KEY `fk_access_levels_has_user_permissions_access_levels1_idx` (`access_level_id`) USING BTREE,
  CONSTRAINT `access_level_user_permission_ibfk_1` FOREIGN KEY (`access_level_id`) REFERENCES `access_levels` (`id`),
  CONSTRAINT `access_level_user_permission_ibfk_2` FOREIGN KEY (`user_permission_id`) REFERENCES `user_permissions` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;

-- Copiando dados para a tabela serious_game_db.access_level_user_permission: ~63 rows (aproximadamente)
INSERT IGNORE INTO `access_level_user_permission` (`access_level_id`, `user_permission_id`, `allow`) VALUES
	(1, 1, 1),
	(1, 2, 1),
	(1, 3, 1),
	(1, 4, 1),
	(1, 6, 1),
	(1, 7, 1),
	(1, 8, 1),
	(1, 9, 1),
	(1, 11, 1),
	(1, 12, 1),
	(1, 13, 1),
	(1, 14, 1),
	(1, 15, 1),
	(1, 16, 1),
	(1, 17, 0),
	(1, 18, 0),
	(1, 19, 1),
	(1, 20, 1),
	(1, 21, 1),
	(1, 22, 1),
	(1, 23, 1),
	(1, 24, 1),
	(1, 25, 1),
	(1, 26, 1),
	(2, 1, 0),
	(2, 2, 0),
	(2, 3, 0),
	(2, 4, 0),
	(2, 6, 0),
	(2, 7, 0),
	(2, 8, 0),
	(2, 9, 0),
	(2, 11, 0),
	(2, 12, 0),
	(2, 13, 0),
	(2, 14, 0),
	(2, 15, 0),
	(2, 16, 0),
	(2, 17, 0),
	(2, 18, 0),
	(2, 19, 1),
	(2, 20, 0),
	(2, 21, 0),
	(2, 22, 0),
	(2, 23, 0),
	(2, 24, 0),
	(2, 25, 0),
	(2, 26, 0),
	(3, 1, 0),
	(3, 2, 0),
	(3, 3, 0),
	(3, 4, 0),
	(3, 6, 0),
	(3, 7, 0),
	(3, 8, 0),
	(3, 9, 0),
	(3, 11, 0),
	(3, 12, 0),
	(3, 13, 0),
	(3, 14, 0),
	(3, 19, 0),
	(3, 20, 0),
	(3, 21, 0),
	(3, 22, 0),
	(3, 23, 0),
	(3, 24, 0),
	(3, 25, 0),
	(3, 26, 0);

-- Copiando estrutura para tabela serious_game_db.auditings
CREATE TABLE IF NOT EXISTS `auditings` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `log_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `subject_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `subject_id` bigint unsigned DEFAULT NULL,
  `causer_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `causer_id` bigint unsigned DEFAULT NULL,
  `properties` json DEFAULT NULL,
  `batch_uuid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `event` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `subject` (`subject_type`,`subject_id`),
  KEY `causer` (`causer_type`,`causer_id`),
  KEY `activity_log_log_name_index` (`log_name`)
) ENGINE=InnoDB AUTO_INCREMENT=89 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Copiando dados para a tabela serious_game_db.auditings: ~75 rows (aproximadamente)
INSERT IGNORE INTO `auditings` (`id`, `log_name`, `description`, `subject_type`, `subject_id`, `causer_type`, `causer_id`, `properties`, `batch_uuid`, `event`, `created_at`, `updated_at`) VALUES
	(1, 'audit', 'updated', 'users', 1, NULL, NULL, '[]', NULL, 'updated', '2023-04-15 18:04:20', '2023-04-15 18:04:20'),
	(2, 'audit', 'logged into the system', 'users', 1, 'users', 1, NULL, NULL, NULL, '2023-04-15 18:04:20', '2023-04-15 18:04:20'),
	(3, 'audit', 'updated', 'users', 1, NULL, NULL, '[]', NULL, 'updated', '2023-04-15 18:10:42', '2023-04-15 18:10:42'),
	(4, 'audit', 'logged into the system', 'users', 1, 'users', 1, NULL, NULL, NULL, '2023-04-15 18:10:43', '2023-04-15 18:10:43'),
	(5, 'audit', 'logged into the system', 'users', 1, 'users', 1, NULL, NULL, NULL, '2023-04-15 18:12:14', '2023-04-15 18:12:14'),
	(6, 'audit', 'logged into the system', 'users', 1, 'users', 1, NULL, NULL, NULL, '2023-04-15 18:12:55', '2023-04-15 18:12:55'),
	(7, 'audit', 'logged into the system', 'users', 1, 'users', 1, NULL, NULL, NULL, '2023-04-16 21:33:23', '2023-04-16 21:33:23'),
	(8, 'audit', 'logged into the system', 'users', 1, 'users', 1, NULL, NULL, NULL, '2023-04-16 22:46:04', '2023-04-16 22:46:04'),
	(9, 'audit', 'logged into the system', 'users', 1, 'users', 1, NULL, NULL, NULL, '2023-04-16 22:46:49', '2023-04-16 22:46:49'),
	(10, 'audit', 'logged into the system', 'users', 1, 'users', 1, NULL, NULL, NULL, '2023-04-16 22:47:57', '2023-04-16 22:47:57'),
	(11, 'audit', 'logged into the system', 'users', 1, 'users', 1, NULL, NULL, NULL, '2023-04-16 22:48:57', '2023-04-16 22:48:57'),
	(12, 'audit', 'logged into the system', 'users', 1, 'users', 1, NULL, NULL, NULL, '2023-04-16 22:50:18', '2023-04-16 22:50:18'),
	(13, 'audit', 'logged into the system', 'users', 1, 'users', 1, NULL, NULL, NULL, '2023-04-16 22:51:20', '2023-04-16 22:51:20'),
	(14, 'audit', 'logged into the system', 'users', 1, 'users', 1, NULL, NULL, NULL, '2023-04-16 22:51:27', '2023-04-16 22:51:27'),
	(15, 'audit', 'logged into the system', 'users', 1, 'users', 1, NULL, NULL, NULL, '2023-04-16 22:51:52', '2023-04-16 22:51:52'),
	(16, 'audit', 'logged into the system', 'users', 1, 'users', 1, NULL, NULL, NULL, '2023-04-16 22:52:37', '2023-04-16 22:52:37'),
	(17, 'audit', 'logged into the system', 'users', 1, 'users', 1, NULL, NULL, NULL, '2023-04-16 22:56:12', '2023-04-16 22:56:12'),
	(18, 'audit', 'logged into the system', 'users', 1, 'users', 1, NULL, NULL, NULL, '2023-04-16 22:56:57', '2023-04-16 22:56:57'),
	(19, 'audit', 'logged into the system', 'users', 1, 'users', 1, NULL, NULL, NULL, '2023-04-16 22:58:06', '2023-04-16 22:58:06'),
	(20, 'audit', 'logged into the system', 'users', 1, 'users', 1, NULL, NULL, NULL, '2023-04-16 23:26:00', '2023-04-16 23:26:00'),
	(21, 'audit', 'logged into the system', 'users', 2, 'users', 2, NULL, NULL, NULL, '2023-04-16 23:26:09', '2023-04-16 23:26:09'),
	(22, 'audit', 'logged into the system', 'users', 1, 'users', 1, NULL, NULL, NULL, '2023-04-16 23:29:07', '2023-04-16 23:29:07'),
	(23, 'audit', 'logged into the system', 'users', 2, 'users', 2, NULL, NULL, NULL, '2023-04-16 23:29:12', '2023-04-16 23:29:12'),
	(24, 'audit', 'logged into the system', 'users', 2, 'users', 2, NULL, NULL, NULL, '2023-04-17 00:05:53', '2023-04-17 00:05:53'),
	(25, 'audit', 'logged into the system', 'users', 2, 'users', 2, NULL, NULL, NULL, '2023-04-19 03:06:57', '2023-04-19 03:06:57'),
	(26, 'audit', 'logged into the system', 'users', 2, 'users', 2, NULL, NULL, NULL, '2023-04-19 03:09:22', '2023-04-19 03:09:22'),
	(27, 'audit', 'logged into the system', 'users', 2, 'users', 2, NULL, NULL, NULL, '2023-04-19 03:10:02', '2023-04-19 03:10:02'),
	(28, 'audit', 'logged into the system', 'users', 2, 'users', 2, NULL, NULL, NULL, '2023-04-19 03:28:30', '2023-04-19 03:28:30'),
	(29, 'audit', 'logged into the system', 'users', 2, 'users', 2, NULL, NULL, NULL, '2023-04-22 19:14:31', '2023-04-22 19:14:31'),
	(30, 'audit', 'logged into the system', 'users', 2, 'users', 2, NULL, NULL, NULL, '2023-04-23 20:42:27', '2023-04-23 20:42:27'),
	(31, 'audit', 'created', 'game_settings', 1, 'users', 2, '[]', NULL, 'created', '2023-04-23 22:35:02', '2023-04-23 22:35:02'),
	(32, 'audit', 'logged into the system', 'users', 1, 'users', 1, NULL, NULL, NULL, '2023-04-24 13:06:06', '2023-04-24 13:06:06'),
	(33, 'audit', 'logged into the system', 'users', 2, 'users', 2, NULL, NULL, NULL, '2023-04-24 20:35:18', '2023-04-24 20:35:18'),
	(34, 'audit', 'logged into the system', 'users', 2, 'users', 2, NULL, NULL, NULL, '2023-04-24 20:35:23', '2023-04-24 20:35:23'),
	(35, 'audit', 'logged into the system', 'users', 1, 'users', 1, NULL, NULL, NULL, '2023-04-24 20:35:29', '2023-04-24 20:35:29'),
	(36, 'audit', 'logged into the system', 'users', 1, 'users', 1, NULL, NULL, NULL, '2023-04-30 18:38:20', '2023-04-30 18:38:20'),
	(37, 'audit', 'updated', 'themes', 2, 'users', 1, '[]', NULL, 'updated', '2023-05-01 16:22:15', '2023-05-01 16:22:15'),
	(38, 'audit', 'updated', 'themes', 3, 'users', 1, '[]', NULL, 'updated', '2023-05-01 16:22:15', '2023-05-01 16:22:15'),
	(39, 'audit', 'updated', 'themes', 4, 'users', 1, '[]', NULL, 'updated', '2023-05-01 16:22:15', '2023-05-01 16:22:15'),
	(40, 'audit', 'updated', 'themes', 3, 'users', 1, '[]', NULL, 'updated', '2023-05-01 16:22:33', '2023-05-01 16:22:33'),
	(41, 'audit', 'updated', 'themes', 4, 'users', 1, '[]', NULL, 'updated', '2023-05-01 16:22:33', '2023-05-01 16:22:33'),
	(42, 'audit', 'updated', 'themes', 1, 'users', 1, '[]', NULL, 'updated', '2023-05-01 16:22:33', '2023-05-01 16:22:33'),
	(43, 'audit', 'updated', 'themes', 4, 'users', 1, '[]', NULL, 'updated', '2023-05-01 16:22:36', '2023-05-01 16:22:36'),
	(44, 'audit', 'updated', 'themes', 2, 'users', 1, '[]', NULL, 'updated', '2023-05-01 16:22:36', '2023-05-01 16:22:36'),
	(45, 'audit', 'updated', 'themes', 3, 'users', 1, '[]', NULL, 'updated', '2023-05-01 16:22:36', '2023-05-01 16:22:36'),
	(46, 'audit', 'updated', 'themes', 1, 'users', 1, '[]', NULL, 'updated', '2023-05-01 16:22:50', '2023-05-01 16:22:50'),
	(47, 'audit', 'updated', 'themes', 4, 'users', 1, '[]', NULL, 'updated', '2023-05-01 16:22:50', '2023-05-01 16:22:50'),
	(48, 'audit', 'updated', 'themes', 2, 'users', 1, '[]', NULL, 'updated', '2023-05-01 16:22:50', '2023-05-01 16:22:50'),
	(49, 'audit', 'updated', 'themes', 3, 'users', 1, '[]', NULL, 'updated', '2023-05-01 16:22:50', '2023-05-01 16:22:50'),
	(50, 'audit', 'updated', 'themes', 2, 'users', 1, '[]', NULL, 'updated', '2023-05-01 16:22:52', '2023-05-01 16:22:52'),
	(51, 'audit', 'updated', 'themes', 4, 'users', 1, '[]', NULL, 'updated', '2023-05-01 16:22:52', '2023-05-01 16:22:52'),
	(52, 'audit', 'updated', 'themes', 3, 'users', 1, '[]', NULL, 'updated', '2023-05-01 16:22:54', '2023-05-01 16:22:54'),
	(53, 'audit', 'updated', 'themes', 4, 'users', 1, '[]', NULL, 'updated', '2023-05-01 16:22:54', '2023-05-01 16:22:54'),
	(54, 'audit', 'created', 'themes', 5, 'users', 1, '[]', NULL, 'created', '2023-05-01 16:24:24', '2023-05-01 16:24:24'),
	(55, 'audit', 'updated', 'themes', 5, 'users', 1, '[]', NULL, 'updated', '2023-05-01 16:29:05', '2023-05-01 16:29:05'),
	(56, 'audit', 'updated', 'themes', 4, 'users', 1, '[]', NULL, 'updated', '2023-05-01 16:29:05', '2023-05-01 16:29:05'),
	(57, 'audit', 'deleted', 'themes', 4, 'users', 1, '[]', NULL, 'deleted', '2023-05-01 16:32:47', '2023-05-01 16:32:47'),
	(58, 'audit', 'logged into the system', 'users', 2, 'users', 2, NULL, NULL, NULL, '2023-05-01 20:58:17', '2023-05-01 20:58:17'),
	(59, 'audit', 'created', 'game_settings', 2, 'users', 2, '[]', NULL, 'created', '2023-05-01 20:59:24', '2023-05-01 20:59:24'),
	(60, 'audit', 'created', 'game_settings', 3, 'users', 2, '[]', NULL, 'created', '2023-05-01 21:19:40', '2023-05-01 21:19:40'),
	(61, 'audit', 'logged into the system', 'users', 1, 'users', 1, NULL, NULL, NULL, '2023-05-06 17:09:08', '2023-05-06 17:09:08'),
	(62, 'audit', 'logged into the system', 'users', 1, 'users', 1, NULL, NULL, NULL, '2023-05-07 17:13:59', '2023-05-07 17:13:59'),
	(63, 'audit', 'created', 'categories', 6, 'users', 1, '[]', NULL, 'created', '2023-05-07 18:16:02', '2023-05-07 18:16:02'),
	(64, 'audit', 'created', 'categories', 7, 'users', 1, '[]', NULL, 'created', '2023-05-07 18:16:45', '2023-05-07 18:16:45'),
	(65, 'audit', 'created', 'game_figures', 1, 'users', 1, '[]', NULL, 'created', '2023-05-07 19:08:40', '2023-05-07 19:08:40'),
	(66, 'audit', 'logged into the system', 'users', 2, 'users', 2, NULL, NULL, NULL, '2023-05-09 17:30:22', '2023-05-09 17:30:22'),
	(67, 'audit', 'logged into the system', 'users', 2, 'users', 2, NULL, NULL, NULL, '2023-05-15 01:03:21', '2023-05-15 01:03:21'),
	(68, 'audit', 'logged into the system', 'users', 2, 'users', 2, NULL, NULL, NULL, '2023-05-15 01:08:34', '2023-05-15 01:08:34'),
	(69, 'audit', 'logged into the system', 'users', 2, 'users', 2, NULL, NULL, NULL, '2023-05-15 01:12:07', '2023-05-15 01:12:07'),
	(70, 'audit', 'logged into the system', 'users', 2, 'users', 2, NULL, NULL, NULL, '2023-05-15 01:16:10', '2023-05-15 01:16:10'),
	(71, 'audit', 'logged into the system', 'users', 2, 'users', 2, NULL, NULL, NULL, '2023-05-15 01:17:28', '2023-05-15 01:17:28'),
	(72, 'audit', 'logged into the system', 'users', 2, 'users', 2, NULL, NULL, NULL, '2023-05-15 01:20:00', '2023-05-15 01:20:00'),
	(73, 'audit', 'logged into the system', 'users', 2, 'users', 2, NULL, NULL, NULL, '2023-05-15 01:20:57', '2023-05-15 01:20:57'),
	(74, 'audit', 'logged into the system', 'users', 2, 'users', 2, NULL, NULL, NULL, '2023-05-15 01:21:27', '2023-05-15 01:21:27'),
	(75, 'audit', 'logged into the system', 'users', 2, 'users', 2, NULL, NULL, NULL, '2023-05-15 01:22:32', '2023-05-15 01:22:32'),
	(76, 'audit', 'logged into the system', 'users', 2, 'users', 2, NULL, NULL, NULL, '2023-05-15 01:23:13', '2023-05-15 01:23:13'),
	(77, 'audit', 'logged into the system', 'users', 2, 'users', 2, NULL, NULL, NULL, '2023-05-15 01:24:59', '2023-05-15 01:24:59'),
	(78, 'audit', 'logged into the system', 'users', 2, 'users', 2, NULL, NULL, NULL, '2023-05-15 01:25:47', '2023-05-15 01:25:47'),
	(79, 'audit', 'updated', 'users', 2, 'users', 2, '[]', NULL, 'updated', '2023-05-15 01:25:47', '2023-05-15 01:25:47'),
	(80, 'audit', 'logged into the system', 'users', 2, 'users', 2, NULL, NULL, NULL, '2023-05-15 01:32:20', '2023-05-15 01:32:20'),
	(81, 'audit', 'logged into the system', 'users', 2, 'users', 2, NULL, NULL, NULL, '2023-05-16 13:25:05', '2023-05-16 13:25:05'),
	(82, 'audit', 'logged into the system', 'users', 2, 'users', 2, NULL, NULL, NULL, '2023-05-16 16:02:41', '2023-05-16 16:02:41'),
	(83, 'audit', 'logged into the system', 'users', 2, 'users', 2, NULL, NULL, NULL, '2023-05-19 13:02:37', '2023-05-19 13:02:37'),
	(84, 'audit', 'logged into the system', 'users', 2, 'users', 2, NULL, NULL, NULL, '2023-05-19 13:11:59', '2023-05-19 13:11:59'),
	(85, 'audit', 'created', 'game_settings', 4, 'users', 2, '[]', NULL, 'created', '2023-05-19 13:32:45', '2023-05-19 13:32:45'),
	(86, 'audit', 'created', 'game_settings', 5, 'users', 2, '[]', NULL, 'created', '2023-05-19 13:47:30', '2023-05-19 13:47:30'),
	(87, 'audit', 'created', 'game_settings', 6, 'users', 2, '[]', NULL, 'created', '2023-05-19 13:49:39', '2023-05-19 13:49:39'),
	(88, 'audit', 'created', 'game_settings', 7, 'users', 2, '[]', NULL, 'created', '2023-05-19 13:55:53', '2023-05-19 13:55:53');

-- Copiando estrutura para tabela serious_game_db.categories
CREATE TABLE IF NOT EXISTS `categories` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `category_id` int unsigned DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `order` int NOT NULL DEFAULT '0',
  `theme_id` int unsigned DEFAULT NULL,
  `main` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `FK_themes_themes` (`category_id`) USING BTREE,
  KEY `FK_categories_themes` (`theme_id`),
  CONSTRAINT `FK_categories_categories` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`),
  CONSTRAINT `FK_categories_themes` FOREIGN KEY (`theme_id`) REFERENCES `themes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;

-- Copiando dados para a tabela serious_game_db.categories: ~7 rows (aproximadamente)
INSERT IGNORE INTO `categories` (`id`, `name`, `category_id`, `active`, `order`, `theme_id`, `main`, `created_at`, `updated_at`, `deleted_at`) VALUES
	(1, 'Animais', NULL, 1, 0, 4, 1, NULL, NULL, NULL),
	(2, 'Marinhos', 1, 1, 0, 4, 0, NULL, NULL, NULL),
	(3, 'Marinhos Azuis', 2, 1, 0, 4, 0, NULL, NULL, NULL),
	(4, 'Marinhos Amarelos', 2, 1, 0, 4, 0, NULL, NULL, NULL),
	(5, 'Água Doce', 1, 1, 0, 4, 0, NULL, NULL, NULL),
	(6, 'Plantas', NULL, 1, 0, 4, 1, '2023-05-07 18:16:02', '2023-05-07 18:16:02', NULL),
	(7, 'Azuis Claros', 3, 1, 0, 4, 0, '2023-05-07 18:16:45', '2023-05-07 18:16:45', NULL);

-- Copiando estrutura para tabela serious_game_db.configs
CREATE TABLE IF NOT EXISTS `configs` (
  `key` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `value` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Copiando dados para a tabela serious_game_db.configs: ~2 rows (aproximadamente)
INSERT IGNORE INTO `configs` (`key`, `value`) VALUES
	('game_name', 'MemoLetrando');

-- Copiando estrutura para tabela serious_game_db.game_events
CREATE TABLE IF NOT EXISTS `game_events` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `type` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `time` time NOT NULL,
  `peripheral` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `value` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `game_figure_id` int DEFAULT NULL,
  `game_setting_id` int unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_game_events_game_figures1_idx` (`game_figure_id`),
  KEY `fk_game_events_game_settings1_idx` (`game_setting_id`),
  CONSTRAINT `fk_game_events_game_figures1` FOREIGN KEY (`game_figure_id`) REFERENCES `game_figures` (`id`),
  CONSTRAINT `fk_game_events_game_settings1` FOREIGN KEY (`game_setting_id`) REFERENCES `game_settings` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Copiando dados para a tabela serious_game_db.game_events: ~0 rows (aproximadamente)

-- Copiando estrutura para tabela serious_game_db.game_figures
CREATE TABLE IF NOT EXISTS `game_figures` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  `description` longtext COLLATE utf8mb4_general_ci,
  `level_id` int unsigned NOT NULL,
  `category_id` int unsigned NOT NULL,
  `user_id` int unsigned NOT NULL,
  `active` tinyint unsigned NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_words_levels1_idx` (`level_id`),
  KEY `fk_words_categories1_idx` (`category_id`),
  KEY `fk_words_users1_idx` (`user_id`),
  CONSTRAINT `fk_words_categories1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`),
  CONSTRAINT `fk_words_levels1` FOREIGN KEY (`level_id`) REFERENCES `levels` (`id`),
  CONSTRAINT `fk_words_users1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Copiando dados para a tabela serious_game_db.game_figures: ~0 rows (aproximadamente)
INSERT IGNORE INTO `game_figures` (`id`, `name`, `description`, `level_id`, `category_id`, `user_id`, `active`, `created_at`, `updated_at`, `deleted_at`) VALUES
	(1, 'peixe', NULL, 1, 3, 1, 1, '2023-05-07 19:08:40', '2023-05-07 19:08:40', NULL);

-- Copiando estrutura para tabela serious_game_db.game_results
CREATE TABLE IF NOT EXISTS `game_results` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `time_to_complete` time DEFAULT NULL,
  `score` int DEFAULT NULL,
  `game_setting_id` int unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_game_results_game_settings1_idx` (`game_setting_id`),
  CONSTRAINT `fk_game_results_game_settings1` FOREIGN KEY (`game_setting_id`) REFERENCES `game_settings` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Copiando dados para a tabela serious_game_db.game_results: ~0 rows (aproximadamente)

-- Copiando estrutura para tabela serious_game_db.game_settings
CREATE TABLE IF NOT EXISTS `game_settings` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `quantity_images` int NOT NULL DEFAULT '2',
  `category_id` int unsigned NOT NULL,
  `level_id` int unsigned NOT NULL,
  `user_id` int unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_game_settings_categories1_idx` (`category_id`),
  KEY `fk_game_settings_levels1_idx` (`level_id`),
  KEY `FK_game_settings_users` (`user_id`),
  CONSTRAINT `fk_game_settings_categories1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`),
  CONSTRAINT `fk_game_settings_levels1` FOREIGN KEY (`level_id`) REFERENCES `levels` (`id`),
  CONSTRAINT `FK_game_settings_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Copiando dados para a tabela serious_game_db.game_settings: ~3 rows (aproximadamente)
INSERT IGNORE INTO `game_settings` (`id`, `quantity_images`, `category_id`, `level_id`, `user_id`, `created_at`, `updated_at`, `deleted_at`) VALUES
	(1, 2, 3, 2, 2, '2023-04-23 22:35:02', '2023-04-23 22:35:02', NULL),
	(2, 7, 5, 2, 2, '2023-05-01 20:59:24', '2023-05-01 20:59:24', NULL),
	(3, 2, 4, 2, 2, '2023-05-01 21:19:40', '2023-05-01 21:19:40', NULL),
	(4, 6, 2, 3, 2, '2023-05-19 13:32:45', '2023-05-19 13:32:45', NULL),
	(5, 4, 2, 2, 2, '2023-05-19 13:47:30', '2023-05-19 13:47:30', NULL),
	(6, 4, 2, 2, 2, '2023-05-19 13:49:39', '2023-05-19 13:49:39', NULL),
	(7, 1, 2, 1, 2, '2023-05-19 13:55:53', '2023-05-19 13:55:53', NULL);

-- Copiando estrutura para tabela serious_game_db.images
CREATE TABLE IF NOT EXISTS `images` (
  `id` int NOT NULL AUTO_INCREMENT,
  `path` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `imageable_id` int NOT NULL,
  `imageable_type` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `category` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `order` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Copiando dados para a tabela serious_game_db.images: ~5 rows (aproximadamente)
INSERT IGNORE INTO `images` (`id`, `path`, `imageable_id`, `imageable_type`, `category`, `order`, `created_at`, `updated_at`) VALUES
	(6, 'images/themes/1_utvDOYzvYiwgANA.webp', 1, 'themes', NULL, 0, '2023-04-30 19:33:17', '2023-04-30 19:33:17'),
	(7, 'images/themes/2_5HB24Pwp6xJSPOZ.webp', 2, 'themes', NULL, 0, '2023-05-01 16:16:31', '2023-05-01 16:16:31'),
	(8, 'images/themes/3_yN9CTPaOAVkP5Aq.webp', 3, 'themes', NULL, 0, '2023-05-01 16:17:39', '2023-05-01 16:17:39'),
	(10, 'images/themes/5_iXjC925RjOAjAuJ.webp', 5, 'themes', NULL, 0, '2023-05-01 16:24:25', '2023-05-01 16:24:25'),
	(11, 'images/themes/4_641yWxOobpkycDQ.webp', 4, 'themes', NULL, 0, '2023-05-01 16:34:31', '2023-05-01 16:34:31'),
	(12, 'images/game_figures/1_qzkFXtWRZsvKJ8I.webp', 1, 'game_figures', NULL, 0, '2023-05-07 19:08:40', '2023-05-07 19:08:40');

-- Copiando estrutura para tabela serious_game_db.levels
CREATE TABLE IF NOT EXISTS `levels` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) COLLATE utf8mb4_general_ci NOT NULL,
  `quantity_images` int NOT NULL DEFAULT '2',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Copiando dados para a tabela serious_game_db.levels: ~2 rows (aproximadamente)
INSERT IGNORE INTO `levels` (`id`, `name`, `quantity_images`) VALUES
	(1, 'Fácil', 2),
	(2, 'Médio', 4),
	(3, 'Difícil', 6);

-- Copiando estrutura para tabela serious_game_db.password_resets
CREATE TABLE IF NOT EXISTS `password_resets` (
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Copiando dados para a tabela serious_game_db.password_resets: ~0 rows (aproximadamente)

-- Copiando estrutura para tabela serious_game_db.themes
CREATE TABLE IF NOT EXISTS `themes` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(150) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `order` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Copiando dados para a tabela serious_game_db.themes: ~4 rows (aproximadamente)
INSERT IGNORE INTO `themes` (`id`, `name`, `active`, `order`, `created_at`, `updated_at`, `deleted_at`) VALUES
	(1, 'Erradicação da Pobreza', 1, 0, NULL, '2023-05-01 16:22:50', NULL),
	(2, 'Fome Zero e Agricultura Sustentável', 1, 1, NULL, '2023-05-01 16:22:52', NULL),
	(3, 'Saúde e Bem-Estar', 1, 2, NULL, '2023-05-01 16:22:54', NULL),
	(4, 'Vida na Água', 1, 4, NULL, '2023-05-01 16:32:47', NULL),
	(5, 'Igualdade de Gênero', 1, 3, '2023-05-01 16:24:24', '2023-05-01 16:29:05', NULL);

-- Copiando estrutura para tabela serious_game_db.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID do usuário',
  `name` varchar(200) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL COMMENT 'Nome completo do usuário;',
  `email` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL COMMENT 'E-mail do usuário (opcional)',
  `username` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL COMMENT 'Identificação do usuário',
  `password` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL COMMENT 'Senha do usuário',
  `active` tinyint(1) NOT NULL DEFAULT '0' COMMENT 'Usuário ativo ou inativo: inativo não conseguem realizar o login',
  `super_admin` tinyint(1) NOT NULL DEFAULT '0',
  `access_level_id` int DEFAULT NULL,
  `remember_token` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL COMMENT 'Sistema irá se lembrar do usuário caso o token identifique o cookie, pulando o passo de digitar o usuário e senha para realizar o login',
  `teacher_id` int unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL COMMENT 'Data/Hora de registro',
  `updated_at` timestamp NULL DEFAULT NULL COMMENT 'Data/Hora da ultima alteração realizada',
  `deleted_at` timestamp NULL DEFAULT NULL,
  `authenticable_type` varchar(20) CHARACTER SET utf8mb3 DEFAULT NULL,
  `authenticable_id` int DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `access_level_id` (`access_level_id`) USING BTREE,
  KEY `FK_users_users` (`teacher_id`),
  CONSTRAINT `FK_users_users` FOREIGN KEY (`teacher_id`) REFERENCES `users` (`id`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`access_level_id`) REFERENCES `access_levels` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;

-- Copiando dados para a tabela serious_game_db.users: ~3 rows (aproximadamente)
INSERT IGNORE INTO `users` (`id`, `name`, `email`, `username`, `password`, `active`, `super_admin`, `access_level_id`, `remember_token`, `teacher_id`, `created_at`, `updated_at`, `deleted_at`, `authenticable_type`, `authenticable_id`) VALUES
	(1, 'Root', 'rafaellfc@outlook.com', 'root', '$2y$10$3ugyBR0bEbK9IoT50Gkob.YdFqvQuH/9Nr/wDJorR.XlVGK0eJUOu', 1, 0, 1, NULL, NULL, NULL, '2023-04-15 18:10:42', NULL, NULL, NULL),
	(2, 'Rafael', 'faellcampoos@gmail.com', 'rafael', '$2y$10$3ugyBR0bEbK9IoT50Gkob.YdFqvQuH/9Nr/wDJorR.XlVGK0eJUOu', 1, 0, 3, NULL, 3, NULL, '2023-05-15 01:25:47', NULL, NULL, NULL),
	(3, 'Turma A', 'faellcampoos@gmail.com', 'turmaa', '$2y$10$3ugyBR0bEbK9IoT50Gkob.YdFqvQuH/9Nr/wDJorR.XlVGK0eJUOu', 1, 0, 2, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- Copiando estrutura para tabela serious_game_db.user_permissions
CREATE TABLE IF NOT EXISTS `user_permissions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `type` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `user_permission_category_id` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `fk_user_permissions_user_persmission_categories1_idx` (`user_permission_category_id`) USING BTREE,
  CONSTRAINT `user_permissions_ibfk_1` FOREIGN KEY (`user_permission_category_id`) REFERENCES `user_permission_categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;

-- Copiando dados para a tabela serious_game_db.user_permissions: ~24 rows (aproximadamente)
INSERT IGNORE INTO `user_permissions` (`id`, `name`, `type`, `user_permission_category_id`) VALUES
	(1, 'view', 'view', 1),
	(2, 'create', 'create', 1),
	(3, 'update', 'update', 1),
	(4, 'delete', 'delete', 1),
	(6, 'view', 'view', 2),
	(7, 'create', 'create', 2),
	(8, 'update', 'update', 2),
	(9, 'delete', 'delete', 2),
	(11, 'view', 'view', 3),
	(12, 'create', 'create', 3),
	(13, 'update', 'update', 3),
	(14, 'delete', 'delete', 3),
	(15, 'view', 'view', 4),
	(16, 'create', 'create', 4),
	(17, 'update', 'update', 4),
	(18, 'delete', 'delete', 4),
	(19, 'view', 'view', 5),
	(20, 'create', 'create', 5),
	(21, 'update', 'update', 5),
	(22, 'delete', 'delete', 5),
	(23, 'view', 'view', 6),
	(24, 'create', 'create', 6),
	(25, 'update', 'update', 6),
	(26, 'delete', 'delete', 6);

-- Copiando estrutura para tabela serious_game_db.user_permission_categories
CREATE TABLE IF NOT EXISTS `user_permission_categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `type` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;

-- Copiando dados para a tabela serious_game_db.user_permission_categories: ~4 rows (aproximadamente)
INSERT IGNORE INTO `user_permission_categories` (`id`, `name`, `type`) VALUES
	(1, 'Usuários', 'users'),
	(2, 'Configurações', 'configs'),
	(3, 'Permissões', 'access_levels'),
	(4, 'Auditoria', 'auditings'),
	(5, 'Temas', 'themes'),
	(6, 'Figuras do Jogo', 'game_figures');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
