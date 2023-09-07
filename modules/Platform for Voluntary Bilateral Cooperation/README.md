# Module: UNDP Platform for Voluntary Bilateral Cooperation
The digital Platform for Voluntary Bilateral Cooperation facilitates the implementation of national ITMO project implementation processes in host and buying countries.

## Instructions 
1. Carbon Registry make a daily to the retrieve ITMO platform programmes.
2. Programmes create in the Carbon Registry when programmes are authorized in the ITMO Platform 
3. The Carbon Registry update when the programmes are Issued with credits in the ITMO Platform 

#### <b>Lifecycle</b>
![ITMO Platform Lifecycle](https://github.com/undp/carbon-registry/blob/main/documention/imgs/ITMOxCARBON_LifeCycle.svg)

#### <b>Programme Creation and Authorisation</b>
- Authorisation of programmes in the ITMO Platform identified by the event name: "ITMO-Design Document (DD) & Validation Report / Upload on National Public Registry". 
- If the Company Tax Id doesn’t exist in the Carbon Registry, that company created in the Carbon Registry.
- When creating the programme: 
    - The programme created with the state “Pending”  
    - The credit estimate set to 100 by default
    - The company percentage set to 100% 
    - The serial number for the programme generated the same as any other programme in the Carbon Registry. 
- Programmes retrieved from the ITMO Platform and created in the Carbon Registry can Authorised/Rejected by a Government user the same as any other programme in the Carbon Registry
- When a programme is authorised, the authorised credits will be the default credit estimate mentioned above. The programme can be issued with credits by a Government user the same as any other programme in the Carbon Registry. 

#### <b>Credit Issuance</b>
- Credits can be issued for programmes retrieved from the ITMO Platform and created in the Carbon Registry in two ways; 
    - By a Government user the same as any other programme. 
    - Credit issuance in the ITMO Platform which should be reflected in the Carbon Registry. 
- In the case of 2 above, 
    - Credit issuance identified by the event name: "Upload Final Monitoring Report" in the ITMO Platform. 


#### <b>Field Mapping</b>

<b>Company</b>
| **Name in the Carbon Registry**   | **Mandatory in the Carbon Registry**   | **Name in the ITMO Platform**   |
| --- | --- | --- |
| Tax ID (_taxId_)  | Yes  | company  |
| Name (_name_)  | Yes  | company  |
| Email (_email_)  | Yes  | Set default : nce.digital+[_organisation_]@undp.org  |
| Phone Number (_phoneNo_)  | Yes  | Set default : 00  |
| Website  |   |   |
| Address  |   | Set default : Country if the Registry  |
| Logo  |   |   |
| Country (_country_)  |   | Set default : Country of the Registry  |
| Role (_companyRole_)  | Yes  | Set default : ProgrammeDeveloper  |

<br><b>User</b>
| Name in the Carbon Registry | Mandatory in the Carbon Registry | Name in the ITMO Platform |
| --- | --- | --- |
| Email (_email_)  | Yes  | Set default : nce.digital+[_organisation_]@undp.org  |
| Role (_role_)  | Yes  | Set default : Admin  |
| Phone Number (_phoneNo_)  |   | Set default : 00  |

<br><b>Programme</b>
| **Name in the Carbon Registry**   | **Mandatory in the Carbon Registry**   | **Name in the ITMO Platform**   |
| --- | --- | --- |
| Programme Name (title)  | Yes  | Name  |
| External ID (externalId)  | Yes  | id  |
| Credit Issuance Serial Number   |   |   |
| Current Status   |   | Set default : Pending  |
| Applicant Type   |   | Set default : Programme Developer  |
| Sector (_sector_)  | Yes  | [Sector](#itmo-sector-mapping)  |
| Sectoral Scope (_sectoralScope_)  | Yes  | [Sector](#itmo-sector-mapping)|
| Programme Start Date (_startTime_)  | Yes  | createdAt  |
| Programme End Date  (_endTime_)  | Yes  | createdAt + 10 years  |
| Geographical Location (Regional) (_geographicalLocation_)  | Yes  | country _(Name not mentioned as ISO3 or actual name)_  |
| Buyer Country Eligibility   |   |   |
| Programme Cost (USD) (_programmeCostUSD_)  | Yes  | Set default : Null  |
| Financing Type   |   |   |
| Grant Equivalent Amount   |   |   |
| Carbon Price (Dollars per ton)   |   |   |
| Company   |   | company  |
| Company Tax ID (_proponentTaxVatId_)  | Yes  | company  |
| Company Percentage (_proponentPercentage_)  | Yes  | Set default : 100%  |
| Type of Mitigation Action/Activity (_typeOfMitigation_)  | Yes  | [Sector](#itmo-sector-mapping) |
| GHGs Covered (_greenHouseGasses_)  | Yes  | Set default :  CO2  |
| Credits Authorised  |   | Set default : 100  |
| Credits Issued   |   | Set default : 10   |
| Credits Transferred   |   |   |
| Credits Frozen   |   |   |
| Credits Retired   |   |   |
| Credits authorised for international transfer and use (Total cumulative maximum amount of Mitigation Outcomes for which international transfer and use is authorized)   |   |   |
| Crediting Period (years)   |   |   |
| Programme Materials   |   | Files \*   |
| Project Materials  |   | Files \*  |
| **Credit Calculation Fields / Mitigation Type Calculation**    |   |   |
| **Agriculture**   |   |   |
| Land Area  |   |   |
| Land Area Unit  |   |   |
| **Solar**   |   |   |
| energy generation  |   |   |
| energy generation unit  |   |   |
| consumer group  |   |   |

#### <b>ITMO Sector Mapping</b>
|ITMO Sector Field Value|Sector|Sectoral Scope|Type Of Mitigation|
| -- | -- | -- | -- |
|energy-distribution|Energy|Energy Distribution|Energy Distribution
|agriculture|Agriculture|Agriculture|Agriculture|
|energy-industries|Energy|Energy Industry|EE Industry
|Default|Other|Energy Industry|EE Industry


#### <b>Assumptions</b>
- Programme estimated credit amount is 100.
- Programme issued credit amount is always 10.

#### <b>Docker Integration Setup</b>
1. Append `data-importer` to `docker-compose` file `replicator` service `RUN_MODULE` env variable with comma separated. 
2. Update following env variables in the `docker-compose` file `replicator` service.
    - ITMO_API_KEY
    - ITMO_EMAIL
    - ITMO_PASSWORD
    - ITMO_ENDPOINT
3. Programmes will import on each docker restart. 
