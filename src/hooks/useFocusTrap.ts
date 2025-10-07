import {RefObject, useEffect} from 'react';

export const useFocusTrap = (ref: RefObject<HTMLElement | null>, isOpen: boolean) => {
    useEffect(() => {
        if (!isOpen || !ref.current) return;

        const focusableElements = ref.current.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        const handleTabKeyPress = (e: KeyboardEvent) => {
            if (e.key !== 'Tab') return;

            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement?.focus();
                }
            } else {
                if (document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement?.focus();
                }
            }
        };

        firstElement?.focus();
        const currentRef = ref.current;
        currentRef.addEventListener('keydown', handleTabKeyPress);

        return () => {
            currentRef?.removeEventListener('keydown', handleTabKeyPress);
        };
    }, [isOpen, ref]);
};