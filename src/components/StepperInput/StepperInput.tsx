import React from 'react';
import styled from 'styled-components';
import {motion} from 'framer-motion';

const StepperWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    margin: 16px 0;
`;

const ControlButton = styled(motion.button)`
    width: 44px;
    height: 44px;
    border-radius: 50%;
    border: 1px solid ${({theme}) => theme.colors.borders};
    background-color: transparent;
    color: ${({theme}) => theme.colors.textBody};
    font-size: 28px;
    cursor: pointer;
    box-sizing: border-box;

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

const ValueDisplay = styled.div`
    font-size: 28px;
    font-weight: ${({theme}) => theme.font.weights.bold};
    color: ${({theme}) => theme.colors.primary};
    min-width: 100px;
    text-align: center;
`;

interface StepperInputProps {
    min: number;
    max: number;
    step: number;
    value: number;
    onValueChange: (newValue: number) => void;
    'aria-labelledby': string;
}

const StepperInput: React.FC<StepperInputProps> = ({
                                                       min,
                                                       max,
                                                       step,
                                                       value,
                                                       onValueChange,
                                                       'aria-labelledby': labelledby
                                                   }) => {
    const handleIncrement = () => onValueChange(Math.min(max, value + step));
    const handleDecrement = () => onValueChange(Math.max(min, value - step));

    return (
        <StepperWrapper role="group" aria-labelledby={labelledby}>
            <ControlButton onClick={handleDecrement} disabled={value <= min} whileTap={{scale: 0.9}}
                           aria-label="Decrease value">-</ControlButton>
            <ValueDisplay aria-live="polite">+£{value}</ValueDisplay>
            <ControlButton onClick={handleIncrement} disabled={value >= max} whileTap={{scale: 0.9}}
                           aria-label="Increase value">+</ControlButton>
        </StepperWrapper>
    );
};

export default StepperInput;