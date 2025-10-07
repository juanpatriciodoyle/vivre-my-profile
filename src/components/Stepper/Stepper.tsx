import React from 'react';
import styled from 'styled-components';
import {motion} from 'framer-motion';

const StepperContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 32px;
    position: relative;
`;

const StepWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 1;
`;

const StepCircle = styled(motion.div)<{ $isActive: boolean; $isCompleted: boolean }>`
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: ${({theme, $isActive, $isCompleted}) =>
            $isActive || $isCompleted ? theme.colors.primary : theme.colors.borders};
    color: ${({theme, $isActive, $isCompleted}) =>
            $isActive || $isCompleted ? 'white' : theme.colors.textBody};
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: ${({theme}) => theme.font.weights.bold};
    transition: background-color 0.3s, color 0.3s;
`;

const StepLabel = styled.span<{ $isActive: boolean }>`
    font-size: 12px;
    margin-top: 8px;
    font-weight: ${({theme, $isActive}) => $isActive ? theme.font.weights.semiBold : theme.font.weights.regular};
    color: ${({theme, $isActive}) => $isActive ? theme.colors.textHeadings : theme.colors.textBody};
`;

const ProgressBar = styled.div`
    position: absolute;
    top: 16px;
    left: 0;
    right: 0;
    height: 4px;
    background-color: ${({theme}) => theme.colors.borders};
    transform: translateY(-50%);
    z-index: 0;
`;

const ProgressFill = styled(motion.div)`
    height: 100%;
    background-color: ${({theme}) => theme.colors.primary};
`;

interface StepperProps {
    steps: string[];
    currentStep: number;
}

const Stepper: React.FC<StepperProps> = ({steps, currentStep}) => {
    const progress = (currentStep / (steps.length - 1)) * 100;

    return (
        <StepperContainer>
            <ProgressBar>
                <ProgressFill
                    initial={{width: 0}}
                    animate={{width: `${progress}%`}}
                    transition={{ease: "easeInOut", duration: 0.5}}
                />
            </ProgressBar>
            {steps.map((label, index) => (
                <StepWrapper key={label}>
                    <StepCircle
                        $isActive={index === currentStep}
                        $isCompleted={index < currentStep}
                        animate={{scale: index === currentStep ? 1.1 : 1}}
                    >
                        {index + 1}
                    </StepCircle>
                    <StepLabel $isActive={index === currentStep}>{label}</StepLabel>
                </StepWrapper>
            ))}
        </StepperContainer>
    );
};

export default Stepper;