import { SectoralScope } from "./constants/sectoralScope"

export const generateSerialNumber = (
    countryISO2Code: string,
    sectoralScope: SectoralScope,
    projectId: string,
    year: number,
    blockStartCredit: number,
    blockEndCredit: number
    ): string => {
        return `${countryISO2Code}-ITMO-${sectoralScope}-${projectId}-${year}-0-${blockStartCredit}-${blockEndCredit}`
}