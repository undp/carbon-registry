import { SectoralScope } from "./constants/sectoralScope"

export const generateSerialNumber = (
    countryISO2Code: string,
    sectoralScope: SectoralScope,
    programmeId: string,
    year: number,
    blockStartCredit: number,
    blockEndCredit: number
    ): string => {
        return `${countryISO2Code}-ITMO-${sectoralScope}-${programmeId}-${year}-0-${blockStartCredit}-${blockEndCredit}`
}