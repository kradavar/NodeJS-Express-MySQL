-- MySQL dump 10.13  Distrib 5.7.24, for Linux (x86_64)
--
-- Host: localhost    Database: events
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
-- Table structure for table `eventsList`
--

DROP TABLE IF EXISTS `eventsList`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `eventsList` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `event_name` varchar(255) NOT NULL,
  `start` varchar(255) NOT NULL,
  `end` varchar(255) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `eventsList`
--

LOCK TABLES `eventsList` WRITE;
/*!40000 ALTER TABLE `eventsList` DISABLE KEYS */;
INSERT INTO `eventsList` VALUES (1,'Test 1','2018','2018',2),(2,'Test 2','2018','2018',1),(3,'Test 3','2018','2018',3),(4,'Test 4','2018','2018',2),(5,'Test 5','2018','2018',1),(6,'Test 6','2018','2018',3),(7,'Test 7','2018','2018',2),(8,'Test 8','2018','2018',1),(9,'Test 9','2018','2018',3),(10,'Test 10','2018','2018',1),(11,'Test 11','2018','2018',1),(12,'Test 12','2018','2018',3),(13,'Test 13','2018','2018',3),(14,'Test 14','2018','2018',1),(15,'Test 15','2018','2018',1),(16,'Test 16','2018','2018',2),(17,'Test 17','2018','2018',1),(18,'Test 18','2018','2018',1),(19,'Test 19','2018','2018',2),(20,'Test 20','2018','2018',1);
/*!40000 ALTER TABLE `eventsList` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usersList`
--

DROP TABLE IF EXISTS `usersList`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usersList` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usersList`
--

LOCK TABLES `usersList` WRITE;
/*!40000 ALTER TABLE `usersList` DISABLE KEYS */;
INSERT INTO `usersList` VALUES (1,'darya','qwerty'),(2,'krasava','1234'),(3,'root','pass');
/*!40000 ALTER TABLE `usersList` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-11-14 12:37:17
