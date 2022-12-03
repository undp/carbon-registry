# Carbon Registry - Serial Number Generation
Once carbon project that was added to the system is Authorized, a unique serial number should be generated for every project by the Carbon Registry.

## Serial Number Standard

![alt text](./docs/imgs/format.png)

Serial Number character length:

| Block Name | Type | Possible Values |
| --- | --- | --- |
| Country Code (as per ISO 3166) | String | ISO 3166-1 alpha-2 value |
| Type of Credit/Unit | String | ITMO |
| Sectoral Scope Number (as per CDM) | Integer | 1-15
| Unique Project ID | Integer | XXX |
| Year | Integer | 20XX |
| Blank/ any other | String | 0 |
| Unit Serial Block - Start | Integer | 1 - X |
| Unit Serial Block - End | Integer | XXXXXX |

The blocks will be separated by the delimiter dash (-)<br>
Eg:
VU-ITMO-11-356-2022-0-27-35


### Country Code

Standard needs to be followed `ISO 3166-1 alpha-2` two-letter country codes. 

Eg.
| Country Name | ISO 3166-1 alpha-2 code |
| --- | --- |
| Costa Rica | CR |
| Fiji | FJ |

### Type of Credit/ Unit
Carbon credit measurement unit: ITMO

### Sectoral Scope Number (as per CDM)
According to the UNFCCC - CDM (Clean Development Mechanism methodologies, identified Sectors and Sectoral scope numbers are as follows:


| Scope Number | Sectoral Scope |
| --- | --- |
| 1 | Energy industries (renewable - / non-renewable sources) |
| 2 | Energy distribution |
| 3 | Energy demand |
| 4 | Manufacturing industries |
| 5 | Chemical industries |
| 6 | Construction |
| 7 | Transport |
| 8 | Mining/mineral production |
| 9 | Metal production |
| 10 | Fugitive emissions from fuels (solid, oil and gas) |
| 11 | Fugitive emissions from production and consumption of halocarbons and sulphur hexafluoride |
| 12 | Solvent use |
| 13 | Waste handling and disposal |
| 14 | Afforestation and reforestation |
| 15 | Agriculture |

### Unique Project ID
format: XXX, When it is exceed the limit of possibilities it will go beyond 3 digits. 

Contains only numbers

### Unit Serial Block – Start
Serial Block Start – Total number of credits before issuing the credits for the project + 1 <br>
The start of the serial block will be represented without the decimal point of the credit value. It will be represented as a rounded integer.

### Unit Serial Block – End
Serial Block End – Total number of credits after issuing the credits for the project. <br>
The end of the serial block will be represented without the decimal point of the credit value.
It will be represented as a rounded integer.

Eg:

| Project Current | Block End | Credit Value | Credit Value (Rounded) | Serial Block Start | Serial Block End |
| --- | --- | --- | --- | --- | --- |
| Project 1 | 25.51 | 26 | 1 | 26 |
| Project 2 | 26 | 10.000 | 10 | 27 | 36 |
| Project 3 | 37 | 5.4341 | 5 | 37 | 41 |
| Project 4 | 41 | 0.1285 | 0 | Project Rejected as credit value is 0. |
| Project 5 | 41 | 14.7 | 15 | 41 | 55 |