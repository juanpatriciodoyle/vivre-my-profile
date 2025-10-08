import {defaultUser} from '../constants/users';
import {Country} from '../utils/dx/types';

export interface GovData {
    revenue: {
        annualIncome: number;
        pensionContributionsYTD: number;
    };
    socialProtection: {
        projectedStatePension: number;
    };
    publicRegistry: {
        dependents: string;
    };
    dormantPension: {
        detected: boolean;
        value: number;
    };
}

const mockDataIE: GovData = {
    revenue: {
        annualIncome: 70000,
        pensionContributionsYTD: 4200,
    },
    socialProtection: {
        projectedStatePension: 277,
    },
    publicRegistry: {
        dependents: "1 New Dependent",
    },
    dormantPension: {
        detected: true,
        value: 25000,
    },
};

const mockDataGB: GovData = {
    revenue: {
        annualIncome: 60000,
        pensionContributionsYTD: 3600,
    },
    socialProtection: {
        projectedStatePension: 203.85,
    },
    publicRegistry: {
        dependents: "1 New Dependent",
    },
    dormantPension: {
        detected: true,
        value: 25000,
    },
};

export const fetchGovData = (userName: string, country: Country): Promise<GovData | null> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            if (userName === defaultUser.displayName) {
                resolve(country === 'IE' ? mockDataIE : mockDataGB);
            } else {
                resolve(null);
            }
        }, 1500);
    });
};