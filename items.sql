CREATE TABLE `district` ( 
   `id` INT NOT NULL,
   `district` CHAR,
    PRIMARY KEY (
   `id`
    )
);




CREATE TABLE `county` ( 
   `id` INT NOT NULL,
   `county` CHAR,
   `` INT,
   `district_id` INT NOT NULL,
    PRIMARY KEY (
   `id`
    )
);



CREATE TABLE `subcounty` ( 
   `id` INT NOT NULL,
   `subcounty` INT,
   `county_id` INT NOT NULL,
    PRIMARY KEY (
   `id`
    )
);




CREATE TABLE `parish` ( 
   `id` INT NOT NULL,
   `parish` INT,
   `subcounty_id` INT NOT NULL,
    PRIMARY KEY (
   `id`
    )
);



CREATE TABLE `village` ( 
   `id` INT NOT NULL,
   `village` INT,
   `parish_id` INT NOT NULL,
    PRIMARY KEY (
   `id`
    )
);


ALTER TABLE `county` 
  ADD CONSTRAINT `district-county`
  FOREIGN KEY ( 
   `district_id`
)   REFERENCES `district`( 
   `id`
) ;


ALTER TABLE `subcounty` 
  ADD CONSTRAINT `county-subcounty`
  FOREIGN KEY (     
   `county_id`
)   REFERENCES `county`( 
   `id`
) ;


ALTER TABLE `parish` 
  ADD CONSTRAINT `subcounty-parish`
  FOREIGN KEY ( 
   `subcounty_id`
)   REFERENCES `subcounty`( 
   `id`
) ;


ALTER TABLE `village` 
  ADD CONSTRAINT `parish-village`
  FOREIGN KEY ( 
   `parish_id`
)   REFERENCES `parish`( 
   `id`
) ;


INSERT INTO admin_regions.village(village,parish_id)

(SELECT distinct (TRIM( b.VILLAGE_NAME)),c.id
 FROM  ug_admin_regions.data b, admin_regions.parish c
WHERE TRIM(b.PARISH_NAME)= c.parish)


SELECT TRIM(village) from admin_regions.village WHERE LOWER(village) LIKE '%kyenda%'

