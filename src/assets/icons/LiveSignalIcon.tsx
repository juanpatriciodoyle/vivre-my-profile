import React from 'react';
import styled from 'styled-components';

const SvgIcon = styled.svg`
    width: 14px;
    height: 14px;
    fill: ${({theme}) => theme.colors.textBody};
`;

const LiveSignalIcon: React.FC = () => (
    <SvgIcon
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
    >
        <path
            d="M12 3C7.03 3 3 7.03 3 12s4.03 9 9 9 9-4.03 9-9c0-4.97-4.03-9-9-9zm0 16c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7z"/>
        <path d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
    </SvgIcon>
);

export default LiveSignalIcon;