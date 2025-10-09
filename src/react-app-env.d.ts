export { };

declare global {
    interface Window {
        __SPNS__appConfig?: {
            userUid: string;
            userCn: string;
            userLocation: string;
            isEditor: string;
        };
    }
}