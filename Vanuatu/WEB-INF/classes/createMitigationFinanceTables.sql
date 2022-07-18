CREATE TABLE `four_eyes_state` (
   `id` int(20) NOT NULL,
   `created_at` datetime DEFAULT NULL,
   `data_id` int(100) DEFAULT NULL,
   `entity` varchar(50) DEFAULT NULL,
   `entity_id` varchar(255) DEFAULT NULL,
   `status` varchar(20) DEFAULT NULL,
   `approver_remarks` varchar(500) DEFAULT NULL,
   `created_by` varchar(50) DEFAULT NULL,
   `approved_by` varchar(50) DEFAULT NULL,
   PRIMARY KEY (`id`)
 ) ENGINE=MyISAM DEFAULT CHARSET=latin1;

CREATE TABLE `project` (
   `data_id` int(11) NOT NULL,
   `project_code` int(11) DEFAULT NULL,
   `project_id` varchar(200) DEFAULT NULL,
   `cause` varchar(50) DEFAULT NULL,
   `division` varchar(100) DEFAULT NULL,
   `area` varchar(50) DEFAULT NULL,
   `sector` varchar(150) DEFAULT NULL,
   `sub_sector` varchar(150) DEFAULT NULL,
   `ndc` varchar(10) DEFAULT NULL,
   `napa` varchar(20) DEFAULT NULL,
   `project_title` varchar(150) DEFAULT NULL,
   `location` varchar(100) DEFAULT NULL,
   `coordinates` varchar(100) DEFAULT NULL,
   `agency` varchar(500) DEFAULT NULL,
   `other_party` varchar(500) DEFAULT NULL,
   `commissioning_date` varchar(20) DEFAULT NULL,
   `approval_date` varchar(20) DEFAULT NULL,
   `closure_date` varchar(20) DEFAULT NULL,
   `funding` varchar(20) DEFAULT NULL,
   `lifetime` double DEFAULT NULL,
   `cost_amount` double DEFAULT NULL,
   `remarks` varchar(300) DEFAULT NULL,
   PRIMARY KEY (`data_id`)
 ) ENGINE=MyISAM DEFAULT CHARSET=latin1;
 
 CREATE TABLE `mitigation_input` (
   `data_id` int(11) NOT NULL,
   `target_ghg` varchar(500) DEFAULT NULL,
   `agency_contact` varchar(500) DEFAULT NULL,
   `other_party_contact` varchar(500) DEFAULT NULL,
   `contributions` varchar(500) DEFAULT NULL,
   `status` varchar(500) DEFAULT NULL,
   `beneficiary` varchar(500) DEFAULT NULL,
   `gender_incl` varchar(500) DEFAULT NULL,
   `project_output` varchar(500) DEFAULT NULL,
   `project_impact` varchar(500) DEFAULT NULL,
   `market_mech` varchar(500) DEFAULT NULL,
   `weblink` varchar(500) DEFAULT NULL,
   `carbon_ben` varchar(500) DEFAULT NULL,
   `verification` varchar(500) DEFAULT NULL,
   `ghg_reduction` double DEFAULT NULL,
   `project_id` varchar(200) DEFAULT NULL,
   `remarks` varchar(300) DEFAULT NULL,
   PRIMARY KEY (`data_id`)
 ) ENGINE=MyISAM DEFAULT CHARSET=latin1;
 
 CREATE TABLE `mitigation_monitoring` (
   `data_id` int(11) NOT NULL,
   `ghg_reduction` double DEFAULT NULL,
   `project_id` varchar(200) DEFAULT NULL,
   `remarks` varchar(300) DEFAULT NULL,
   `year` varchar(10) DEFAULT NULL,
   PRIMARY KEY (`data_id`)
 ) ENGINE=MyISAM DEFAULT CHARSET=latin1;
 
 CREATE TABLE `mitigation_performance_indicator` (
   `id` int(20) NOT NULL,
   `data_id` int(100) DEFAULT NULL,
   `expected_value` varchar(255) DEFAULT NULL,
   `indicator` varchar(250) DEFAULT NULL,
   `project_id` varchar(200) DEFAULT NULL,
   `reference` varchar(150) DEFAULT NULL,
   `unit` varchar(10) DEFAULT NULL,
   PRIMARY KEY (`id`)
 ) ENGINE=MyISAM DEFAULT CHARSET=latin1;

CREATE TABLE `finance_input` (
  `data_id` int(11) NOT NULL,
  `project_id` varchar(200) DEFAULT NULL,
  `financial_year` varchar(20) DEFAULT NULL,
  `exchange_rate` double NULL,
  `finance_mode` varchar(500) DEFAULT NULL,
  `budget_code` varchar(500) DEFAULT NULL,
  `project_size` varchar(500) DEFAULT NULL,
  `national_budget` double DEFAULT NULL,
  `subnational_budget` double DEFAULT NULL,
  `green_bond` double DEFAULT NULL,
  `others` double DEFAULT NULL,
   `remarks` varchar(300) DEFAULT NULL,
   PRIMARY KEY (`data_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

CREATE TABLE `finance_source_details` (
  `id` int(20) NOT NULL,
  `data_id` int(11) NOT NULL,
  `funding_type` varchar(200) DEFAULT NULL,
  `nat_int` varchar(200) DEFAULT NULL,
  `source_amount` double DEFAULT NULL,
  `channel` varchar(500) DEFAULT NULL,
  `funding_agency` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
 
CREATE TABLE `finance_detailed_budget` (
   `id` int(20) NOT NULL,
   `data_id` int(11) NOT NULL,
  `dis_cat` varchar(200) DEFAULT NULL,
  `cat_amount` double DEFAULT NULL,
  `cat_ref` varchar(500) DEFAULT NULL,
   PRIMARY KEY (`id`)
 ) ENGINE=MyISAM DEFAULT CHARSET=latin1;

CREATE TABLE `detailed_budget_disbursement` (
   `id` int(20) NOT NULL,
    `data_id` int(11) NOT NULL,
   `dis_year` varchar(20) DEFAULT NULL,
  `dis_amount` double DEFAULT NULL,
  `dis_ref` varchar(500) DEFAULT NULL,
   PRIMARY KEY (`id`)
 ) ENGINE=MyISAM DEFAULT CHARSET=latin1;
 
CREATE TABLE `finance_monitoring` (
   `data_id` int(11) NOT NULL,
   `project_id` varchar(200) DEFAULT NULL,
   `year` varchar(10) DEFAULT NULL,
    `remarks` varchar(300) DEFAULT NULL,
    PRIMARY KEY (`data_id`)
 ) ENGINE=MyISAM DEFAULT CHARSET=latin1; 
 
 CREATE TABLE `finance_monitoring_disbursement` (
   `id` int(11) NOT NULL,
 	`data_id` int(11) NOT NULL,
   `dis_cat` varchar(200) DEFAULT NULL,
   `cat_amountq1` double DEFAULT NULL,
   `cat_amountq2` double DEFAULT NULL,
   `cat_amountq3` double DEFAULT NULL,
   `cat_amountq4` double DEFAULT NULL,
   `cat_ref` varchar(200) DEFAULT NULL,
    PRIMARY KEY (`id`)
 ) ENGINE=MyISAM DEFAULT CHARSET=latin1; 
