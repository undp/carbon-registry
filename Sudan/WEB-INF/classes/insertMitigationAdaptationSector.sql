truncate table mitigation_sectors;

truncate table enablers_sectors;

truncate table adaptation_sectors;

insert into mitigation_sectors (`id`, `sector`, `sub_sector`, `code`) values (1,'Forest','Afforestation/reforestation','01');
insert into mitigation_sectors (`id`, `sector`, `sub_sector`, `code`) values (2,'Forest','Agroforestry','01');
insert into mitigation_sectors (`id`, `sector`, `sub_sector`, `code`) values (3,'Forest','Reduce deforestation and forest degradation','01');
insert into mitigation_sectors (`id`, `sector`, `sub_sector`, `code`) values (4,'Forest','Restoration/plantation','01');
insert into mitigation_sectors (`id`, `sector`, `sub_sector`, `code`) values (5,'Forest','Others','01');

insert into mitigation_sectors (`id`, `sector`, `sub_sector`, `code`) values (6,'Energy Supply/Electricity Generation','Renewable Energy -Off Grid/Decentralized','02');
insert into mitigation_sectors (`id`, `sector`, `sub_sector`, `code`) values (7,'Energy Supply/Electricity Generation','Energy Infrastructure','02');
insert into mitigation_sectors (`id`, `sector`, `sub_sector`, `code`) values (8,'Energy Supply/Electricity Generation','Alternate Fuel','02');
insert into mitigation_sectors (`id`, `sector`, `sub_sector`, `code`) values (9,'Energy Supply/Electricity Generation','Renewable Energy','02');
insert into mitigation_sectors (`id`, `sector`, `sub_sector`, `code`) values (10,'Energy Supply/Electricity Generation','Others','02');

insert into mitigation_sectors (`id`, `sector`, `sub_sector`, `code`) values (11,'Energy Demand','Clean Energy Technology','03');
insert into mitigation_sectors (`id`, `sector`, `sub_sector`, `code`) values (12,'Energy Demand','Energy Efficiency','03');
insert into mitigation_sectors (`id`, `sector`, `sub_sector`, `code`) values (13,'Energy Demand','LECT-Low Energy Consumption Technology','03');
insert into mitigation_sectors (`id`, `sector`, `sub_sector`, `code`) values (14,'Energy Demand','Others','03');

insert into mitigation_sectors (`id`, `sector`, `sub_sector`, `code`) values (15,'Transportation','Aviation','04');
insert into mitigation_sectors (`id`, `sector`, `sub_sector`, `code`) values (16,'Transportation','Rail','04');
insert into mitigation_sectors (`id`, `sector`, `sub_sector`, `code`) values (17,'Transportation','Road','04');
insert into mitigation_sectors (`id`, `sector`, `sub_sector`, `code`) values (18,'Transportation','Waterborne','04');
insert into mitigation_sectors (`id`, `sector`, `sub_sector`, `code`) values (19,'Transportation','Others','04');


insert into mitigation_sectors (`id`, `sector`, `sub_sector`, `code`) values (20,'Agriculture, Livestock and Fisheries','Agriculture','05');
insert into mitigation_sectors (`id`, `sector`, `sub_sector`, `code`) values (21,'Agriculture, Livestock and Fisheries','Livestock','05');
insert into mitigation_sectors (`id`, `sector`, `sub_sector`, `code`) values (22,'Agriculture, Livestock and Fisheries','Fisheries','05');
insert into mitigation_sectors (`id`, `sector`, `sub_sector`, `code`) values (23,'Agriculture, Livestock and Fisheries','Others','05');

insert into mitigation_sectors (`id`, `sector`, `sub_sector`, `code`) values (24,'Industrial Processes','Process Improvement/Efficiency','06');
insert into mitigation_sectors (`id`, `sector`, `sub_sector`, `code`) values (25,'Industrial Processes','Waste Recovery/Utilization','06');
insert into mitigation_sectors (`id`, `sector`, `sub_sector`, `code`) values (26,'Industrial Processes','Alternete Raw Material ','06');
insert into mitigation_sectors (`id`, `sector`, `sub_sector`, `code`) values (27,'Industrial Processes','Others','06');

