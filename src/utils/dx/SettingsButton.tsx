import React from 'react';
import styled, {css} from 'styled-components';
import {Settings} from 'lucide-react';

const activeStyles = css`
    transform: scale(1.2);

    svg {
        transform: rotate(170deg);
    }
`;

const StyledButton = styled.button<{ $isActive: boolean }>`
    background-color: ${({theme}) => theme.colors.primary};
    color: white;
    border: none;
    border-radius: 50%;
    width: 56px;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 50;
    box-sizing: border-box;
    transition: transform 0.2s ease-out;

    svg {
        transition: transform 0.8s cubic-bezier(0.25, 1, 0.5, 1);
    }

    &:hover {
        ${activeStyles}
    }

    ${({$isActive}) => $isActive && activeStyles}

`;

interface SettingsButtonProps {
    isLocalhost: boolean;
    onClick: () => void;
    isActive: boolean;
}

const SettingsButton: React.FC<SettingsButtonProps> = ({isLocalhost, onClick, isActive}) => {
    return (
        <StyledButton
            className={isLocalhost ? '' : 'hide_in_view_mode'}
            onClick={onClick}
            $isActive={isActive}
        >
            <Settings size={25}/>
        </StyledButton>
    );
};

export default SettingsButton;