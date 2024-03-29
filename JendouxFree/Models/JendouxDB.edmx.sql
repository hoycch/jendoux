use Testing
drop table Query;
drop table Userprofile
create table UserProfile (
Id int primary key identity (1,1),
CreateAt datetime not null,
Visits int not null,
Location varchar(50) not null,
UserAgent varchar(300) not null,
Mode char(1) not null,
FlashSpeed varchar(4) not null,
SlideSpeed varchar(4) not null,
RollSpeed varchar(4) not null,
WordNum varchar(4) not null,
RowNum varchar(4) not null,
Threshold varchar(4) not null,
FontSize varchar(4) not null,
Font nvarchar(50) not null,
LineHeight varchar(4) not null,
Theme varchar(20) not null,
HighLight varchar(6) not null,
Volume varchar(4) not null
)
create table Query(
Id int identity(1,1) primary key,
Url nvarchar(2048) not null,
Time datetime not null,
UserProfileId int not null foreign key references UserProfile
)


insert into UserProfile
select 
CreatedAt, 
cast(round(Visits, 0) as int), 
Location, 
UserAgent, 
'0', 
FlashSpeed,
SlideSpeed,
'2',
WordNum,
RowNum,
Threshold,
FontSize,
Font,
LineHeight,
Theme,
HighLight,
Volume
from UserProfiles up join Settings s
on up.Id = s.Id

insert into Query
select Url, Time, UserProfileId from Queries


with OrderedTable as(
select ROW_NUMBER() over(order by id) as RowNumber, *
from UserProfiles
)
insert into Query
select Url, Time, p.RowNumber from OrderedTable p
join Queries q
on p.Id = q.UserProfileId