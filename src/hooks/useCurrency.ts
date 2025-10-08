import {useCallback} from 'react';
import {useSettings} from '../utils/dx/settingsContext';

export const useCurrency = () => {
    const {settings} = useSettings();
    const currencyCode = settings.country === 'IE' ? 'EUR' : 'GBP';
    const currencySymbol = settings.country === 'IE' ? '€' : '£';

    const formatCurrency = useCallback((value: number) => {
        return new Intl.NumberFormat(settings.country === 'IE' ? 'en-IE' : 'en-GB', {
            style: 'currency',
            currency: currencyCode,
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value);
    }, [settings.country, currencyCode]);

    return {formatCurrency, currencyCode, currencySymbol};
};