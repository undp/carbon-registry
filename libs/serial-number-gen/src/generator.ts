export const generateSerialNumber = (
    countryISO2Code: string, 
    typeOfCredit: string,
    sectoralScopeNo: number,
    year: number
    ): string => {
        return (
            countryISO2Code +
            typeOfCredit + 
            String(sectoralScopeNo) + 
            String(Math.floor(100 + Math.random() * 900)) + 
            String(year)
         )
}