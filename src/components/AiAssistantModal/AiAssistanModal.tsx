import React, {useEffect, useState} from 'react';
import styled, {keyframes} from 'styled-components';
import {AnimatePresence, motion} from 'framer-motion';
import Modal from '../Modal/Modal';
import Stepper from '../Stepper/Stepper';
import {fetchGovData, GovData} from '../../services/govApiService';
import {CsoData, fetchCsoData} from '../../services/csoService';
import {projectPensionGrowth} from '../../utils/financialCalculations';
import {modalTexts} from '../../constants/modalTexts';
import {Step1VerifyData} from './steps/Step1VerifyData';
import {Step2DefineGoal} from './steps/Step2DefineGoal';
import {investmentStrategies, Step3CloseTheGap} from './steps/Step3CloseTheGap';
import {Step4FinalPlan} from './steps/Step4FinalPlan';
import {Step5ActionPlan} from './steps/Step5ActionPlan';
import {GapChart} from '../BarChart/BarChart';
import {useSettings} from '../../utils/dx/settingsContext';
import {defaultUser} from "../../constants/users";
import LiveSignalIcon from "../../assets/icons/LiveSignalIcon";

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

const pulse = keyframes`
    0%, 100% {
        opacity: 1;
    }
    50% {
        opacity: 0.5;
    }
`;

const LoadingContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 200px;
    gap: 12px;
    color: ${({theme}) => theme.colors.textBody};
    animation: ${pulse} 1.5s ease-in-out infinite;
`;


interface Goal {
    label: string;
    amount: number;
}

interface AiAssistantModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const AiAssistantModal: React.FC<AiAssistantModalProps> = ({isOpen, onClose}) => {
    const {settings} = useSettings();
    const [govData, setGovData] = useState<GovData | null>(null);
    const [csoData, setCsoData] = useState<CsoData | null>(null);
    const texts = modalTexts(settings.country);

    const [[currentStep, direction], setCurrentStep] = useState([0, 0]);
    const [initialProjection, setInitialProjection] = useState<number>(0);
    const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
    const [contributionIncrease, setContributionIncrease] = useState(0);
    const [strategy, setStrategy] = useState<'balanced' | 'aggressive'>('balanced');
    const [includeDormant, setIncludeDormant] = useState(false);
    const [animationType, setAnimationType] = useState<'smooth' | 'pop'>('smooth');

    useEffect(() => {
        if (isOpen) {
            setGovData(null);
            setCsoData(null);
            let userName = window.appConfig?.userCn || defaultUser.displayName;
            if (userName.startsWith('[Plugin:')) {
                userName = defaultUser.displayName;
            }
            fetchGovData(userName, settings.country).then(data => {
                setGovData(data);
            });
        }
    }, [isOpen, settings.country]);

    useEffect(() => {
        if (govData) {
            fetchCsoData(settings.country).then(data => {
                setCsoData(data);
                const currentMonthlyContribution = govData.revenue.pensionContributionsYTD / 12;
                const projection = projectPensionGrowth(
                    currentMonthlyContribution,
                    data.inflationRate,
                    data.wageGrowthRate,
                    0.05
                );
                setInitialProjection(projection);
            });
        }
    }, [govData, settings.country]);

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
            setGovData(null);
            setCsoData(null);
        }, 500);
    }

    const steps = texts.stepper;
    const isDataLoading = !govData || !csoData;

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
                    {isDataLoading && (
                        <LoadingContainer>
                            <LiveSignalIcon/>
                            <p>Synchronizing your latest data...</p>
                        </LoadingContainer>
                    )}

                    {!isDataLoading && currentStep === 0 &&
                        <Step1VerifyData govData={govData} onNext={() => paginate(1)}/>}
                    {!isDataLoading && currentStep === 1 &&
                        <Step2DefineGoal
                            projection={initialProjection}
                            selectedGoal={selectedGoal}
                            onGoalSelect={handleGoalSelect}
                            onNext={() => paginate(1)}
                            animationType={animationType}
                        />}
                    {!isDataLoading && currentStep === 2 && selectedGoal && (
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
                    {!isDataLoading && currentStep === 3 && selectedGoal &&
                        <Step4FinalPlan planClosesAmount={planClosesAmount} shortfall={shortfall}
                                        onNext={() => paginate(1)}/>}
                    {!isDataLoading && currentStep === 4 &&
                        <Step5ActionPlan plan={{contributionIncrease, strategy, includeDormant}}
                                         initialProjection={initialProjection}
                                         onClose={handleClose}/>}
                </StepWrapper>
            </AnimatePresence>
        </Modal>
    );
};