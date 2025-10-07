const PENSION_PROJECTION_YEARS = 30;
const SAVINGS_PROJECTION_YEARS = 18;

export const projectPensionGrowth = (
    monthlyContribution: number,
    inflationRate: number,
    wageGrowthRate: number,
    annualReturn: number
): number => {
    if (monthlyContribution <= 0) return 0;

    let futureValue = 0;
    let currentContribution = monthlyContribution;

    const inflationDecimal = inflationRate / 100;
    const wageGrowthDecimal = wageGrowthRate / 100;
    const realAnnualReturn = (1 + annualReturn) / (1 + inflationDecimal) - 1;
    const monthlyReturn = realAnnualReturn / 12;

    for (let i = 0; i < PENSION_PROJECTION_YEARS * 12; i++) {
        if (i > 0 && i % 12 === 0) {
            currentContribution *= (1 + wageGrowthDecimal);
        }
        futureValue = (futureValue + currentContribution) * (1 + monthlyReturn);
    }

    return futureValue;
};

export const projectSavingsGrowth = (
    initialInvestment: number,
    inflationRate: number
): number => {
    if (initialInvestment <= 0) return 0;

    const inflationDecimal = inflationRate / 100;
    const annualReturn = 0.05;
    const realAnnualReturn = (1 + annualReturn) / (1 + inflationDecimal) - 1;

    return initialInvestment * Math.pow(1 + realAnnualReturn, SAVINGS_PROJECTION_YEARS);
};


export const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: 'GBP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);
};