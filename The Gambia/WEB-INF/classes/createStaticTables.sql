CREATE TABLE `permission_entity_mapping` (
  `id` int(11) NOT NULL,
  `permission` varchar(150) DEFAULT NULL,
  `entity` varchar(100) DEFAULT NULL,
   PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

CREATE TABLE `mitigation_sectors` (
	`id` int(11) NOT NULL,
  `sector` varchar(150) DEFAULT NULL,
  `sub_sector` varchar(150) DEFAULT NULL,
  `code` varchar(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

CREATE TABLE `adaptation_sectors` (
	`id` int(11) NOT NULL,
  `sector` varchar(150) DEFAULT NULL,
  `sub_sector` varchar(150) DEFAULT NULL,
   `code` varchar(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

CREATE TABLE `sdg_mapping` (
   `id` int(11) NOT NULL,
  `question` varchar(1000) DEFAULT NULL,
  `mapping` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

CREATE TABLE `adaptation_mapping` (
   `id` int(11) NOT NULL,
  `question` varchar(1000) DEFAULT NULL,
  `mapping` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

CREATE TABLE `ghg_sector_mapping` (
   `id` int(11) NOT NULL,
   `sector` varchar(150) DEFAULT NULL,
   `category` varchar(150) DEFAULT NULL,
   `sub_sector` varchar(150) DEFAULT NULL,
   `sub_category` varchar(150) DEFAULT NULL,
   PRIMARY KEY (`id`)
 ) ENGINE=MyISAM DEFAULT CHARSET=latin1;
 
 CREATE TABLE `ghg_fuel_mapping` (
   `id` int(11) NOT NULL,
   `fuel_type` varchar(150) DEFAULT NULL,
   `fuel` varchar(150) DEFAULT NULL,
   `NCV` double DEFAULT NULL,
   `EFCO2` double DEFAULT NULL,
   `EFCH4` double DEFAULT NULL,
   `EFN2O` double DEFAULT NULL,
   `reference` varchar(100) DEFAULT NULL,
   `last_updated` datetime DEFAULT NULL,
   PRIMARY KEY (`id`)
 ) ENGINE=MyISAM DEFAULT CHARSET=latin1;
 
 CREATE TABLE `gwp_ghg` (
   `id` int(11) NOT NULL,
   `gas` varchar(150) DEFAULT NULL,
   `gwp` varchar(150) DEFAULT NULL,
   `reference` varchar(100) DEFAULT NULL,
   `last_updated` datetime DEFAULT NULL,
   PRIMARY KEY (`id`)
 ) ENGINE=MyISAM DEFAULT CHARSET=latin1;
 
  CREATE TABLE `ghg_population` (
   `id` int(11) NOT NULL,
   `year` varchar(4) DEFAULT NULL,
   `urban_population` int DEFAULT NULL,
   `rural_population` int DEFAULT NULL,
   `total_population` int DEFAULT NULL,
   `reference` varchar(100) DEFAULT NULL,
    `last_updated` datetime DEFAULT NULL,
   PRIMARY KEY (`id`)
 ) ENGINE=MyISAM DEFAULT CHARSET=latin1;
 
 CREATE TABLE `livestock_population` (
   `id` int(11) NOT NULL,
   `animalcategory` varchar(100) DEFAULT NULL,
   `year` varchar(4) DEFAULT NULL,
   `head` int DEFAULT NULL,
   `reference` varchar(100) DEFAULT NULL,
   `remarks` varchar(300) DEFAULT NULL,
    `last_updated` datetime DEFAULT NULL,
   PRIMARY KEY (`id`)
 ) ENGINE=MyISAM DEFAULT CHARSET=latin1;
 
 CREATE TABLE `livestock_database` (
  `id` int(11) NOT NULL,
  `animalcategory` varchar(100) DEFAULT NULL,
  `efef` double DEFAULT NULL,
  `efmm` double DEFAULT NULL,
  `ner` double DEFAULT NULL,
  `animal_mass` double DEFAULT NULL,
  `nem` double DEFAULT NULL,
  `efd` double DEFAULT NULL,
  `mm_lost` double DEFAULT NULL,
  `frac_vol` double DEFAULT NULL,
  `ef_atm` double DEFAULT NULL,
  `reference` varchar(100) DEFAULT NULL,
  `last_updated` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

 
   CREATE TABLE `ghg_ippu_emission_factors` (
   `id` int(11) NOT NULL,
   `sub_sector` varchar(50) DEFAULT NULL,
   `emission_factor` double DEFAULT NULL,
   `reference` varchar(100) DEFAULT NULL,
    `last_updated` datetime DEFAULT NULL,
   PRIMARY KEY (`id`)
 ) ENGINE=MyISAM DEFAULT CHARSET=latin1;
