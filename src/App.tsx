import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './styles/globalStyles';
import { themes } from './styles/theme';
import GreetingBanner from './components/GreetingBanner/GreetingBanner';

const AppWrapper = styled.div`
    text-align: center;
`;

const App: React.FC = () => {
    const userId = window.appConfig?.userUid || 'VIV-ACCOUNT-1';
    const userName = window.appConfig?.userCn || 'Kate Crestwell';
    const userLocation = (window.appConfig?.userLocation || '10 Downing Street, London, SW1A 2AA').replace(/[[\]]/g, '');

    return (
        <ThemeProvider theme={themes.light}>
            <GlobalStyle />
            <AppWrapper>
                <GreetingBanner
                    userName={userName}
                    customerId={userId}
                    userAddress={userLocation}
                />
            </AppWrapper>
        </ThemeProvider>
    );
};

export default App;