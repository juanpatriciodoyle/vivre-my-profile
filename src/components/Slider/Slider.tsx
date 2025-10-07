import React from 'react';
import styled from 'styled-components';

const SliderWrapper = styled.div`
    width: 100%;
    margin: 16px 0;
`;

const RangeInput = styled.input`
    -webkit-appearance: none;
    width: 100%;
    height: 8px;
    border-radius: 5px;
    background: ${({theme}) => theme.colors.borders};
    outline: none;
    opacity: 0.7;
    transition: opacity .2s;

    &:hover {
        opacity: 1;
    }

    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background: ${({theme}) => theme.colors.primary};
        cursor: pointer;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    }

    &::-moz-range-thumb {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background: ${({theme}) => theme.colors.primary};
        cursor: pointer;
        border: none;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    }
`;

const LabelsWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: ${({theme}) => theme.colors.textBody};
    margin-top: 8px;
`;

interface SliderProps {
    min: number;
    max: number;
    step: number;
    value: number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Slider: React.FC<SliderProps> = ({min, max, step, value, onChange}) => {
    return (
        <SliderWrapper>
            <RangeInput
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={onChange}
            />
            <LabelsWrapper>
                <span>£{min}</span>
                <span>£{max}</span>
            </LabelsWrapper>
        </SliderWrapper>
    );
};

export default Slider;