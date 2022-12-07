create database if not exists VanuatuMRV;

use Vanuatu;


CREATE TABLE `sdg_mapping` (
   `id` int(11) NOT NULL,
  `question` varchar(1000) DEFAULT NULL,
  `mapping` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;