import React from 'react';
import styled from 'styled-components';

const SvgIcon = styled.svg`
    width: 24px;
    height: 24px;
    fill: none;
    stroke: ${({theme}) => theme.colors.textBody};
    stroke-width: 1.5;
    stroke-linecap: round;
    stroke-linejoin: round;
`;

const RevenueIcon: React.FC = () => (
    <SvgIcon
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
    >
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
    </SvgIcon>
);

export default RevenueIcon;