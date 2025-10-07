import React from 'react';
import styled, {keyframes} from 'styled-components';
import {motion} from 'framer-motion';
import {modalTexts} from '../../../constants/modalTexts';
import {formatCurrency} from '../../../utils/financialCalculations';
import {PrimaryButton} from '../shared';
import {ProgressRing} from '../../ProgressRing/ProgressRing';

const StepContainer = styled(motion.div)` text-align: center; `;
const Title = styled.h2` margin: 0 0 16px; `;
const ResultText = styled.p` font-size: 16px;
    margin: 0; `;
const GoalMetText = styled.p`
    font-size: 20px;
    font-weight: ${({theme}) => theme.font.weights.bold};
    color: ${({theme}) => theme.colors.success};
    margin: 16px 0 0;
`;
const shimmer = keyframes`
    0% {
        background-position: -400px 0;
    }
    100% {
        background-position: 400px 0;
    }
`;
const CelebratoryButton = styled(PrimaryButton)`
    background: linear-gradient(to right,
    ${({theme}) => theme.colors.primary},
    ${({theme}) => theme.colors.success},
    ${({theme}) => theme.colors.primary});
    background-size: 800px 400px;
    animation: ${shimmer} 2.5s linear infinite;
`;

interface Step4Props {
    planClosesAmount: number;
    shortfall: number;
    onNext: () => void;
}

const texts = modalTexts.step4;

export const Step4FinalPlan: React.FC<Step4Props> = ({planClosesAmount, shortfall, onNext}) => {
    const percentageClosed = shortfall > 0 ? (planClosesAmount / shortfall) * 100 : 100;
    const ActionButton = percentageClosed >= 100 ? CelebratoryButton : PrimaryButton;

    return (
        <StepContainer initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 0.5, delay: 0.3}}>
            <Title>{texts.title}</Title>
            <ProgressRing percentage={percentageClosed}/>
            <ResultText>{texts.summaryGoalClosed}</ResultText>
            {percentageClosed >= 100 ? (
                <GoalMetText>GOAL REACHED ✅</GoalMetText>
            ) : (
                <ResultText>Remaining Gap: {formatCurrency(shortfall - planClosesAmount)}</ResultText>
            )}
            <ActionButton style={{marginTop: '32px'}} onClick={onNext}>{texts.finalCta}</ActionButton>
        </StepContainer>
    );
};