import React from 'react';
import styled from 'styled-components';

const TooltipWrapper = styled.div<{ $isVisible: boolean }>`
    position: absolute;
    bottom: -45px;
    left: 50%;
    transform: ${({$isVisible}) => $isVisible ? 'translateX(-50%)' : 'translateX(-50%) translateY(10px)'};
    background-color: ${({theme}) => theme.colors.textHeadings};
    color: ${({theme}) => theme.colors.subtleBackground};
    padding: 8px 12px;
    border-radius: 6px;
    font-size: ${({theme}) => theme.font.sizes.subtext};
    white-space: nowrap;
    z-index: 20;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    box-sizing: border-box;
    opacity: ${({$isVisible}) => ($isVisible ? 1 : 0)};
    visibility: ${({$isVisible}) => ($isVisible ? 'visible' : 'hidden')};
    transition: opacity 0.2s ease-out, transform 0.2s ease-out, visibility 0.2s;

    &::before {
        content: '';
        position: absolute;
        top: -5px;
        left: 50%;
        transform: translateX(-50%);
        border-width: 0 5px 5px;
        border-style: solid;
        border-color: transparent transparent ${({theme}) => theme.colors.textHeadings};
    }
`;

interface TooltipProps {
    text: string;
    isVisible: boolean;
}

const Tooltip: React.FC<TooltipProps> = ({text, isVisible}) => {
    return (
        <TooltipWrapper $isVisible={isVisible} role="tooltip">
            {text}
        </TooltipWrapper>
    );
};

export default Tooltip;