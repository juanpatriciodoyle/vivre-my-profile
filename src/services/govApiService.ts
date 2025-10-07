import {defaultUser} from '../constants/users';

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

export const fetchGovData = (userName: string): Promise<GovData | null> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            if (userName === defaultUser.displayName) {
                resolve({
                    revenue: {
                        annualIncome: 60000,
                        pensionContributionsYTD: 3600,
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
                });
            } else {
                resolve(null);
            }
        }, 2500);
    });
};