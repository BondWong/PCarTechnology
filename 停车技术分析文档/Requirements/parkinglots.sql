/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50517
Source Host           : localhost:3306
Source Database       : pcartech

Target Server Type    : MYSQL
Target Server Version : 50517
File Encoding         : 65001

Date: 2014-02-22 13:51:35
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `parkinglots`
-- ----------------------------
DROP TABLE IF EXISTS `parkinglots`;
CREATE TABLE `parkinglots` (
  `name` varchar(255) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `jointime` datetime DEFAULT NULL,
  `spotquantity` smallint(10) unsigned DEFAULT NULL,
  `architecture` varchar(255) DEFAULT NULL,
  `client` varchar(255) DEFAULT NULL,
  `fee` varchar(255) DEFAULT NULL,
  `bussinesshours` varchar(255) DEFAULT NULL,
  `facility` varchar(255) DEFAULT NULL,
  `longitude` float(3,2) NOT NULL,
  `latitude` float(3,2) NOT NULL,
  `remark` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of parkinglots
-- ----------------------------
