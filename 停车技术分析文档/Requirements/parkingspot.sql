/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50517
Source Host           : localhost:3306
Source Database       : xxxparkinglot

Target Server Type    : MYSQL
Target Server Version : 50517
File Encoding         : 65001

Date: 2014-02-19 16:17:50
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `parkingspot`
-- ----------------------------
DROP TABLE IF EXISTS `parkingspot`;
CREATE TABLE `parkingspot` (
  `status` varchar(255) NOT NULL DEFAULT '0',
  `entrancetime` datetime DEFAULT NULL,
  `departuretime` datetime DEFAULT NULL,
  `id` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of parkingspot
-- ----------------------------
