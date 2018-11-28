-- MySQL dump 10.13  Distrib 5.7.24, for Linux (x86_64)
--
-- Host: localhost    Database: calendar
-- ------------------------------------------------------
-- Server version	5.7.24-0ubuntu0.18.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `events`
(
  `id` int
(11) NOT NULL AUTO_INCREMENT,
  `event_name` varchar
(255) NOT NULL,
  `start` varchar
(255) NOT NULL,
  `end` varchar
(255) NOT NULL,
  `user_id` int
(11) NOT NULL,
  PRIMARY KEY
(`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events`
--
LOCK TABLES `events` WRITE;
/*!40000 ALTER TABLE `events` DISABLE KEYS */;
INSERT INTO  `events`
VALUES
  (1, 'Test 1', '2018-10-11 13:00', '2018-10-11 14:00', 2),
  (2, 'Test 2', '2018-11-11 12:45', '2018-11-11 13:00', 1),
  (3, 'Test 3', '2018-11-15 18:00', '2018-11-15 19:00', 3),
  (4, 'Test 4', '2018-11-15 14:00', '2018-11-15 15:20', 2),
  (5, 'Test 5', '2018-11-16 09:45', '2018-11-16 11:00', 1),
  (6, 'Test 6', '2018-12-01 15:35', '2018-12-01 15:50', 3),
  (7, 'Test 7', '2018-11-24 07:45', '2018-11-24 09:00', 2),
  (8, 'Test 8', '2018-11-24 08:00', '2018-11-24 08:30', 1),
  (9, 'Test 9', '2018-11-24 09:00', '2018-11-24 10:15', 3),
  (10, 'Test 10', '2018-12-17 16:30', '2018-12-17 17:15', 1),
  (11, 'Test 11', '2018-12-06 12:00', '2018-12-06 13:00', 1),
  (12, 'Test 12', '2018-11-08 06:00', '2018-11-06 08:15', 3),
  (13, 'Test 13', '2018-12-12 14:00', '2018-12-12 15:00', 3),
  (14, 'Test 14', '2018-11-12 15:30', '2018-11-12 15:45', 1),
  (15, 'Test 15', '2018-10-12 19:30', '2018-10-12 20:00', 1),
  (16, 'Test 16', '2019-01-01 09:00', '2019-01-01 11:00', 2),
  (17, 'Test 17', '2018-12-24 13:30', '2018-12-24 14:00', 1),
  (18, 'Test 18', '2018-11-20 18:00', '2018-11-20 19:00', 1),
  (19, 'Test 19', '2018-11-20 18:00', '2018-11-20 18:20', 2),
  (20, 'Test 20', '2018-11-21 18:00', '2018-11-21 19:00', 1);
/*!40000 ALTER TABLE `events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permissions`
--

DROP TABLE IF EXISTS `permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `permissions`
(
  `id` int
(11) NOT NULL AUTO_INCREMENT,
  `user_id` int
(11) NOT NULL,
  `other_user_id` int
(11) NOT NULL,
  `type` varchar
(100) NOT NULL,
  PRIMARY KEY
(`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permissions`
--
LOCK TABLES `permissions` WRITE;
/*!40000 ALTER TABLE `permissions` DISABLE KEYS */;
INSERT INTO  `permissions`
VALUES
  (1, 2, 1, 'readonly'),
  (2, 2, 3, 'readonly');
/*!40000 ALTER TABLE `permissions` ENABLE KEYS */;
UNLOCK TABLES;
--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users`
(
  `id` int
(11) NOT NULL AUTO_INCREMENT,
  `username` varchar
(100) NOT NULL,
  `password` varchar
(60) NOT NULL,
  `full_name` varchar
(255) DEFAULT NULL,
  PRIMARY KEY
(`id`),
  UNIQUE KEY `unique_username`
(`username`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users`
VALUES
  (1, 'user1', 'test', 'test user1'),
  (2, 'user2', 'test', 'test user2'),
  (3, 'user3', 'test', 'test user3');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-11-19 15:44:03