insert into mitigation_sectors (`id`, `sector`, `sub_sector`, `code`) values (28,'Waste','Solid Waste/MSW','07');
insert into mitigation_sectors (`id`, `sector`, `sub_sector`, `code`) values (29,'Waste','Waste Water','07');
insert into mitigation_sectors (`id`, `sector`, `sub_sector`, `code`) values (30,'Waste','Industrial/Commercial','07');
insert into mitigation_sectors (`id`, `sector`, `sub_sector`, `code`) values (31,'Waste','e-waste','07');
insert into mitigation_sectors (`id`, `sector`, `sub_sector`, `code`) values (32,'Waste','Others','07');

insert into mitigation_sectors (`id`, `sector`, `sub_sector`, `code`) values (33,'Infrastructure (Consutruction & Buildings)','Construction','08');
insert into mitigation_sectors (`id`, `sector`, `sub_sector`, `code`) values (34,'Infrastructure (Consutruction & Buildings)','Buildings','08');
insert into mitigation_sectors (`id`, `sector`, `sub_sector`, `code`) values (35,'Infrastructure (Consutruction & Buildings)','Other Infrastructures','08');

insert into mitigation_sectors (`id`, `sector`, `sub_sector`, `code`) values (36,'Mining and Querying','Process Improvement','09');
insert into mitigation_sectors (`id`, `sector`, `sub_sector`, `code`) values (37,'Mining and Querying','Operation Efficiency','09');
insert into mitigation_sectors (`id`, `sector`, `sub_sector`, `code`) values (38,'Mining and Querying','Alternete Raw Material/Technology ','09');

insert into mitigation_sectors (`id`, `sector`, `sub_sector`, `code`) values (39,'Petroleum Chemical and Non-Metallic Mineral Products','Process Improvement','10');
insert into mitigation_sectors (`id`, `sector`, `sub_sector`, `code`) values (40,'Petroleum Chemical and Non-Metallic Mineral Products','Operation Efficiency','10');
insert into mitigation_sectors (`id`, `sector`, `sub_sector`, `code`) values (41,'Petroleum Chemical and Non-Metallic Mineral Products','Alternate Raw Material/Technology','10');
insert into mitigation_sectors (`id`, `sector`, `sub_sector`, `code`) values (42,'Petroleum Chemical and Non-Metallic Mineral Products','Others','10');

insert into mitigation_sectors (`id`, `sector`, `sub_sector`, `code`) values (43,'Other Mitigation Sector','Others','11');

insert into adaptation_sectors (`id`, `sector`, `sub_sector`, `code`) values (201,'Water','Irrigation & catchments','01');
insert into adaptation_sectors (`id`, `sector`, `sub_sector`, `code`) values (202,'Water','Water Resources Management','01');
insert into adaptation_sectors (`id`, `sector`, `sub_sector`, `code`) values (203,'Water','Watershed management & Wetlands','01');
insert into adaptation_sectors (`id`, `sector`, `sub_sector`, `code`) values (204,'Water','Water Supply and Waste Water','01');
insert into adaptation_sectors (`id`, `sector`, `sub_sector`, `code`) values (205,'Water','Others','01');

insert into adaptation_sectors (`id`, `sector`, `sub_sector`, `code`) values (206,'Energy','Energy Sector Planning & Resilience','02');
insert into adaptation_sectors (`id`, `sector`, `sub_sector`, `code`) values (207,'Energy','Adaptive energy technologies','02');
insert into adaptation_sectors (`id`, `sector`, `sub_sector`, `code`) values (208,'Energy','Energy poverty','02');
insert into adaptation_sectors (`id`, `sector`, `sub_sector`, `code`) values (209,'Energy','Alternete Fuel','02');
insert into adaptation_sectors (`id`, `sector`, `sub_sector`, `code`) values (210,'Energy','Others','02');

insert into adaptation_sectors (`id`, `sector`, `sub_sector`, `code`) values (211,'Ecosystems Environment and Biodiversity Conservation','Ecosystem','03');
insert into adaptation_sectors (`id`, `sector`, `sub_sector`, `code`) values (212,'Ecosystems Environment and Biodiversity Conservation','Environment','03');
insert into adaptation_sectors (`id`, `sector`, `sub_sector`, `code`) values (213,'Ecosystems Environment and Biodiversity Conservation','Biodiversity Conservation','03');
insert into adaptation_sectors (`id`, `sector`, `sub_sector`, `code`) values (214,'Ecosystems Environment and Biodiversity Conservation','Others','03');

