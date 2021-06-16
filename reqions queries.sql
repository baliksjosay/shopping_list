SELECT villages.*, parish, subcountyId, subcounty, countyId, county, districtId, district FROM villages 

LEFT JOIN  parishes ON villages.parishId = parishes.id 
LEFT JOIN subcounties ON parishes.subcountyId =subcounties.id
LEFT JOIN counties ON subcounties.countyId = counties.id
LEFT JOIN districts ON counties.districtId = districts.id

WHERE villages.village LIKE '%KAWER%';



SELECT subcounties.*, subcounty, countyId, county, districtId, district FROM subcounties 

LEFT JOIN counties ON subcounties.countyId = counties.id
LEFT JOIN districts ON counties.districtId = districts.id

WHERE subcounties.subcounty LIKE '%kitenga%';





SELECT counties.*, district FROM counties 

LEFT JOIN districts ON counties.districtId = districts.id

WHERE districts.district LIKE '%MUBENDE%';





SELECT villages.*, parish, subcountyId, subcounty, countyId, county, districtId, district FROM villages 
LEFT JOIN  parishes ON villages.parishId = parishes.id 
LEFT JOIN subcounties ON parishes.subcountyId =subcounties.id
LEFT JOIN counties ON subcounties.countyId = counties.id
LEFT JOIN districts ON counties.districtId = districts.id

WHERE villages.village LIKE '%KAWER%';




--SELECT villages.*, parish, subcountyId, subcounty, countyId, county, districtId, district FROM villages 


--LEFT JOIN  parishes ON villages.parishId = parishes.id 
--LEFT JOIN subcounties ON parishes.subcountyId =subcounties.id
--LEFT JOIN counties ON subcounties.countyId = counties.id
--LEFT JOIN districts ON counties.districtId = districts.id
--WHERE villages.id = 31;


SELECT villages.*, parish, subcountyId, subcounty, countyId, county, districtId, district FROM villages 


LEFT JOIN  parishes ON villages.parishId = parishes.id 
LEFT JOIN subcounties ON parishes.subcountyId =subcounties.id
LEFT JOIN counties ON subcounties.countyId = counties.id
LEFT JOIN districts ON counties.districtId = districts.id
WHERE villages.village LIKE '%KAWE%';


SELECT parishes.*, parish subcountyId, subcounty, countyId, county, districtId, district FROM parishes 
LEFT JOIN subcounties ON parishes.subcountyId =subcounties.id
LEFT JOIN counties ON subcounties.countyId = counties.id
LEFT JOIN districts ON counties.districtId = districts.id

WHERE subcounties.id = 4;