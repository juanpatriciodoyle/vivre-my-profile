import React from 'react';
import styled from 'styled-components';

const SvgIcon = styled.svg`
    width: 16px;
    height: 16px;
    fill: ${({theme}) => theme.colors.textBody};
    cursor: pointer;
    opacity: 0.7;
    transition: opacity 0.2s;

    &:hover {
        opacity: 1;
    }
`;

const InfoIcon: React.FC = () => (
    <SvgIcon
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
    >
        <path
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-5h2v2h-2zm0-8h2v6h-2z"/>
    </SvgIcon>
);

export default InfoIcon;