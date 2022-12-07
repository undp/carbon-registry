truncate table mitigation_sectors;

truncate table enablers_sectors;

truncate table adaptation_sectors;

insert into mitigation_sectors (`id`, `sector`, `sub_sector`, `code`) values (1,'Forestry','Afforestation/reforestation','01');
insert into mitigation_sectors (`id`, `sector`, `sub_sector`, `code`) values (2,'Forestry','Reduce deforestation and forest degradation','01');
insert into mitigation_sectors (`id`, `sector`, `sub_sector`, `code`) values (3,'Forestry','Restoration/plantation','01');
insert into mitigation_sectors (`id`, `sector`, `sub_sector`, `code`) values (4,'Forestry','Others','01');

insert into mitigation_sectors (`id`, `sector`, `sub_sector`, `code`) values (5,'Energy Generation','Renewable Energy','02');
insert into mitigation_sectors (`id`, `sector`, `sub_sector`, `code`) values (6,'Energy Generation','Renewable Energy -Off Grid','02');
insert into mitigation_sectors (`id`, `sector`, `sub_sector`, `code`) values (7,'Energy Generation','Energy Infrastructure','02');
insert into mitigation_sectors (`id`, `sector`, `sub_sector`, `code`) values (8,'Energy Generation','Others','02');

insert into mitigation_sectors (`id`, `sector`, `sub_sector`, `code`) values (9,'Energy Utilisation','Clean Energy Technology','03');
insert into mitigation_sectors (`id`, `sector`, `sub_sector`, `code`) values (10,'Energy Utilisation','Energy Efficiency','03');
insert into mitigation_sectors (`id`, `sector`, `sub_sector`, `code`) values (11,'Energy Utilisation','LECT-Low Energy Consumption Technology','03');
insert into mitigation_sectors (`id`, `sector`, `sub_sector`, `code`) values (12,'Energy Utilisation','Others','03');

insert into mitigation_sectors (`id`, `sector`, `sub_sector`, `code`) values (13,'Transport','Aviation','04');
insert into mitigation_sectors (`id`, `sector`, `sub_sector`, `code`) values (14,'Transport','Rail','04');
insert into mitigation_sectors (`id`, `sector`, `sub_sector`, `code`) values (15,'Transport','Road','04');
insert into mitigation_sectors (`id`, `sector`, `sub_sector`, `code`) values (16,'Transport','Waterborne','04');
insert into mitigation_sectors (`id`, `sector`, `sub_sector`, `code`) values (17,'Transport','Others','04');


insert into mitigation_sectors (`id`, `sector`, `sub_sector`, `code`) values (18,'Agriculture','Agroforestry','05');
insert into mitigation_sectors (`id`, `sector`, `sub_sector`, `code`) values (19,'Agriculture','Agriculture Land/Crop cultivation','05');
insert into mitigation_sectors (`id`, `sector`, `sub_sector`, `code`) values (20,'Agriculture','Agri-waste','05');
insert into mitigation_sectors (`id`, `sector`, `sub_sector`, `code`) values (21,'Agriculture','Livestock Management','05');
insert into mitigation_sectors (`id`, `sector`, `sub_sector`, `code`) values (22,'Agriculture','Others','05');

insert into mitigation_sectors (`id`, `sector`, `sub_sector`, `code`) values (23,'Industrial Sector','Process Improvement','06');
insert into mitigation_sectors (`id`, `sector`, `sub_sector`, `code`) values (24,'Industrial Sector','Waste Recovery/Utilization','06');
insert into mitigation_sectors (`id`, `sector`, `sub_sector`, `code`) values (25,'Industrial Sector','Others','06');

insert into mitigation_sectors (`id`, `sector`, `sub_sector`, `code`) values (26,'Waste Management','Solid Waste/MSW','07');
insert into mitigation_sectors (`id`, `sector`, `sub_sector`, `code`) values (27,'Waste Management','Waste Water','07');
insert into mitigation_sectors (`id`, `sector`, `sub_sector`, `code`) values (28,'Waste Management','Industrial/Commercial','07');
insert into mitigation_sectors (`id`, `sector`, `sub_sector`, `code`) values (29,'Waste Management','e-waste','07');
insert into mitigation_sectors (`id`, `sector`, `sub_sector`, `code`) values (30,'Waste Management','Others','07');

