import {RefObject, useEffect, useState} from 'react';

const MAX_ROTATION = 25;

export const useParallax = (
    listenerRef: RefObject<HTMLElement | null>,
    targetRef: RefObject<HTMLElement | null>
) => {
    const [transform, setTransform] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg)');

    useEffect(() => {
        const listenerElement = listenerRef.current;
        const targetElement = targetRef.current;

        if (!listenerElement || !targetElement) {
            return;
        }

        const handleMouseMove = (e: MouseEvent) => {
            const rect = listenerElement.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            const rotateY = (mouseX / rect.width - 0.5) * MAX_ROTATION * 2;
            const rotateX = (mouseY / rect.height - 0.5) * -MAX_ROTATION * 2;

            setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
        };

        const handleMouseLeave = () => {
            setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg)');
        };

        listenerElement.addEventListener('mousemove', handleMouseMove);
        listenerElement.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            listenerElement.removeEventListener('mousemove', handleMouseMove);
            listenerElement.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [listenerRef, targetRef]);

    return transform;
};