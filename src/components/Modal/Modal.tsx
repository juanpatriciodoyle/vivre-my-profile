import React, {ReactNode, useEffect, useRef} from 'react';
import ReactDOM from 'react-dom';
import styled, {keyframes} from 'styled-components';
import {useFocusTrap} from '../../hooks/useFocusTrap';

const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

const slideIn = keyframes`
    from {
        transform: translateY(30px) scale(0.98);
        opacity: 0;
    }
    to {
        transform: translateY(0) scale(1);
        opacity: 1;
    }
`;

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    animation: ${fadeIn} 0.3s ease-out;
`;

const ModalWrapper = styled.div`
    background: ${({theme}) => theme.colors.background};
    border-radius: ${({theme}) => theme.sizing.borderRadius.cards};
    padding: 32px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    width: 90%;
    max-width: 500px;
    box-sizing: border-box;
    animation: ${slideIn} 0.4s ease-out;
    position: relative;
`;

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({isOpen, onClose, children}) => {
    const modalRef = useRef<HTMLDivElement>(null);
    useFocusTrap(modalRef as React.RefObject<HTMLElement>, isOpen);

    useEffect(() => {
        const handleEscapeKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleEscapeKey);
        return () => {
            document.removeEventListener('keydown', handleEscapeKey);
        };
    }, [onClose]);

    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <ModalOverlay onClick={onClose}>
            <ModalWrapper ref={modalRef} onClick={(e) => e.stopPropagation()}>
                {children}
            </ModalWrapper>
        </ModalOverlay>,
        document.body
    );
};

export default Modal;