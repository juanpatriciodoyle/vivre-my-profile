import React, {useState} from 'react'
import GreetingBanner from './components/GreetingBanner/GreetingBanner'
import SettingsModal from './utils/dx/SettingsModal'
import {GlobalStyle} from './styles/globalStyles'

function App() {
    const [isSettingsModalOpen, setSettingsModalOpen] = useState(false)

    const isLocalhost = Boolean(
        window.location.hostname === 'localhost' ||
        window.location.hostname === '[::1]' ||
        window.location.hostname.match(
            /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/,
        ),
    )

    const userId = window.__SPNS__appConfig?.userUid || 'VIV-ACCOUNT-1'
    const userName = window.__SPNS__appConfig?.userCn || 'VIV-USERNAME-1'
    const userLocation = (
        window.__SPNS__appConfig?.userLocation || 'VIV-LOCATION-1'
    ).replace(/[[\]]/g, '')
    const isEditor = (window.__SPNS__appConfig?.isEditor || 'false') === 'true'

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
                isEditor={isEditor}
            />
            <SettingsModal
                isOpen={isSettingsModalOpen}
                onClose={() => setSettingsModalOpen(false)}
            />
        </>
    )
}

export default App