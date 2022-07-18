 CREATE TABLE `ghg_input_energy` (
 
   `id` int(11) NOT NULL,
   `data_id` int(11) DEFAULT NULL,
   `fuel` varchar(150) DEFAULT NULL,
   `fuel_type` varchar(150) DEFAULT NULL,
   `calc_approach` varchar(150) DEFAULT NULL,
   `unit` varchar(10) DEFAULT NULL,
   `value` double DEFAULT NULL,
    `reference` varchar(100) DEFAULT NULL,
    `remarks` varchar(300) DEFAULT NULL,
    PRIMARY KEY (`id`)
 ) ENGINE=MyISAM DEFAULT CHARSET=latin1;
 
 CREATE TABLE `ghg_input_reference_energy` (
   `id` int(11) NOT NULL,
   `data_id` int(11) DEFAULT NULL,
   `fuel` varchar(150) DEFAULT NULL,
   `fuel_type` varchar(150) DEFAULT NULL,
   `unit` varchar(10) DEFAULT NULL,
   `production` double DEFAULT NULL,
   `imports` double DEFAULT NULL,
   `exports` double DEFAULT NULL,
   `bunker` double DEFAULT NULL,
   `stock_change` double DEFAULT NULL,
   `excluded` double DEFAULT NULL,
   `reference` varchar(100) DEFAULT NULL,
   `remarks` varchar(300) DEFAULT NULL,
   `calc_approach` varchar(150) DEFAULT NULL,
   PRIMARY KEY (`id`)
 ) ENGINE=MyISAM DEFAULT CHARSET=latin1;

 CREATE TABLE `ghg_input_solid_fuel` (
   `id` int(11) NOT NULL,
   `fuel` varchar(100) DEFAULT NULL,
   `production` double DEFAULT NULL,
   `emission_factor` double DEFAULT NULL,
   `data_id` int(11) DEFAULT NULL,
   `reference` varchar(100) DEFAULT NULL,
    `remarks` varchar(300) DEFAULT NULL,
    `calc_approach` varchar(150) DEFAULT NULL,
    PRIMARY KEY (`id`)
 ) ENGINE=MyISAM DEFAULT CHARSET=latin1;
 
 CREATE TABLE `ghg_input_oil` (
   `id` int(11) NOT NULL,
   `amount` varchar(100) DEFAULT NULL,
   `category` varchar(100) DEFAULT NULL,
   `data_id` int(11) DEFAULT NULL,
   `sub_cat` varchar(100) DEFAULT NULL,
   `reference` varchar(100) DEFAULT NULL,
   `remarks` varchar(300) DEFAULT NULL,
   `calc_approach` varchar(150) DEFAULT NULL,
   PRIMARY KEY (`id`)
 ) ENGINE=MyISAM DEFAULT CHARSET=latin1;
 
 CREATE TABLE `ghg_input_gas` (
   `id` int(11) NOT NULL,
   `amount` varchar(100) DEFAULT NULL,
   `category` varchar(100) DEFAULT NULL,
   `data_id` int(11) DEFAULT NULL,
   `sub_cat` varchar(100) DEFAULT NULL,
   `reference` varchar(100) DEFAULT NULL,
   `remarks` varchar(300) DEFAULT NULL,
   `calc_approach` varchar(150) DEFAULT NULL,
   PRIMARY KEY (`id`)
 ) ENGINE=MyISAM DEFAULT CHARSET=latin1;
 
 CREATE TABLE `ghg_input_lubricant` (
   `id` int(11) NOT NULL,
   `lubricant` varchar(100) DEFAULT NULL,
   `amount` double DEFAULT NULL,
   `carbon` double DEFAULT NULL,
   `fraction` double DEFAULT NULL,
   `data_id` int(11) DEFAULT NULL,
   `reference` varchar(100) DEFAULT NULL,
    `remarks` varchar(300) DEFAULT NULL,
    `calc_approach` varchar(150) DEFAULT NULL,
   PRIMARY KEY (`id`)
 ) ENGINE=MyISAM DEFAULT CHARSET=latin1;
 
 CREATE TABLE `ghg_input_solvent` (
   `id` int(11) NOT NULL,
   `solvent` varchar(100) DEFAULT NULL,
   `amount` double DEFAULT NULL,
   `carbon` double DEFAULT NULL,
   `fraction` double DEFAULT NULL,
   `data_id` int(11) DEFAULT NULL,
   `reference` varchar(100) DEFAULT NULL,
    `remarks` varchar(300) DEFAULT NULL,
    `calc_approach` varchar(150) DEFAULT NULL,
    PRIMARY KEY (`id`)
 ) ENGINE=MyISAM DEFAULT CHARSET=latin1;
 
  CREATE TABLE `ghg_input_refrigeration` (
   `id` int(11) NOT NULL,
   `amount` double DEFAULT NULL,
   `gas` varchar(100) DEFAULT NULL,
   `data_id` int(11) DEFAULT NULL,
   `air_condition_type` varchar(20) DEFAULT NULL,
   `reference` varchar(100) DEFAULT NULL,
   `remarks` varchar(300) DEFAULT NULL,
   `calc_approach` varchar(150) DEFAULT NULL,
   PRIMARY KEY (`id`)
 ) ENGINE=MyISAM DEFAULT CHARSET=latin1;
 
 CREATE TABLE `ghg_input_cement` (
   `id` int(11) NOT NULL,
   `amount` double DEFAULT NULL,
   `cement_type` varchar(100) DEFAULT NULL,
   `clinker_fraction` double DEFAULT NULL,
   `data_id` int(11) DEFAULT NULL,
    `reference` varchar(100) DEFAULT NULL,
    `remarks` varchar(300) DEFAULT NULL,
    `calc_approach` varchar(150) DEFAULT NULL,
    PRIMARY KEY (`id`)
 ) ENGINE=MyISAM DEFAULT CHARSET=latin1;

 
 CREATE TABLE `ghg_input_cement_clinker` (
  `id` int(11) NOT NULL,
   `data_id` int(11) NOT NULL,
   `clinker_export` double DEFAULT NULL,
   `clinker_import` double DEFAULT NULL,
    `reference` varchar(100) DEFAULT NULL,
    `calc_approach` varchar(150) DEFAULT NULL,
   PRIMARY KEY (`id`)
 ) ENGINE=MyISAM DEFAULT CHARSET=latin1;
 
 CREATE TABLE `ghg_input_lime` (
   `id` int(11) NOT NULL,
   `amount` double DEFAULT NULL,
   `data_id` int(11) DEFAULT NULL,
   `lime_type` varchar(150) DEFAULT NULL,
    `reference` varchar(100) DEFAULT NULL,
    `remarks` varchar(300) DEFAULT NULL,
    `calc_approach` varchar(150) DEFAULT NULL,
    
   PRIMARY KEY (`id`)
 ) ENGINE=MyISAM DEFAULT CHARSET=latin1;
 
 CREATE TABLE `ghg_input_enteric` (
   `id` int(11) NOT NULL,
   `animals` int DEFAULT NULL,
   `animalcategory` varchar(100) DEFAULT NULL,
   `enteric_emissions` double DEFAULT NULL,
   `data_id` int(11) DEFAULT NULL,
   `remarks` varchar(300) DEFAULT NULL,
   `calc_approach` varchar(150) DEFAULT NULL,
   `last_updated` datetime DEFAULT NULL,
   PRIMARY KEY (`id`)
 ) ENGINE=MyISAM DEFAULT CHARSET=latin1;
 
 CREATE TABLE `ghg_input_indirect_n2o` (
   `id` int(11) NOT NULL,
   `animals` int DEFAULT NULL,
   `animalcategory` varchar(100) DEFAULT NULL,
   `indirect_emissions` double DEFAULT NULL,
   `data_id` int(11) DEFAULT NULL,
   `remarks` varchar(300) DEFAULT NULL,
   `calc_approach` varchar(150) DEFAULT NULL,
   `last_updated` datetime DEFAULT NULL,
   PRIMARY KEY (`id`)
 ) ENGINE=MyISAM DEFAULT CHARSET=latin1;
 
 CREATE TABLE `ghg_input_direct_n2o_managed` (
   `id` int(11) NOT NULL,
   `n_type` varchar(300) DEFAULT NULL,
   `amount` double DEFAULT NULL,
   `emission_factor` double DEFAULT NULL,
   `data_id` int(11) DEFAULT NULL,
   `input_type` varchar(100) DEFAULT NULL,
    `reference` varchar(300) DEFAULT NULL,
   `remarks` varchar(300) DEFAULT NULL,
   `calc_approach` varchar(150) DEFAULT NULL,
   PRIMARY KEY (`id`)
 ) ENGINE=MyISAM DEFAULT CHARSET=latin1;
 
 CREATE TABLE `ghg_input_indirect_n2o_managed` (
   `id` int(11) NOT NULL,
   `n_type` varchar(300) DEFAULT NULL,
   `amount` double DEFAULT NULL,
   `data_id` int(11) DEFAULT NULL,
   `input_type` varchar(300) DEFAULT NULL,
   `unit` varchar(300) DEFAULT NULL,
    `reference` varchar(300) DEFAULT NULL,
   `remarks` varchar(300) DEFAULT NULL,
   `calc_approach` varchar(150) DEFAULT NULL,
   PRIMARY KEY (`id`)
 ) ENGINE=MyISAM DEFAULT CHARSET=latin1;
 
 CREATE TABLE `ghg_input_mm` (
   `id` int(11) NOT NULL,
   `animals` int DEFAULT NULL,
   `animalcategory` varchar(100) DEFAULT NULL,
   `mm_emissions` double DEFAULT NULL,
   `data_id` int(11) DEFAULT NULL,
   `remarks` varchar(300) DEFAULT NULL,
   `calc_approach` varchar(150) DEFAULT NULL,
   `last_updated` datetime DEFAULT NULL,
   PRIMARY KEY (`id`)
 ) ENGINE=MyISAM DEFAULT CHARSET=latin1;
 
 CREATE TABLE `ghg_input_forest_land` (
   `id` int(11) NOT NULL,
   `area` varchar(100) DEFAULT NULL,
   `emissions` varchar(100) DEFAULT NULL,
   `data_id` int(11) DEFAULT NULL,
   `landcategory` varchar(50) DEFAULT NULL,
   `reference` varchar(100) DEFAULT NULL,
   `remarks` varchar(300) DEFAULT NULL,
   `calc_approach` varchar(150) DEFAULT NULL,
   PRIMARY KEY (`id`)
 ) ENGINE=MyISAM DEFAULT CHARSET=latin1;
 
 CREATE TABLE `ghg_input_cropland` (
   `id` int(11) NOT NULL,
   `area` varchar(100) DEFAULT NULL,
   `emissions` varchar(100) DEFAULT NULL,
   `data_id` int(11) DEFAULT NULL,
   `landcategory` varchar(50) DEFAULT NULL,
    `reference` varchar(100) DEFAULT NULL,
    `remarks` varchar(300) DEFAULT NULL,
    `calc_approach` varchar(150) DEFAULT NULL,
   PRIMARY KEY (`id`)
 ) ENGINE=MyISAM DEFAULT CHARSET=latin1;
 
 CREATE TABLE `ghg_input_grassland` (
   `id` int(11) NOT NULL,
   `area` varchar(100) DEFAULT NULL,
   `emissions` varchar(100) DEFAULT NULL,
   `data_id` int(11) DEFAULT NULL,
   `landcategory` varchar(50) DEFAULT NULL,
   `reference` varchar(100) DEFAULT NULL,
   `remarks` varchar(300) DEFAULT NULL,
   `calc_approach` varchar(150) DEFAULT NULL,
   PRIMARY KEY (`id`)
 ) ENGINE=MyISAM DEFAULT CHARSET=latin1;
  
 CREATE TABLE `ghg_input_wetland` (
   `id` int(11) NOT NULL,
   `area` varchar(100) DEFAULT NULL,
   `emissions` varchar(100) DEFAULT NULL,
   `data_id` int(11) DEFAULT NULL,
   `landcategory` varchar(50) DEFAULT NULL,
   `reference` varchar(100) DEFAULT NULL,
   `remarks` varchar(300) DEFAULT NULL,
   `calc_approach` varchar(150) DEFAULT NULL,
   PRIMARY KEY (`id`)
 ) ENGINE=MyISAM DEFAULT CHARSET=latin1;
 
 CREATE TABLE `ghg_input_settlement` (
   `id` int(11) NOT NULL,
   `area` varchar(100) DEFAULT NULL,
   `emissions` varchar(100) DEFAULT NULL,
   `data_id` int(11) DEFAULT NULL,
   `landcategory` varchar(50) DEFAULT NULL,
    `reference` varchar(100) DEFAULT NULL,
    `remarks` varchar(300) DEFAULT NULL,
    `calc_approach` varchar(150) DEFAULT NULL,
   PRIMARY KEY (`id`)
 ) ENGINE=MyISAM DEFAULT CHARSET=latin1;
 
 CREATE TABLE `ghg_input_other_land` (
   `id` int(11) NOT NULL,
   `area` varchar(100) DEFAULT NULL,
   `emissions` varchar(100) DEFAULT NULL,
   `data_id` int(11) DEFAULT NULL,
   `landcategory` varchar(50) DEFAULT NULL,
    `reference` varchar(100) DEFAULT NULL,
    `remarks` varchar(300) DEFAULT NULL,
    `calc_approach` varchar(150) DEFAULT NULL,
   PRIMARY KEY (`id`)
 ) ENGINE=MyISAM DEFAULT CHARSET=latin1;
 
 CREATE TABLE `ghg_input_biomass_burning` (
   `id` int(11) NOT NULL,
   `initial` varchar(100) DEFAULT NULL,
   `reporting` varchar(100) DEFAULT NULL,
   `subcategory` varchar(100) DEFAULT NULL,
   `area` double DEFAULT NULL,
   `mass` double DEFAULT NULL,
   `cf` double DEFAULT NULL,
   `efco2` double DEFAULT NULL,
   `efch4` double DEFAULT NULL,
   `efn2o` double DEFAULT NULL,
   `data_id` int(11) DEFAULT NULL,
   `reference` varchar(100) DEFAULT NULL,
   `remarks` varchar(300) DEFAULT NULL,
   `calc_approach` varchar(150) DEFAULT NULL,
   PRIMARY KEY (`id`)
 ) ENGINE=MyISAM DEFAULT CHARSET=latin1;
 
 CREATE TABLE `ghg_input_urea` (
   `id` int(11) NOT NULL,
   `subcat` varchar(100) DEFAULT NULL,
   `urea` double DEFAULT NULL,
   `emission_factor` double DEFAULT NULL,
   `data_id` int(11) DEFAULT NULL,
   `reference` varchar(100) DEFAULT NULL,
    `remarks` varchar(300) DEFAULT NULL,
    `calc_approach` varchar(150) DEFAULT NULL,
    PRIMARY KEY (`id`)
 ) ENGINE=MyISAM DEFAULT CHARSET=latin1;
 
 CREATE TABLE `ghg_input_liming` (
   `id` int(11) NOT NULL,
   `lime_type` varchar(100) DEFAULT NULL,
   `amount` double DEFAULT NULL,
   `emission_factor` double DEFAULT NULL,
   `data_id` int(11) DEFAULT NULL,
   `reference` varchar(100) DEFAULT NULL,
    `remarks` varchar(300) DEFAULT NULL,
    `calc_approach` varchar(150) DEFAULT NULL,
    PRIMARY KEY (`id`)
 ) ENGINE=MyISAM DEFAULT CHARSET=latin1;
 
 CREATE TABLE `ghg_input_rice` (
   `id` int(11) NOT NULL,
   `ecosystem` varchar(100) DEFAULT NULL,
   `upland` varchar(100) DEFAULT NULL,
   `irrigated` varchar(100) DEFAULT NULL,
   `rainfed` varchar(100) DEFAULT NULL,
   `deepwater` varchar(100) DEFAULT NULL,
   `data_id` int(11) DEFAULT NULL,
    `remarks` varchar(300) DEFAULT NULL,
    `calc_approach` varchar(150) DEFAULT NULL,
   PRIMARY KEY (`id`)
 ) ENGINE=MyISAM DEFAULT CHARSET=latin1;
 
  CREATE TABLE `ghg_input_biological` (
   `id` int(11) NOT NULL,
   `amount` double DEFAULT NULL,
   `treatment_type` varchar(100) DEFAULT NULL,
   `emission_factor` double DEFAULT NULL,
   `data_id` int(11) DEFAULT NULL,
   `reference` varchar(100) DEFAULT NULL,
   `remarks` varchar(300) DEFAULT NULL,
   `calc_approach` varchar(150) DEFAULT NULL,
   PRIMARY KEY (`id`)
 ) ENGINE=MyISAM DEFAULT CHARSET=latin1;
 
 CREATE TABLE `ghg_input_solid` (
   `id` int(11) NOT NULL,
   `ch4generation_per_ton_managed` double DEFAULT NULL,
   `ch4generation_per_ton_unmanaged` double DEFAULT NULL,
   `data_id` int(11) DEFAULT NULL,
   `population` int DEFAULT NULL,
   `waste_fraction_managed` double DEFAULT NULL,
   `waste_fraction_unmanaged` double DEFAULT NULL,
   `waste_per_capita` double DEFAULT NULL,
    `reference` varchar(100) DEFAULT NULL,
    `remarks` varchar(300) DEFAULT NULL,
    `calc_approach` varchar(150) DEFAULT NULL,
   PRIMARY KEY (`id`)
 ) ENGINE=MyISAM DEFAULT CHARSET=latin1;
 
 CREATE TABLE `ghg_input_waste_water` (
   `id` int(11) NOT NULL,
   `total_population` int DEFAULT NULL,
   `bod` double DEFAULT NULL,
   `correction_factor` double DEFAULT NULL,
   `methane_capacity` double DEFAULT NULL,
   `protein_consumption` double DEFAULT NULL,
   `nitrogen_fraction` double DEFAULT NULL,
   `emission_factor` double DEFAULT NULL,
   `referencech4` varchar(100) DEFAULT NULL,
   `referencen2o` varchar(100) DEFAULT NULL,
   `industrial_sector` varchar(100) DEFAULT NULL,
   `treatment_type` varchar(100) DEFAULT NULL,
   `production` double DEFAULT NULL,
   `waste_water` double DEFAULT NULL,
   `cod` double DEFAULT NULL,
   `industrial_methane_capacity` double DEFAULT NULL,
   `industrial_correction_factor` double DEFAULT NULL,
   `sludge` double DEFAULT NULL,
   `methane_removed` double DEFAULT NULL,
   `reference_industrial` varchar(100) DEFAULT NULL,
   `remarks` varchar(300) DEFAULT NULL,
   `data_id` int(11) DEFAULT NULL,
   `calc_approach` varchar(150) DEFAULT NULL,
   PRIMARY KEY (`id`)
 ) ENGINE=MyISAM DEFAULT CHARSET=latin1;
 
 CREATE TABLE `ghg_input_burning` (
   `id` int(11) NOT NULL,
   `data_id` int(11) DEFAULT NULL,
   `dry_fraction` double DEFAULT NULL,
   `carbon_fraction` double DEFAULT NULL,
   `fossil_fraction` double DEFAULT NULL,
   `oxidation_factor` double DEFAULT NULL,
   `population_fraction` double DEFAULT NULL,
   `urban_population` int(11) DEFAULT NULL,
   `waste_per_capita` double DEFAULT NULL,
   `amount_burnt` double DEFAULT NULL,
   `reference` varchar(100) DEFAULT NULL,
   `calc_approach` varchar(150) DEFAULT NULL,
   PRIMARY KEY (`id`)
 ) ENGINE=MyISAM DEFAULT CHARSET=latin1;
 
 CREATE TABLE `ghg_input_incineration` (
   `id` int(11) NOT NULL,
   `carbon_fraction` double DEFAULT NULL,
   `data_id` int(11) DEFAULT NULL,
   `dry_fraction` double DEFAULT NULL,
   `fossil_fraction` double DEFAULT NULL,
   `oxidation` double DEFAULT NULL,
   `waste_amount` double DEFAULT NULL,
    `reference` varchar(100) DEFAULT NULL,
    `remarks` varchar(300) DEFAULT NULL,
    `calc_approach` varchar(150) DEFAULT NULL,
   PRIMARY KEY (`id`)
 ) ENGINE=MyISAM DEFAULT CHARSET=latin1;

 CREATE TABLE `ghg_input` (
   `data_id` int(11) NOT NULL,
   `category` varchar(150) DEFAULT NULL,
   `sector` varchar(150) DEFAULT NULL,
   `sub_category` varchar(150) DEFAULT NULL,
   `sub_sector` varchar(150) DEFAULT NULL,
   `year` varchar(4) DEFAULT NULL,
   `entity_id` varchar(255) DEFAULT NULL,
   `ghg_type` varchar(100) DEFAULT NULL,
   `calc_approach` varchar(20) DEFAULT NULL,
   PRIMARY KEY (`data_id`)
 ) ENGINE=MyISAM DEFAULT CHARSET=latin1;
  
 