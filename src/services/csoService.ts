import {Country} from "../utils/dx/types";

export interface CsoData {
    inflationRate: number;
    wageGrowthRate: number;
}

export const fetchCsoData = async (country: Country): Promise<CsoData> => {
    if (country === 'IE') {
        return {
            inflationRate: 2.5,
            wageGrowthRate: 3.5,
        }
    } else {
        return {
            inflationRate: 2.2,
            wageGrowthRate: 3.1,
        }
    }
};