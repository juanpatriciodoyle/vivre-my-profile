interface CsoApiResponse {
    dataset: {
        value: (number | null)[];
    };
}

export interface CsoData {
    inflationRate: number;
    wageGrowthRate: number;
}

const CSO_API_ENDPOINT = 'https://ws.cso.ie/public/api.restful/PxStat.svc/Query';
const DEFAULT_INFLATION_RATE = 2.5;
const MOCK_WAGE_GROWTH_RATE = 3.5;

const buildCpiQuery = () => {
    return {
        jsonrpc: "2.0",
        method: "PxStat.Data.Cube_API.ReadDataset",
        params: {
            class: "query",
            id: ["STATISTIC", "C02157V02565", "TLIST(M1)"],
            dimension: {
                STATISTIC: {
                    category: {
                        index: ["CPM01C01"],
                    },
                },
                C02157V02565: {
                    category: {
                        index: ["-"],
                    },
                },
                "TLIST(M1)": {
                    category: {
                        index: [],
                    },
                },
            },
            extension: {
                matrix: "CPM01",
                language: {
                    code: "en",
                },
            },
            version: "2.0",
        },
    };
};

export const fetchCsoData = async (): Promise<CsoData> => {
    try {
        const query = buildCpiQuery();
        const response = await fetch(CSO_API_ENDPOINT, {
            method: 'POST',
            body: JSON.stringify(query),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const data: CsoApiResponse = await response.json();
            const latestValue = data.dataset.value[0];
            const inflationRate = typeof latestValue === 'number' ? latestValue : DEFAULT_INFLATION_RATE;
            return {
                inflationRate,
                wageGrowthRate: MOCK_WAGE_GROWTH_RATE,
            };
        }
    } catch (error) {
        console.error("Failed to fetch CSO data:", error);
    }

    return {
        inflationRate: DEFAULT_INFLATION_RATE,
        wageGrowthRate: MOCK_WAGE_GROWTH_RATE,
    };
};