import React from 'react';
import styled from 'styled-components';
import {modalTexts} from '../../../constants/modalTexts';
import {formatCurrency} from '../../../utils/financialCalculations';
import StepperInput from '../../StepperInput/StepperInput';
import {PrimaryButton} from '../shared';

const StepContainer = styled.div` text-align: center; `;
const Lever = styled.div`
    padding: 16px;
    background-color: ${({theme}) => theme.colors.subtleBackground};
    border: 1px solid ${({theme}) => theme.colors.borders};
    border-radius: ${({theme}) => theme.sizing.borderRadius.cards};
    margin-bottom: 16px;
`;
const LeverHeader = styled.h3` font-weight: ${({theme}) => theme.font.weights.semiBold};
    margin: 0 0 8px;
    text-align: left;
    font-size: 16px; `;
const StrategyButtons = styled.div` display: flex;
    gap: 12px; `;
const StrategyButton = styled.button<{ $isActive: boolean }>`
    flex: 1;
    padding: 8px;
    border-radius: ${({theme}) => theme.sizing.borderRadius.buttons};
    border: 1px solid ${({theme, $isActive}) => $isActive ? theme.colors.primary : theme.colors.borders};
    background-color: ${({theme, $isActive}) => $isActive ? theme.colors.primaryTint : 'transparent'};
    color: ${({theme, $isActive}) => $isActive ? theme.colors.primary : theme.colors.textBody};
    font-weight: ${({theme}) => theme.font.weights.medium};
    cursor: pointer;
    transition: all 0.2s ease;
    box-sizing: border-box;
`;
const ToggleWrapper = styled.div` display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 8px; `;
const ToggleDescription = styled.p` font-size: 14px;
    color: ${({theme}) => theme.colors.textBody};
    margin: 0;
    text-align: left; `;
const ToggleSwitch = styled.label`
    position: relative;
    display: inline-block;
    width: 44px;
    height: 24px;

    input {
        opacity: 0;
        width: 0;
        height: 0;
    }

    span {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: ${({theme}) => theme.colors.borders};
        transition: .4s;
        border-radius: 24px;
    }

    span:before {
        position: absolute;
        content: "";
        height: 18px;
        width: 18px;
        left: 3px;
        bottom: 3px;
        background-color: white;
        transition: .4s;
        border-radius: 50%;
    }

    input:checked + span {
        background-color: ${({theme}) => theme.colors.primary};
    }

    input:checked + span:before {
        transform: translateX(20px);
    }
`;

export const investmentStrategies = {
    balanced: {label: "Balanced", rate: 0.05},
    aggressive: {label: "Aggressive", rate: 0.07},
};

interface Step3Props {
    onNext: () => void;
    contributionIncrease: number;
    setContributionIncrease: (v: number) => void;
    strategy: 'balanced' | 'aggressive';
    setStrategy: (v: 'balanced' | 'aggressive') => void;
    includeDormant: boolean;
    setIncludeDormant: (v: boolean) => void;
    dormantPensionValue: number;
    setAnimationType: (type: 'smooth' | 'pop') => void;
}

const texts = modalTexts.step3;

export const Step3CloseTheGap: React.FC<Step3Props> = ({
                                                           onNext,
                                                           contributionIncrease,
                                                           setContributionIncrease,
                                                           strategy,
                                                           setStrategy,
                                                           includeDormant,
                                                           setIncludeDormant,
                                                           dormantPensionValue,
                                                           setAnimationType
                                                       }) => {

    const handleContributionChange = (newValue: number) => {
        setAnimationType('smooth');
        setContributionIncrease(newValue);
    };

    const handleStrategyChange = (newStrategy: 'balanced' | 'aggressive') => {
        setAnimationType('smooth');
        setStrategy(newStrategy);
    };

    const handleDormantToggle = (isChecked: boolean) => {
        setAnimationType('pop');
        setIncludeDormant(isChecked);
    };

    return (
        <StepContainer>
            <h2>{texts.title}</h2>
            <Lever>
                <LeverHeader id="contribution-label">{texts.contributionLabel}</LeverHeader>
                <StepperInput min={0} max={500} step={25} value={contributionIncrease}
                              onValueChange={handleContributionChange} aria-labelledby="contribution-label"/>
            </Lever>
            <Lever>
                <LeverHeader>{texts.strategyLabel}</LeverHeader>
                <StrategyButtons>
                    <StrategyButton $isActive={strategy === 'balanced'}
                                    onClick={() => handleStrategyChange('balanced')}>{investmentStrategies.balanced.label}</StrategyButton>
                    <StrategyButton $isActive={strategy === 'aggressive'}
                                    onClick={() => handleStrategyChange('aggressive')}>{investmentStrategies.aggressive.label}</StrategyButton>
                </StrategyButtons>
            </Lever>
            {dormantPensionValue > 0 && (
                <Lever>
                    <ToggleWrapper>
                        <LeverHeader>{texts.consolidationLabel}</LeverHeader>
                        <ToggleSwitch>
                            <input type="checkbox" checked={includeDormant}
                                   onChange={(e) => handleDormantToggle(e.target.checked)}/>
                            <span/>
                        </ToggleSwitch>
                    </ToggleWrapper>
                    <ToggleDescription>{texts.consolidationDescription(formatCurrency(dormantPensionValue))}</ToggleDescription>
                </Lever>
            )}
            <PrimaryButton style={{marginTop: '16px', width: '100%'}}
                           onClick={onNext}>{texts.confirmButton}</PrimaryButton>
        </StepContainer>
    );
};