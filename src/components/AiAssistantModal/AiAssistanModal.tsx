import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {AnimatePresence, motion} from 'framer-motion';
import Modal from '../Modal/Modal';
import Stepper from '../Stepper/Stepper';
import {GovData} from '../../services/govApiService';
import {CsoData, fetchCsoData} from '../../services/csoService';
import {projectPensionGrowth} from '../../utils/financialCalculations';
import {modalTexts} from '../../constants/modalTexts';
import {Step1VerifyData} from './steps/Step1VerifyData';
import {Step2DefineGoal} from './steps/Step2DefineGoal';
import {investmentStrategies, Step3CloseTheGap} from './steps/Step3CloseTheGap';
import {Step4FinalPlan} from './steps/Step4FinalPlan';
import {Step5ActionPlan} from './steps/Step5ActionPlan';
import {GapChart} from '../BarChart/BarChart';

const stepVariants = {
    hidden: {opacity: 0, x: 50},
    visible: {opacity: 1, x: 0},
    exit: {opacity: 0, x: -50},
};

const StepWrapper = styled(motion.div)`
    &, * {
        box-sizing: border-box;
    }
`;

interface Goal {
    label: string;
    amount: number;
}

interface AiAssistantModalProps {
    isOpen: boolean;
    onClose: () => void;
    govData: GovData | null;
}

export const AiAssistantModal: React.FC<AiAssistantModalProps> = ({isOpen, onClose, govData}) => {
    const [[currentStep, direction], setCurrentStep] = useState([0, 0]);
    const [csoData, setCsoData] = useState<CsoData | null>(null);
    const [initialProjection, setInitialProjection] = useState<number>(0);
    const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
    const [contributionIncrease, setContributionIncrease] = useState(0);
    const [strategy, setStrategy] = useState<'balanced' | 'aggressive'>('balanced');
    const [includeDormant, setIncludeDormant] = useState(false);
    const [animationType, setAnimationType] = useState<'smooth' | 'pop'>('smooth');

    useEffect(() => {
        if (isOpen && govData && !csoData) {
            fetchCsoData().then(data => {
                setCsoData(data);
                const currentMonthlyContribution = govData.revenue.pensionContributionsYTD / 12;
                setInitialProjection(projectPensionGrowth(currentMonthlyContribution, data.inflationRate, data.wageGrowthRate, 0.05));
            });
        }
    }, [isOpen, govData, csoData]);

    const newProjection = csoData && govData ? projectPensionGrowth(
        (govData.revenue.pensionContributionsYTD / 12) + contributionIncrease,
        csoData.inflationRate, csoData.wageGrowthRate, investmentStrategies[strategy].rate
    ) + (includeDormant ? govData.dormantPension.value : 0) : 0;

    const shortfall = selectedGoal ? selectedGoal.amount - initialProjection : 0;
    const planClosesAmount = newProjection - initialProjection;

    const paginate = (newDirection: number) => {
        setCurrentStep([currentStep + newDirection, newDirection]);
    };

    const handleGoalSelect = (goal: Goal) => {
        setSelectedGoal(goal);
    };

    const handleClose = () => {
        onClose();
        setTimeout(() => {
            setCurrentStep([0, 0]);
            setSelectedGoal(null);
            setContributionIncrease(0);
            setStrategy('balanced');
            setIncludeDormant(false);
        }, 500);
    }

    if (!govData) return null;

    const steps = modalTexts.stepper;
    const isDataLoading = !csoData;

    return (
        <Modal isOpen={isOpen} onClose={handleClose}>
            {currentStep < 4 && <Stepper steps={steps} currentStep={currentStep}/>}

            {currentStep === 2 && !isDataLoading && selectedGoal && (
                <motion.div layout>
                    <GapChart
                        projectionValue={initialProjection}
                        newProjectionValue={newProjection}
                        goalValue={selectedGoal.amount}
                        animationType={animationType}
                    />
                </motion.div>
            )}

            <AnimatePresence initial={false} custom={direction} mode="wait">
                <StepWrapper key={currentStep} custom={direction} variants={stepVariants} initial="hidden"
                             animate="visible" exit="exit" transition={{duration: 0.4}}>
                    {currentStep === 0 && <Step1VerifyData govData={govData} onNext={() => paginate(1)}/>}
                    {currentStep === 1 && !isDataLoading &&
                        <Step2DefineGoal
                            projection={initialProjection}
                            selectedGoal={selectedGoal}
                            onGoalSelect={handleGoalSelect}
                            onNext={() => paginate(1)}
                            animationType={animationType}
                        />}
                    {currentStep === 2 && !isDataLoading && selectedGoal && (
                        <Step3CloseTheGap
                            onNext={() => paginate(1)}
                            contributionIncrease={contributionIncrease}
                            setContributionIncrease={setContributionIncrease}
                            strategy={strategy} setStrategy={setStrategy}
                            includeDormant={includeDormant} setIncludeDormant={setIncludeDormant}
                            dormantPensionValue={govData.dormantPension.value}
                            setAnimationType={setAnimationType}
                        />
                    )}
                    {currentStep === 3 && !isDataLoading && selectedGoal &&
                        <Step4FinalPlan planClosesAmount={planClosesAmount} shortfall={shortfall}
                                        onNext={() => paginate(1)}/>}
                    {currentStep === 4 && <Step5ActionPlan plan={{contributionIncrease, strategy, includeDormant}}
                                                           initialProjection={initialProjection}
                                                           onClose={handleClose}/>}
                </StepWrapper>
            </AnimatePresence>
        </Modal>
    );
};