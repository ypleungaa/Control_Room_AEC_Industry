-- Create table for the safety dataset in SQL Server
CREATE TABLE safety (
    id int,
    location varchar(255),
    investigation varchar(255),
	investigation_level varchar(255), 
	date_of_accident date,
	date_of_report date,
	time_of_accident time,
	activity varchar(255),
	ai_category varchar(255),
	body_part varchar(255),
	nature_of_injury varchar(255),
	type_of_contact varchar(255),
	no_of_days_lost int,
	target_closure_date date,
	actual_closure_date date
);