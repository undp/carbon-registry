## Revision History

```
Date Version Description
21 .1 1 .202 2 0.1 Initial draft
24.11.2022 0.2 Incorporate necessary changes on block start/end
30.11.2022 0.3 Rounding of carbon credits
```

## Table of Contents

- Document Information
- Revision History
- 1. Introduction
- 2. Serial Number Generator
- 1.1. Serial Number Standard
- 1.2. Country Code
- 1.3. Type of Credit/ Unit
- 1.4. Sectoral Scope Number (as per CDM)
- 1.5. Unique Project ID
- 1.6. Unit Serial Block – Start
- 1.7. Unit Serial Block – End


## 1. Introduction

Once carbon project that was added to the system is Authorized, a unique serial number
should be generated for every project by the Carbon Registry.


## 2. Serial Number Generator

## 1.1. Serial Number Standard

The requested serial number representation standard is as follows,

Serial Number character length:

```
Block Name Type Possible Values
```
```
Country Code (as per ISO
3166)
```
```
String ISO 3166-1 alpha-2 value
```
```
Type of Credit/Unit String ITMO
Sectoral Scope Number (as
per CDM)
```
```
Integer 1 - 15
```
```
Unique Project ID Integer XXX
Year Integer 20XX
Blank/ any other String 0
Unit Serial Block - Start Integer 1 - X
Unit Serial Block - End Integer XXXXXX
```
The blocks will be separated by the delimiter dash (-)
Ex:
VU-ITMO-11-356-2022-0-27-

## 1.2. Country Code

Standard needs to be followed: ISO 3166-1 alpha-2.

```
 ISO 3166-1 alpha-2 – two-letter country codes
```
Ex:

```
Country Name ISO 3166-1 alpha-2 code
Costa Rica CR
Fiji FJ
```

## 1.3. Type of Credit/ Unit

Required carbon credit measurement unit: ITMO

## 1.4. Sectoral Scope Number (as per CDM)

According to the UNFCCC - CDM (Clean Development Mechanism) methodologies, identified
Sectors and Sectoral scope numbers are as follows:

```
Scope Number Sectoral Scope
1 Energy industries (renewable - / non-renewable sources)
2 Energy distribution
3 Energy demand
4 Manufacturing industries
5 Chemical industries
6 Construction
7 Transport
8 Mining/mineral production
9 Metal production
10 Fugitive emissions from fuels (solid, oil and gas)
11 Fugitive emissions from production and consumption of halocarbons
and sulphur hexafluoride
12 Solvent use
13 Waste handling and disposal
14 Afforestation and reforestation
15 Agriculture
```
## 1.5. Unique Project ID

Required format: XXX

Contains only numbers

## 1.6. Unit Serial Block – Start

Serial Block Start – Total number of credits before issuing the credits for the project.

The start of the serial block will be represented without the decimal point of the credit
value. It will be represented as a rounded integer.


## 1.7. Unit Serial Block – End

Serial Block End – Total number of credits after issuing the credits for the project.

The end of the serial block will be represented without the decimal point of the credit value.
It will be represented as a rounded integer.

Ex:

```
Project Current
Block End
```
```
Credit Value Credit Value
(Rounded)
```
```
Serial Block
Start
```
```
Serial Block
End
Project 1 25.51 26 1 26
Project 2 26 10.000 10 27 36
Project 3 35 5.4341 5 37 41
Project 4 41 0.1285 0 Project Rejected as credit
value is 0.
Project 5 41 14.7 15 41 55
```
