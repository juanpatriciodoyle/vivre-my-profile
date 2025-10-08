import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {SettingsProvider} from './utils/dx/settingsContext';
import {CustomThemeProvider} from "./contexts/ThemeContext";
import {DX_ATTRIBUTES} from "./utils/dx/dx-data";

const root = ReactDOM.createRoot(
    document.getElementById(DX_ATTRIBUTES.rootName) as HTMLElement
);
root.render(
    <React.StrictMode>
        <SettingsProvider>
            <CustomThemeProvider>
                <App/>
            </CustomThemeProvider>
        </SettingsProvider>
    </React.StrictMode>
);

reportWebVitals();