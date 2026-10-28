# ************************************************************
# Sequel Ace SQL dump
# Versão 20035
#
# https://sequel-ace.com/
# https://github.com/Sequel-Ace/Sequel-Ace
#
# Servidor: 127.0.0.1 (MySQL 5.7.34)
# Banco de Dados: symborg_system140323
# Tempo de geração: 2023-04-14 18:53:32 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
SET NAMES utf8mb4;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE='NO_AUTO_VALUE_ON_ZERO', SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump de tabela access_level_user_permission
# ------------------------------------------------------------

DROP TABLE IF EXISTS `access_level_user_permission`;

CREATE TABLE `access_level_user_permission` (
  `access_level_id` int(11) NOT NULL,
  `user_permission_id` int(11) NOT NULL,
  `allow` tinyint(1) NOT NULL,
  PRIMARY KEY (`access_level_id`,`user_permission_id`) USING BTREE,
  KEY `fk_access_levels_has_user_permissions_user_permissions1_idx` (`user_permission_id`) USING BTREE,
  KEY `fk_access_levels_has_user_permissions_access_levels1_idx` (`access_level_id`) USING BTREE,
  CONSTRAINT `access_level_user_permission_ibfk_1` FOREIGN KEY (`access_level_id`) REFERENCES `access_levels` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `access_level_user_permission_ibfk_2` FOREIGN KEY (`user_permission_id`) REFERENCES `user_permissions` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;

LOCK TABLES `access_level_user_permission` WRITE;
/*!40000 ALTER TABLE `access_level_user_permission` DISABLE KEYS */;

INSERT INTO `access_level_user_permission` (`access_level_id`, `user_permission_id`, `allow`)
VALUES
	(1,1,1),
	(1,2,1),
	(1,3,1),
	(1,4,1),
	(1,6,1),
	(1,7,1),
	(1,8,1),
	(1,9,1),
	(1,11,1),
	(1,12,1),
	(1,13,1),
	(1,14,1),
	(1,16,1),
	(1,17,1),
	(1,18,1),
	(1,19,1),
	(1,20,1),
	(1,21,1),
	(1,22,1),
	(1,23,1),
	(1,24,1),
	(1,25,1),
	(1,26,1),
	(1,27,1),
	(1,28,1),
	(1,29,1),
	(1,30,1),
	(1,31,1),
	(1,32,1),
	(1,33,1),
	(1,34,1),
	(1,35,1),
	(1,36,1),
	(1,37,1),
	(1,38,1),
	(1,39,1),
	(1,40,1),
	(1,41,1),
	(1,42,1),
	(1,43,1),
	(1,44,1),
	(1,45,1),
	(1,46,1),
	(1,47,1),
	(1,48,1),
	(1,49,1),
	(1,50,1),
	(1,51,1),
	(1,52,1),
	(1,53,1),
	(1,54,1),
	(1,55,1),
	(1,56,1),
	(1,57,0),
	(1,58,0),
	(1,59,0),
	(1,60,1),
	(1,61,1),
	(1,62,1),
	(1,63,1),
	(2,1,0),
	(2,2,0),
	(2,3,0),
	(2,4,0),
	(2,6,0),
	(2,7,0),
	(2,8,0),
	(2,9,0),
	(2,11,0),
	(2,12,0),
	(2,13,0),
	(2,14,0),
	(2,16,0),
	(2,17,0),
	(2,18,0),
	(2,19,0),
	(2,20,0),
	(2,21,0),
	(2,22,0),
	(2,23,0),
	(2,24,0),
	(2,25,0),
	(2,26,0),
	(2,27,0),
	(2,28,1),
	(2,29,1),
	(2,30,1),
	(2,31,0),
	(2,32,0),
	(2,33,0),
	(2,34,0),
	(2,35,0),
	(2,36,0),
	(2,37,0),
	(2,38,0),
	(2,39,0),
	(2,40,0),
	(2,41,0),
	(2,42,0),
	(2,43,0),
	(2,44,0),
	(2,45,0),
	(2,46,0),
	(2,47,0),
	(2,48,0),
	(2,49,0),
	(2,50,0),
	(2,51,0),
	(2,52,0),
	(2,53,0),
	(2,54,0),
	(2,55,0),
	(2,56,1),
	(2,57,0),
	(2,58,0),
	(2,59,0),
	(2,60,0),
	(2,61,0),
	(2,62,0),
	(2,63,0),
	(3,1,0),
	(3,2,0),
	(3,3,0),
	(3,4,0),
	(3,6,0),
	(3,7,0),
	(3,8,0),
	(3,9,0),
	(3,11,0),
	(3,12,0),
	(3,13,0),
	(3,14,0),
	(3,16,0),
	(3,17,0),
	(3,18,0),
	(3,19,0),
	(3,20,0),
	(3,21,0),
	(3,22,0),
	(3,23,0),
	(3,24,0),
	(3,25,0),
	(3,26,0),
	(3,27,0),
	(3,28,1),
	(3,29,0),
	(3,30,0),
	(3,31,0),
	(3,32,1),
	(3,33,0),
	(3,34,1),
	(3,35,0),
	(3,36,0),
	(3,37,0),
	(3,38,0),
	(3,39,0),
	(3,40,1),
	(3,41,1),
	(3,42,1),
	(3,43,1),
	(3,44,1),
	(3,45,1),
	(3,46,1),
	(3,47,1),
	(3,48,0),
	(3,49,0),
	(3,50,0),
	(3,51,0),
	(3,52,1),
	(3,53,1),
	(3,54,1),
	(3,55,0),
	(3,56,1),
	(3,57,0),
	(3,58,0),
	(3,59,0),
	(3,60,0),
	(3,61,0),
	(3,62,0),
	(3,63,0),
	(4,1,0),
	(4,2,0),
	(4,3,0),
	(4,4,0),
	(4,6,0),
	(4,7,0),
	(4,8,0),
	(4,9,0),
	(4,11,0),
	(4,12,0),
	(4,13,0),
	(4,14,0),
	(4,16,0),
	(4,17,0),
	(4,18,0),
	(4,19,0),
	(4,20,0),
	(4,21,0),
	(4,22,0),
	(4,23,0),
	(4,24,0),
	(4,25,0),
	(4,26,0),
	(4,27,0),
	(4,28,1),
	(4,29,0),
	(4,30,1),
	(4,31,0),
	(4,32,1),
	(4,33,0),
	(4,34,1),
	(4,35,0),
	(4,36,0),
	(4,37,0),
	(4,38,0),
	(4,39,0),
	(4,40,0),
	(4,41,0),
	(4,42,1),
	(4,43,0),
	(4,44,0),
	(4,45,0),
	(4,46,0),
	(4,47,0),
	(4,48,0),
	(4,49,0),
	(4,50,0),
	(4,51,0),
	(4,52,0),
	(4,53,0),
	(4,54,0),
	(4,55,0),
	(4,56,1),
	(4,57,0),
	(4,58,0),
	(4,59,0),
	(4,60,0),
	(4,61,0),
	(4,62,0),
	(4,63,0),
	(5,1,0),
	(5,2,0),
	(5,3,0),
	(5,4,0),
	(5,6,0),
	(5,7,0),
	(5,8,0),
	(5,9,0),
	(5,11,0),
	(5,12,0),
	(5,13,0),
	(5,14,0),
	(5,16,0),
	(5,17,0),
	(5,18,0),
	(5,19,0),
	(5,20,0),
	(5,21,0),
	(5,22,0),
	(5,23,0),
	(5,24,0),
	(5,25,0),
	(5,26,0),
	(5,27,0),
	(5,28,0),
	(5,29,0),
	(5,30,0),
	(5,31,0),
	(5,32,0),
	(5,33,0),
	(5,34,0),
	(5,35,0),
	(5,36,0),
	(5,37,0),
	(5,38,0),
	(5,39,0),
	(5,40,0),
	(5,41,0),
	(5,42,0),
	(5,43,0),
	(5,44,0),
	(5,45,0),
	(5,46,0),
	(5,47,0),
	(5,48,0),
	(5,49,0),
	(5,50,0),
	(5,51,0),
	(5,52,0),
	(5,53,0),
	(5,54,0),
	(5,55,0),
	(5,56,0),
	(5,57,0),
	(5,58,0),
	(5,59,0),
	(5,60,0),
	(5,61,0),
	(5,62,0),
	(5,63,0),
	(6,1,1),
	(6,2,0),
	(6,3,0),
	(6,4,0),
	(6,6,1),
	(6,7,0),
	(6,8,0),
	(6,9,0),
	(6,11,1),
	(6,12,0),
	(6,13,0),
	(6,14,0),
	(6,16,1),
	(6,17,0),
	(6,18,0),
	(6,19,0),
	(6,20,1),
	(6,21,0),
	(6,22,0),
	(6,23,0),
	(6,24,1),
	(6,25,0),
	(6,26,0),
	(6,27,0),
	(6,28,1),
	(6,29,0),
	(6,30,0),
	(6,31,0),
	(6,32,1),
	(6,33,0),
	(6,34,0),
	(6,35,0),
	(6,36,1),
	(6,37,0),
	(6,38,0),
	(6,39,0),
	(6,40,1),
	(6,41,0),
	(6,42,0),
	(6,43,0),
	(6,44,0),
	(6,45,0),
	(6,46,0),
	(6,47,0),
	(6,48,0),
	(6,49,0),
	(6,50,0),
	(6,51,0),
	(6,52,0),
	(6,53,0),
	(6,54,0),
	(6,55,0),
	(6,56,1),
	(6,57,0),
	(6,58,0),
	(6,59,0),
	(6,60,1),
	(6,61,0),
	(6,62,0),
	(6,63,0),
	(7,1,0),
	(7,2,0),
	(7,3,0),
	(7,4,0),
	(7,6,0),
	(7,7,0),
	(7,8,0),
	(7,9,0),
	(7,11,0),
	(7,12,0),
	(7,13,0),
	(7,14,0),
	(7,16,0),
	(7,17,0),
	(7,18,0),
	(7,19,0),
	(7,20,0),
	(7,21,0),
	(7,22,0),
	(7,23,0),
	(7,24,0),
	(7,25,0),
	(7,26,0),
	(7,27,0),
	(7,28,0),
	(7,29,0),
	(7,30,0),
	(7,31,0),
	(7,32,0),
	(7,33,0),
	(7,34,0),
	(7,35,0),
	(7,36,1),
	(7,37,0),
	(7,38,0),
	(7,39,0),
	(7,40,0),
	(7,41,0),
	(7,42,0),
	(7,43,1),
	(7,44,1),
	(7,45,1),
	(7,46,1),
	(7,47,1),
	(7,48,0),
	(7,49,0),
	(7,50,0),
	(7,51,0),
	(7,52,0),
	(7,53,0),
	(7,54,0),
	(7,55,0),
	(7,56,1),
	(7,57,0),
	(7,58,0),
	(7,59,0),
	(7,60,0),
	(7,61,0),
	(7,62,0),
	(7,63,0);

/*!40000 ALTER TABLE `access_level_user_permission` ENABLE KEYS */;
UNLOCK TABLES;


# Dump de tabela access_levels
# ------------------------------------------------------------

DROP TABLE IF EXISTS `access_levels`;

CREATE TABLE `access_levels` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL COMMENT 'Nome do nível de acesso do usuário como ''''Administrador'', ''Supervisor'', ''Básico'';',
  `active` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;

LOCK TABLES `access_levels` WRITE;
/*!40000 ALTER TABLE `access_levels` DISABLE KEYS */;

INSERT INTO `access_levels` (`id`, `name`, `active`, `created_at`, `updated_at`, `deleted_at`)
VALUES
	(1,'Administrator',1,'2019-08-29 11:54:58','2021-07-01 15:11:25',NULL),
	(2,'Local Point',1,'2021-07-01 17:53:48','2021-07-01 17:53:48',NULL),
	(3,'General Manager',1,'2021-07-01 17:54:04','2021-08-27 10:39:44',NULL),
	(4,'Supply',1,'2021-07-01 17:54:13','2021-07-01 17:54:13',NULL),
	(5,'Marketing',1,'2021-07-01 17:54:48','2021-07-01 17:54:48',NULL),
	(6,'Administrator View',1,'2021-09-23 08:26:31','2021-09-23 08:26:31',NULL),
	(7,'Area Sales Manager',1,'2021-10-03 22:10:25','2021-10-03 22:10:25',NULL);

/*!40000 ALTER TABLE `access_levels` ENABLE KEYS */;
UNLOCK TABLES;


# Dump de tabela auditings
# ------------------------------------------------------------

DROP TABLE IF EXISTS `auditings`;

CREATE TABLE `auditings` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `log_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `subject_type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `subject_id` bigint(20) unsigned DEFAULT NULL,
  `causer_type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `causer_id` bigint(20) unsigned DEFAULT NULL,
  `properties` json DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `subject` (`subject_type`,`subject_id`),
  KEY `causer` (`causer_type`,`causer_id`),
  KEY `activity_log_log_name_index` (`log_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



# Dump de tabela configs
# ------------------------------------------------------------

DROP TABLE IF EXISTS `configs`;

CREATE TABLE `configs` (
  `key` varchar(200) NOT NULL DEFAULT '',
  `value` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `configs` WRITE;
/*!40000 ALTER TABLE `configs` DISABLE KEYS */;

INSERT INTO `configs` (`key`, `value`)
VALUES
	('open_fiscal_years','0'),
	('actual_date','2023-03-28');

/*!40000 ALTER TABLE `configs` ENABLE KEYS */;
UNLOCK TABLES;


# Dump de tabela user_permission_categories
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user_permission_categories`;

CREATE TABLE `user_permission_categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `type` varchar(200) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;

LOCK TABLES `user_permission_categories` WRITE;
/*!40000 ALTER TABLE `user_permission_categories` DISABLE KEYS */;

INSERT INTO `user_permission_categories` (`id`, `name`, `type`)
VALUES
	(1,'Users','users'),
	(2,'General','configs'),
	(3,'Permissions','access_levels'),
	(4,'Auditing','auditings'),
	(5,'Market Guidances','market_guidances'),
	(6,'Definitions','definitions'),
	(7,'Business Units','business_units'),
	(8,'Fiscal Years','fiscal_years'),
	(9,'Products','products'),
	(10,'Business Unit Assumptions','year_assumptions'),
	(11,'Dashboard POG','dashboard_pog'),
	(12,'Inventories','inventories'),
	(13,'Business Unit Countries','business_unit_countries'),
	(14,'Distribuitors','distribuitors'),
	(15,'Last Consensus Report','last_consensus_report'),
	(16,'Volume Categories','volume_categories');

/*!40000 ALTER TABLE `user_permission_categories` ENABLE KEYS */;
UNLOCK TABLES;


# Dump de tabela user_permissions
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user_permissions`;

CREATE TABLE `user_permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `type` varchar(200) NOT NULL,
  `user_permission_category_id` int(11) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `fk_user_permissions_user_persmission_categories1_idx` (`user_permission_category_id`) USING BTREE,
  CONSTRAINT `user_permissions_ibfk_1` FOREIGN KEY (`user_permission_category_id`) REFERENCES `user_permission_categories` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;

LOCK TABLES `user_permissions` WRITE;
/*!40000 ALTER TABLE `user_permissions` DISABLE KEYS */;

INSERT INTO `user_permissions` (`id`, `name`, `type`, `user_permission_category_id`)
VALUES
	(1,'view','view',1),
	(2,'create','create',1),
	(3,'update','update',1),
	(4,'delete','delete',1),
	(6,'view','view',2),
	(7,'create','create',2),
	(8,'update','update',2),
	(9,'delete','delete',2),
	(11,'view','view',3),
	(12,'create','create',3),
	(13,'update','update',3),
	(14,'delete','delete',3),
	(16,'view','view',4),
	(17,'create','create',4),
	(18,'update','update',4),
	(19,'delete','delete',4),
	(20,'view','view',5),
	(21,'create','create',5),
	(22,'update','update',5),
	(23,'delete','delete',5),
	(24,'view','view',6),
	(25,'create','create',6),
	(26,'update','update',6),
	(27,'delete','delete',6),
	(28,'view','view',7),
	(29,'create','create',7),
	(30,'update','update',7),
	(31,'delete','delete',7),
	(32,'view','view',8),
	(33,'create','create',8),
	(34,'update','update',8),
	(35,'delete','delete',8),
	(36,'view','view',9),
	(37,'create','create',9),
	(38,'update','update',9),
	(39,'delete','delete',9),
	(40,'view','view',10),
	(41,'create','create',10),
	(42,'update','update',10),
	(43,'view','view',11),
	(44,'view','view',12),
	(45,'create','create',12),
	(46,'update','update',12),
	(47,'delete','delete',12),
	(48,'view','view',13),
	(49,'create','create',13),
	(50,'update','update',13),
	(51,'delete','delete',13),
	(52,'view','view',14),
	(53,'create','create',14),
	(54,'update','update',14),
	(55,'delete','delete',14),
	(56,'view','view',15),
	(57,'create','create',15),
	(58,'update','update',15),
	(59,'delete','delete',15),
	(60,'view','view',16),
	(61,'create','create',16),
	(62,'update','update',16),
	(63,'delete','delete',16);

/*!40000 ALTER TABLE `user_permissions` ENABLE KEYS */;
UNLOCK TABLES;


# Dump de tabela users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID do usuário',
  `name` varchar(200) CHARACTER SET latin1 NOT NULL COMMENT 'Nome completo do usuário;',
  `email` varchar(255) CHARACTER SET latin1 DEFAULT NULL COMMENT 'E-mail do usuário (opcional)',
  `username` varchar(100) CHARACTER SET latin1 NOT NULL COMMENT 'Identificação do usuário',
  `password` varchar(255) CHARACTER SET latin1 NOT NULL COMMENT 'Senha do usuário',
  `active` tinyint(1) NOT NULL DEFAULT '0' COMMENT 'Usuário ativo ou inativo: inativo não conseguem realizar o login',
  `super_admin` tinyint(1) NOT NULL DEFAULT '0',
  `access_level_id` int(11) DEFAULT NULL,
  `remember_token` varchar(100) CHARACTER SET latin1 DEFAULT NULL COMMENT 'Sistema irá se lembrar do usuário caso o token identifique o cookie, pulando o passo de digitar o usuário e senha para realizar o login',
  `created_at` timestamp NULL DEFAULT NULL COMMENT 'Data/Hora de registro',
  `updated_at` timestamp NULL DEFAULT NULL COMMENT 'Data/Hora da ultima alteração realizada',
  `deleted_at` timestamp NULL DEFAULT NULL,
  `authenticable_type` varchar(20) DEFAULT NULL,
  `authenticable_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `access_level_id` (`access_level_id`) USING BTREE,
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`access_level_id`) REFERENCES `access_levels` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
