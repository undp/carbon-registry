delete from user_reg where data_id='1';

insert into user_reg (data_id, department, status, ghg_permissions, project_permissions, report_permissions, contact, email_Id, first_name, second_name, password, role) values
('1', 'Admin', 'Approved', 'Energy,IPPU,AFOLU,Waste','Create Project,Delete Project,Mitigation Tracking,Finance Tracking,SDG Tracking,Adaptation Tracking','GHG Report,Mitigation Report,Finance Report,SDG Report,Adaptation Report,MRV Report', '123', 'admssudan9@gmail.com', 'Administrator', 'Administrator', 'Admin@SouthSudanMRV', 'ADMIN')
