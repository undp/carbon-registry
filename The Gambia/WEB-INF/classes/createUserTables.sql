CREATE TABLE `user_reg` (
  `data_id` int(11) NOT NULL,
  `department` varchar(255) DEFAULT NULL,
  `ghg_permissions` varchar(255) DEFAULT NULL,
  `project_permissions` varchar(255) DEFAULT NULL,
  `report_permissions` varchar(255) DEFAULT NULL,
  `contact` varchar(255) DEFAULT NULL,
  `email_Id` varchar(255) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `second_name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`data_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4