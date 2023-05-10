use university;

create table student (
	adm_no varchar(20), 
    s_name varchar(200), 
    year_of_adm int, 
    course_id int,
    primary key(adm_no) );
    
create table employee (
	id int auto_increment,
    emp_name varchar(200), 
    primary key(id) );
   
create table department (
	d_code varchar(10),
    d_name varchar(200),
    head varchar(200),
    primary key(d_code) );
    
create table instructor (
	id int auto_increment,
    emp_id int,
    dept_id varchar(10),
    primary key(id),
    foreign key(emp_id) references employee(id),
    foreign key(dept_id) references department(d_code) );

create table semester (
	id int auto_increment,
    sem_session varchar(20),
    sem_type varchar(20),
    primary key(id) );

create table subjects (
	sub_code varchar(10),
    sub_name varchar(200),
    primary key(sub_code) );

create table sub_offerings (
	id int auto_increment,
    sub_id varchar(10),
    sem_id int,
    inst_id int,
    primary key(id),
    foreign key(sub_id) references subjects(sub_code),
    foreign key(sem_id) references semester(id),
    foreign key(inst_id) references instructor(id) );

create table stud_sub_reg (
	id int auto_increment,
    sub_off_id int,
    stud_id varchar(20),
    marks int,
    staus varchar(20),
    primary key(id),
    foreign key(sub_off_id) references sub_offerings(id),
    foreign key(stud_id) references student(adm_no) );
    
insert into student (adm_no, s_name, year_of_adm) values 
	('20ME0001','Student1','2020'),
	('20ME0002','Student2','2020'),
	('20ME0003','Student3','2020'),
	('20ME0004','Student4','2020'),
	('21ME0001','Student5','2021'),
	('21ME0002','Student6','2021'),
	('21ME0003','Student7','2021'),
	('21ME0004','Student8','2021'),
	('20ME0009','Student9','2020'),
	('20ME0010','Student10','2020'),
	('20ME0011','Student11','2020'),
	('20ME0012','Student12','2020'),
	('21ME0005','Student13','2021'),
	('21ME0006','Student14','2021'),
	('21ME0007','Student15','2021'),
	('21ME0008','Student16','2021'),
	('20ME0005','Student17','2020'),
	('20ME0006','Student18','2020'),
	('20ME0007','Student19','2020'),
	('20ME0008','Student20','2020'),
	('21ME0009','Student21','2021'),
	('21ME0010','Student22','2021'),
	('21ME0011','Student23','2021'),
	('21ME0012','Student24','2021');
    
select * from student;

insert into department (d_code, d_name) values ('DEP01', 'Department1'), ('DEP02', 'Department2'), ('DEP03', 'Department3');

select * from department;

alter table employee 
	add e_type varchar(20),
    add e_role varchar(20);

desc employee;

delete from student where adm_no like '2%';

select * from student;

alter table student add gender varchar(10);

insert into student (adm_no, s_name, gender, year_of_adm) values
	('20ME0001','Anil Pandey','male','2020'),
	('20ME0002','Sudhanshu Singh','male','2020'),
	('20ME0003','Sourav Sarkar','male','2020'),
	('20ME0004','Jasmine Anand','female','2020'),
	('21ME0001','Preeti Bharti','female','2021'),
	('21ME0002','Bhumika Agarwal','female','2021'),
	('21ME0003','Saransh Singh','male','2021'),
	('21ME0004','Kunal Rai','male','2021'),
	('20ME0009','Tushar Rai','male','2020'),
	('20ME0010','Vamika Agarwal','female','2020'),
	('20ME0011','Lalit Sarkar','male','2020'),
	('20ME0012','Jasmine Verma','female','2020'),
	('21ME0005','Punit Rai','male','2021'),
	('21ME0006','Mohan Yadav','male','2021'),
	('21ME0007','Roshani Kumari','female','2021'),
	('21ME0008','Rishi Gupta','male','2021'),
	('20ME0005','Saransh Soni','male','2020'),
	('20ME0006','Leela Tiwari','female','2020'),
	('20ME0007','Badal Rai','male','2020'),
	('20ME0008','Deepak Kumar','male','2020'),
	('21ME0009','Haricharan Rai','male','2021'),
	('21ME0010','Parimal Raj','male','2021'),
	('21ME0011','Leela Anand','female','2021'),
	('21ME0012','Kirti Bharti','female','2021');
    
select * from student;

create table course (
	id int auto_increment,
    c_name varchar(200),
    c_duration varchar(20), 
    primary key(id) );

insert into course (c_name, c_duration) values ( 'M.Tech (Computer Science Engineering)', '2 years');

select * from course;

update student set course_id = 1 where adm_no like '2%';

alter table student 
	add major1 varchar(10),
    add major2 varchar(10);
    
insert into course (c_name, c_duration) values 
	('M.Tech', '2 years'),
    ('B.Tech', '4 years'),
    ('M.Sc', '2 years'),
    ('M.Sc(tech)', '3 years');

select * from student;

alter table employee add gender varchar(10);

update student set major1='ECE'
	where adm_no in ('20ME0009','20ME0010','20ME0011','20ME0012','21ME0009','21ME0010','21ME0011','21ME0012');
    
select * from student;

select * from employee;

insert into employee (emp_name, gender, e_type, e_role) values 
	('Ashish Raj','male','teaching','Assistant Professor'),
	('Saraojini Agarwal','female','teaching','Assistant Professor'),
	('Jimmy Singh','male','teaching','Associate Professor'),
	('Bhumika Rani','female','teaching','Assistant Professor'),
	('Gauri Bharti','female','teaching','Assistant Professor'),
	('Vickey Soni','male','teaching','Assistant Professor'),
	('Govind Sarkar','male','teaching','Associate Professor'),
	('Ujjwala Tiwari','female','teaching','Assistant Professor'),
	('Ishita Anand','female','teaching','Associate Professor'),
	('Anjali Singh','female','teaching','Associate Professor'),
	('Ishita Agarwal','female','teaching','Associate Professor'),
	('Neelam Agarwal','female','teaching','Assistant Professor'),
	('Ishita Bharti','female','teaching','Associate Professor'),
	('Gauri Priyadarshani','female','teaching','Professor'),
	('Jimmy Pandey','male','teaching','Associate Professor'),
	('Tulika Priyadarshani','female','teaching','Assistant Professor'),
	('Mohan Sarkar','male','teaching','Assistant Professor'),
	('Chitranjan Yadav','male','teaching','Assistant Professor'),
	('Shushmita Priyadarshani','female','teaching','Professor'),
	('Ujjwala Tiwari','female','teaching','Assistant Professor');

select * from department;
delete from department where d_code like 'DEP%';
insert into department (d_code, d_name) values 
	('CSE', 'Computer Science and Engineering'), 
    ('EE', 'Electrical Engineering'), 
    ('ECE', 'Electronics and Communication Engineering');
    
insert into instructor (emp_id, dept_id) values 
	(1, 'CSE'),(2, 'CSE'),(3, 'CSE'),(4, 'CSE'),(5, 'CSE'),
    (6, 'EE'),(7, 'EE'),(8, 'EE'),(9, 'EE'),(10, 'EE'),
    (11, 'ECE'),(11, 'ECE'),(11, 'ECE'),(11, 'ECE'),(11, 'ECE');
    
show databases;
use university;

select * from instructor;

create table users (
	id int auto_increment,
    user_name varchar(255),
    passcode varchar(255),
    user_role varchar(20),
    user_type varchar(20),
    ref_id varchar(20),
    primary key(id) );


    