insert into adaptation_sectors (`id`, `sector`, `sub_sector`, `code`) values (215,'Human Settlements','Urban','04');
insert into adaptation_sectors (`id`, `sector`, `sub_sector`, `code`) values (216,'Human Settlements','Regional','04');
insert into adaptation_sectors (`id`, `sector`, `sub_sector`, `code`) values (217,'Human Settlements','Rural/Local','04');
insert into adaptation_sectors (`id`, `sector`, `sub_sector`, `code`) values (218,'Human Settlements','Urban','04');
insert into adaptation_sectors (`id`, `sector`, `sub_sector`, `code`) values (219,'Human Settlements','Others','04');

insert into adaptation_sectors (`id`, `sector`, `sub_sector`, `code`) values (261,'Disaster Risk Reduction','Disaster Risk Reduction','05');
insert into adaptation_sectors (`id`, `sector`, `sub_sector`, `code`) values (262,'Disaster Risk Reduction','Early warning systems','05');
insert into adaptation_sectors (`id`, `sector`, `sub_sector`, `code`) values (263,'Disaster Risk Reduction','Climate shocks and disasters','05');
insert into adaptation_sectors (`id`, `sector`, `sub_sector`, `code`) values (264,'Disaster Risk Reduction','Others','05');

insert into adaptation_sectors (`id`, `sector`, `sub_sector`, `code`) values (221,'Tourism and Recreation','Climate Smart Tourism','06');
insert into adaptation_sectors (`id`, `sector`, `sub_sector`, `code`) values (222,'Tourism and Recreation','Eco-Tourism','06');
insert into adaptation_sectors (`id`, `sector`, `sub_sector`, `code`) values (223,'Tourism and Recreation','Community Based Tourism','06');
insert into adaptation_sectors (`id`, `sector`, `sub_sector`, `code`) values (224,'Tourism and Recreation','Recreational','06');
insert into adaptation_sectors (`id`, `sector`, `sub_sector`, `code`) values (225,'Tourism and Recreation','Others','06');

insert into adaptation_sectors (`id`, `sector`, `sub_sector`, `code`) values (231,'Health','Climatic Health Risks','07');
insert into adaptation_sectors (`id`, `sector`, `sub_sector`, `code`) values (232,'Health','Early Warning Systems','07');
insert into adaptation_sectors (`id`, `sector`, `sub_sector`, `code`) values (233,'Health','Climate Resilient Health Systems','07');
insert into adaptation_sectors (`id`, `sector`, `sub_sector`, `code`) values (234,'Health','Pandemic','07');
insert into adaptation_sectors (`id`, `sector`, `sub_sector`, `code`) values (235,'Health','Others','07');

insert into adaptation_sectors (`id`, `sector`, `sub_sector`, `code`) values (241,'Industry and Infrastructure','Industry','08');
insert into adaptation_sectors (`id`, `sector`, `sub_sector`, `code`) values (242,'Industry and Infrastructure','Infrastructure','08');
insert into adaptation_sectors (`id`, `sector`, `sub_sector`, `code`) values (243,'Industry and Infrastructure','Others','08');

insert into adaptation_sectors (`id`, `sector`, `sub_sector`, `code`) values (251,'Agriculture Livestock and Fisheries','Agriculture','09');
insert into adaptation_sectors (`id`, `sector`, `sub_sector`, `code`) values (252,'Agriculture Livestock and Fisheries','Livestock','09');
insert into adaptation_sectors (`id`, `sector`, `sub_sector`, `code`) values (253,'Agriculture Livestock and Fisheries','Fisheries','09');
insert into adaptation_sectors (`id`, `sector`, `sub_sector`, `code`) values (254,'Agriculture Livestock and Fisheries','Others','09');

insert into adaptation_sectors (`id`, `sector`, `sub_sector`, `code`) values (271,'Other Adaptation Sectors','Others','10');

insert into enablers_sectors (`id`, `sector`, `sub_sector`, `code`) values (401,'Others','Others','01');
