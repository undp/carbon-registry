truncate table ghg_fugitive_mapping;

insert into ghg_fugitive_mapping (`id`, `cat`, `sub_cat`, `source`, `efch4`, `efco2`, `efn2o`, `unit`, `reference`, `type`, `last_updated`) values (1,'Gas Production','Dry Gas', 'Flaring',0.00076,1.2,0.000021,'tonnes per million m3 Gas Production',"", 'gasTable','2019-11-01');

insert into ghg_fugitive_mapping (`id`, `cat`, `sub_cat`, `source`, `efch4`, `efco2`, `efn2o`, `unit`, `reference`, `type`, `last_updated`) values (2,'Gas Processing','Natural Gas', 'Flaring',0.0024,3.6,0.000054,'tonnes per million m3 Gas Production',"", 'gasTable','2019-11-01');

insert into ghg_fugitive_mapping (`id`, `cat`, `sub_cat`, `source`, `efch4`, `efco2`, `efn2o`, `unit`, `reference`, `type`, `last_updated`) values (3,'Gas Processing','Natural Gas', 'Venting',0,40,0,'tonnes per million m3 Gas Production',"", 'gasTable','2019-11-01');

insert into ghg_fugitive_mapping (`id`, `cat`, `sub_cat`, `source`, `efch4`, `efco2`, `efn2o`, `unit`, `reference`, `type`, `last_updated`) values (9,'Gas Transmission and Storage','Transmission', 'Fugitive',0.044,0.0031,0,'tonnes per million m3 Marketable Gas',"", 'gasTable','2019-11-01');

insert into ghg_fugitive_mapping (`id`, `cat`, `sub_cat`, `source`, `efch4`, `efco2`, `efn2o`, `unit`, `reference`, `type`, `last_updated`) values (4,'Gas Transmission and Storage','Transmission', 'Venting',0.044,0.0031,0,'tonnes per million m3 Marketable Gas',"", 'gasTable','2019-11-01');

insert into ghg_fugitive_mapping (`id`, `cat`, `sub_cat`, `source`, `efch4`, `efco2`, `efn2o`, `unit`, `reference`, `type`, `last_updated`) values (5,'Gas Transmission and Storage','Storage Facilities', 'All',0.025,0.11,0,'tonnes per million m3 Marketable Gas',"", 'gasTable','2019-11-01');

insert into ghg_fugitive_mapping (`id`, `cat`, `sub_cat`, `source`, `efch4`, `efco2`, `efn2o`, `unit`, `reference`, `type`, `last_updated`) values (6,'Gas Distribution','All', 'All',1.1,0.051,0,'tonnes per million m3 Gas Sales',"", 'gasTable','2019-11-01');

insert into ghg_fugitive_mapping (`id`, `cat`, `sub_cat`, `source`, `efch4`, `efco2`, `efn2o`, `unit`, `reference`, `type`, `last_updated`) values (7,'Natural Gas Liquid Transport','LPG', 'All',0,430,0.0022,'tonnes per million m3 LPG',"", 'gasTable','2019-11-01');

insert into ghg_fugitive_mapping (`id`, `cat`, `sub_cat`, `source`, `efch4`, `efco2`, `efn2o`, `unit`, `reference`, `type`, `last_updated`) values (8,'Natural Gas Liquid Transport','LNG', 'All',0,0,0,'tonnes per million m3 Marketable Gas',"", 'gasTable','2019-11-01');

insert into ghg_fugitive_mapping (`id`, `cat`, `sub_cat`, `source`,  `efch4`, `efco2`, `efn2o`, `unit`, `reference`, `type`, `last_updated`) values (10,'Oil Production','Oil Production', 'Fugitives', 37,4.7,0,'tonnes per 1000 m3 total oil produced',"", 'oilTable','2019-11-01');

insert into ghg_fugitive_mapping (`id`, `cat`, `sub_cat`, `source`,  `efch4`, `efco2`, `efn2o`, `unit`, `reference`, `type`, `last_updated`) values (11,'Oil Production','Oil Production', 'Venting', 12,2.5,0,'tonnes per 1000 m3 total oil produced',"", 'oilTable','2019-11-01');

insert into ghg_fugitive_mapping (`id`, `cat`, `sub_cat`, `source`,  `efch4`, `efco2`, `efn2o`, `unit`, `reference`, `type`, `last_updated`) values (12,'Oil Production','Oil Production', 'Flaring', 0.029,47,0.00074,'tonnes per 1000 m3 total oil produced',"", 'oilTable','2019-11-01');

insert into ghg_fugitive_mapping (`id`, `cat`, `sub_cat`, `source`,  `efch4`, `efco2`, `efn2o`, `unit`, `reference`, `type`, `last_updated`) values (13,'Oil Upgraded','All', 'All', 0,0,0,'tonnes per 1000 m3 oil upgraded',"", 'oilTable','2019-11-01');

insert into ghg_fugitive_mapping (`id`, `cat`, `sub_cat`, `source`,  `efch4`, `efco2`, `efn2o`, `unit`, `reference`, `type`, `last_updated`) values (14,'Oil Transported (Pipelines)','All', 'All', 0.0054,0.00049,0,'tonnes per 1000 m3 oil transported by pipeline',"", 'oilTable','2019-11-01');

insert into ghg_fugitive_mapping (`id`, `cat`, `sub_cat`, `source`,  `efch4`, `efco2`, `efn2o`, `unit`, `reference`, `type`, `last_updated`) values (15,'Oil Transported (Tanker Trucks and Rail Cars)','All', 'Venting', 0.025,0.0026,0,'tonnes per 1000 m3 oil transported by tanker trucks',"", 'oilTable','2019-11-01');
