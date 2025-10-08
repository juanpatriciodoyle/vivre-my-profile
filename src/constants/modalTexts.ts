import {Country} from "../utils/dx/types";

export const retirementGoals = {
    essential: {
        label: "Essential Living",
        amount: 450000,
    },
    comfortable: {
        label: "Comfortable Lifestyle",
        amount: 600000,
    },
    adventurous: {
        label: "Adventurous Travel",
        amount: 750000,
    }
};

export const modalTexts = (country: Country) => ({
    stepper: [
        "Verify Data",
        "Define Goal",
        "Close the Gap",
        "Final Plan"
    ],
    step1: {
        title: "Building Your Personalised Retirement Forecast",
        intro: "Hi Kate. To create the most accurate forecast, I've securely synchronized your latest data from several official sources. Please confirm the details below.",
        sourceRevenue: country === 'IE' ? "Irish Revenue" : "HM Revenue & Customs",
        incomeLabel: "Annual Income (Reported)",
        pensionContributionsLabel: "Tax-Relieved Pension Contributions (YTD)",
        sourceDsp: country === 'IE' ? "Dept. of Social Protection" : "Dept. for Work and Pensions",
        statePensionLabel: "Projected State Pension (at age 67)",
        sourceRegistry: country === 'IE' ? "Public Registry" : "General Register Office",
        dependentsLabel: "Registered Dependents",
        confirmButton: "Data is Correct, Build My Forecast",
        editDataLink: "Something looks wrong? Let us know.",
        tooltips: {
            income: {
                title: `Data Source: ${country === 'IE' ? "Irish Revenue" : "HMRC"}`,
                content: "This is the taxable income as reported in your most recent statement, synchronized on " + new Date().toLocaleDateString() + ".",
                link: country === 'IE' ? "https://www.revenue.ie/" : "https://www.gov.uk/government/organisations/hm-revenue-customs"
            },
            dsp: {
                title: `Data Source: ${country === 'IE' ? "Dept. of Social Protection" : "DWP"}`,
                content: "This figure is calculated based on verified social security contributions, which we confirm via an API integration.",
                link: country === 'IE' ? "https://www.gov.ie/en/organisation/department-of-social-protection/" : "https://www.gov.uk/government/organisations/department-for-work-pensions"
            },
        }
    },
    step2: {
        initialAnalysis: (projection: string) => `We project your current plan yields a pot of ${projection}. Now, let's define your goal. Tap a lifestyle below to see your Gap.`,
        gapLabel: "Retirement Gap",
        continueButton: "Continue",
    },
    step3: {
        title: "Close the Gap",
        contributionLabel: "Increase Monthly Contribution",
        strategyLabel: "Adjust Investment Strategy",
        consolidationLabel: "Consolidate Old Pensions",
        consolidationDescription: (value: string) => `Include a dormant pension worth ${value}.`,
        confirmButton: "Build Final Plan",
    },
    step4: {
        title: "Your Final Plan",
        summaryGoalClosed: "Percentage of Goal Closed",
        goalReached: "PLAN ACHIEVES GOAL",
        summaryRemainingGap: "Remaining Gap",
        finalCta: "See Next Steps for Action",
    },
    step5: {
        title: "Your Action Plan",
        intro: "Excellent. Here are the next steps to put your new financial plan into action.",
        contributionAction: (amount: string) => `Set up a direct debit increase of ${amount}.`,
        consolidationAction: "Schedule a call to consolidate your pensions.",
        strategyAction: "Read about Aggressive investment strategies.",
        phoneLink: "Call an advisor now",
        articleLink: "Read article",
        finishButton: "All Done, Thank You!",
        zeroAction: {
            title: "Your Current Plan Confirmed",
            intro: (projection: string) => `Excellent. You've confirmed your retirement plan based on the latest official data. Your current approach is projected to achieve a final pot of ${projection}.`,
            action: "Save Your Forecast: Add your personalised retirement forecast to your dashboard to track your progress and receive alerts if your goal changes.",
            button: "Let's get started!",
        }
    }
});