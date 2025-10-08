import React from 'react';
import styled from 'styled-components';
import {Currency, Settings, Theme} from './types';
import {settingsConfigArray} from './settingsConfig';

const Select = styled.select`
    width: 100%;
    padding: 12px 16px;
    box-sizing: border-box;
    border-radius: ${({theme}) => theme.sizing.borderRadius.buttons};
    border: 1px solid ${({theme}) => theme.colors.borders};
    background-color: ${({theme}) => theme.colors.subtleBackground};
    color: ${({theme}) => theme.colors.textBody};
    font-family: ${({theme}) => theme.font.primary};
    font-size: ${({theme}) => theme.font.sizes.body};
`;

interface FormGroupRenderProps {
    currentSelection: Settings;
    handleSettingChange: (key: keyof Settings, value: Theme | Currency) => void;
}

export const getFormGroups = ({currentSelection, handleSettingChange}: FormGroupRenderProps) => {
    return settingsConfigArray.map(setting => {
        const {key, label, options, component: CustomComponent} = setting;

        let componentToRender;

        if (CustomComponent) {
            const props = {
                [`set${key.charAt(0).toUpperCase() + key.slice(1)}`]: (value: Theme | Currency) => handleSettingChange(key, value),
                [`current${key.charAt(0).toUpperCase() + key.slice(1)}Key`]: currentSelection[key],
            };
            componentToRender = <CustomComponent {...props} />;
        } else {
            componentToRender = (
                <Select
                    name={key}
                    value={currentSelection[key]}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                        handleSettingChange(key, e.target.value as Theme | Currency)
                    }
                >
                    {options.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </Select>
            );
        }

        return {
            id: key,
            label,
            component: componentToRender,
        };
    });
};