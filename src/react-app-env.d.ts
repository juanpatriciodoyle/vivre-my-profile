export { };

declare global {
    interface Window {
        appConfig?: {
            userUid: string;
            userCn: string;
            userLocation: string;
        };
    }
}