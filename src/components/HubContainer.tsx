import styled from 'styled-components';
import {ReactNode} from 'react';

const StyledHubContainer = styled.main`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 0 auto;
    padding: 40px 24px;
    gap: 56px;
    background-color: ${({theme}) => theme.colors.background};
`;

interface HubContainerProps {
    children: ReactNode;
}

export const HubContainer = ({children}: HubContainerProps) => {
    return <StyledHubContainer>{children}</StyledHubContainer>;
};