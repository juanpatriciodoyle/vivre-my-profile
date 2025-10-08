import React from 'react';
import styled from 'styled-components';
import {Currency} from '../utils/dx/types';
import {CURRENCIES} from '../utils/dx/dx-data';

const CurrencySelectorContainer = styled.div`
    display: flex;
    gap: 12px;
    border: 1px solid ${({theme}) => theme.colors.borders};
    border-radius: ${({theme}) => theme.sizing.borderRadius.buttons};
    padding: 4px;
`;

const CurrencyOption = styled.button<{ $isActive: boolean }>`
    flex: 1;
    padding: 8px 12px;
    border-radius: 4px;
    border: none;
    background-color: ${({theme, $isActive}) => $isActive ? theme.colors.primary : 'transparent'};
    color: ${({theme, $isActive}) => $isActive ? '#FFFFFF' : theme.colors.textBody};
    cursor: pointer;
    font-weight: 500;
    transition: all 150ms ease-in-out;

    &:hover {
        background-color: ${({theme, $isActive}) => !$isActive && theme.colors.secondaryAction};
    }
`;

interface CurrencySelectorProps {
    setCurrency: (currency: Currency) => void;
    currentCurrencyKey: Currency;
}

const CurrencySelector: React.FC<CurrencySelectorProps> = ({setCurrency, currentCurrencyKey}) => {
    return (
        <CurrencySelectorContainer>
            {CURRENCIES.map(currencyOption => (
                <CurrencyOption
                    key={currencyOption.value}
                    $isActive={currentCurrencyKey === currencyOption.value}
                    onClick={() => setCurrency(currencyOption.value)}
                >
                    {currencyOption.label}
                </CurrencyOption>
            ))}
        </CurrencySelectorContainer>
    );
};

export default CurrencySelector;