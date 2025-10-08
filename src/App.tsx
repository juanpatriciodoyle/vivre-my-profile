import React, {useState} from 'react';
import GreetingBanner from "./components/GreetingBanner/GreetingBanner";
import {defaultUser} from "./constants/users";
import SettingsModal from "./utils/dx/SettingsModal";
import {GlobalStyle} from "./styles/globalStyles";

function App() {
    const [isSettingsModalOpen, setSettingsModalOpen] = useState(false);

    const isLocalhost = Boolean(
        window.location.hostname === 'localhost' ||
        window.location.hostname === '[::1]' ||
        window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
    );

    const userId = window.appConfig?.userUid || 'VIV-ACCOUNT-1';
    const userName = window.appConfig?.userCn || defaultUser.displayName;
    const userLocation = (window.appConfig?.userLocation || '10 Downing Street, London, SW1A 2AA').replace(/[[\]]/g, '');

    return (
        <>
            <GlobalStyle/>
            <GreetingBanner
                userName={userName}
                customerId={userId}
                userAddress={userLocation}
                onSettingsClick={() => setSettingsModalOpen(true)}
                isSettingsModalOpen={isSettingsModalOpen}
                isLocalhost={isLocalhost}
            />
            <SettingsModal isOpen={isSettingsModalOpen} onClose={() => setSettingsModalOpen(false)}/>
        </>
    );
}

export default App;