insert into mitigation_sectors (`id`, `sector`, `sub_sector`, `code`) values (31,'Others','Others','09');

insert into mitigation_sectors (`id`, `sector`, `sub_sector`, `code`) values (32,'Land Use and land Use Change','Land Use Change','08');
insert into mitigation_sectors (`id`, `sector`, `sub_sector`, `code`) values (33,'Land Use and land Use Change','Wetlands','08');

insert into adaptation_sectors (`id`, `sector`, `sub_sector`, `code`) values (101,'Drought and Epidemic Risk Management / Ending Drought Emergencies','Drought','01');
insert into adaptation_sectors (`id`, `sector`, `sub_sector`, `code`) values (102,'Drought and Epidemic Risk Management / Ending Drought Emergencies','Others','01');


insert into adaptation_sectors (`id`, `sector`, `sub_sector`, `code`) values (103,'Flood, Landslide and Epidemic Risk Management','Floods','02');
insert into adaptation_sectors (`id`, `sector`, `sub_sector`, `code`) values (104,'Flood, Landslide and Epidemic Risk Management','Others','02');

insert into adaptation_sectors (`id`, `sector`, `sub_sector`, `code`) values (105,'Agriculture, Food and Nutrition Security','Crops','03');
insert into adaptation_sectors (`id`, `sector`, `sub_sector`, `code`) values (106,'Agriculture, Food and Nutrition Security','Fisheries','03');
insert into adaptation_sectors (`id`, `sector`, `sub_sector`, `code`) values (107,'Agriculture, Food and Nutrition Security','Livestock','03');
insert into adaptation_sectors (`id`, `sector`, `sub_sector`, `code`) values (108,'Agriculture, Food and Nutrition Security','Others','03');

insert into adaptation_sectors (`id`, `sector`, `sub_sector`, `code`) values (109,'Energy','Others','04');

insert into adaptation_sectors (`id`, `sector`, `sub_sector`, `code`) values (110,'Forestry','Others','05');

insert into adaptation_sectors (`id`, `sector`, `sub_sector`, `code`) values (111,'Health','Others','06');


insert into adaptation_sectors (`id`, `sector`, `sub_sector`, `code`) values (112,'Human Settlement, Urban Development and Housing and waste infrastructure','Affordable housing','07');
insert into adaptation_sectors (`id`, `sector`, `sub_sector`, `code`) values (113,'Human Settlement, Urban Development and Housing and waste infrastructure','Waste Management Infrastructure','07');
insert into adaptation_sectors (`id`, `sector`, `sub_sector`, `code`) values (114,'Human Settlement, Urban Development and Housing and waste infrastructure','Others','07');

insert into adaptation_sectors (`id`, `sector`, `sub_sector`, `code`) values (115,'Manufacturing','Others','08');

insert into adaptation_sectors (`id`, `sector`, `sub_sector`, `code`) values (116,'Transport and other Infrastructure','Others','09');

insert into adaptation_sectors (`id`, `sector`, `sub_sector`, `code`) values (117,'Water and Sanitation','Others','10');

insert into adaptation_sectors (`id`, `sector`, `sub_sector`, `code`) values (118,'Tourism','Tourism','11');
insert into adaptation_sectors (`id`, `sector`, `sub_sector`, `code`) values (119,'Tourism','Others','11');

insert into adaptation_sectors (`id`, `sector`, `sub_sector`, `code`) values (120,'Wildlife','Others','12');

insert into adaptation_sectors (`id`, `sector`, `sub_sector`, `code`) values (121,'Marine and Coastal Resources','Maritime zone','13');
insert into adaptation_sectors (`id`, `sector`, `sub_sector`, `code`) values (122,'Marine and Coastal Resources','Coastal zone','13');
insert into adaptation_sectors (`id`, `sector`, `sub_sector`, `code`) values (123,'Marine and Coastal Resources','Others','13');

insert into adaptation_sectors (`id`, `sector`, `sub_sector`, `code`) values (124,'Gender, Youth and Other Vulnerable Groups','Others','14');

insert into adaptation_sectors (`id`, `sector`, `sub_sector`, `code`) values (125,'Others','Others','15');

insert into enablers_sectors (`id`, `sector`, `sub_sector`, `code`) values (126,'Others','Others','16');
