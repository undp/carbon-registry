create database if not exists SSudanMRV;

use Kenyanew;


CREATE TABLE `sdg_mapping` (
   `id` int(11) NOT NULL,
  `question` varchar(1000) DEFAULT NULL,
  `mapping` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;