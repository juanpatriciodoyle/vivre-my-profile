import React from 'react';
import styled from 'styled-components';

const SvgIcon = styled.svg`
    width: 20px;
    height: 20px;
    fill: ${({theme}) => theme.colors.textBody};
`;

const GovBuildingIcon: React.FC = () => (
    <SvgIcon
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
    >
        <path d="M12 1L2 6v2h20V6L12 1zM4 9v11h3v-6h10v6h3V9H4zm5 2h2v3H9v-3zm4 0h2v3h-2v-3z"/>
    </SvgIcon>
);

export default GovBuildingIcon;