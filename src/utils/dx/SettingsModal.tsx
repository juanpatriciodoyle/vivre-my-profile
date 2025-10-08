import React, {useEffect, useState} from 'react';
import styled, {keyframes} from 'styled-components';
import {AnimatePresence, motion} from 'framer-motion';
import {X} from 'lucide-react';
import {useSettings} from './settingsContext';
import {Country, Settings, Theme} from './types';
import {MODAL_DATA} from './dx-data';
import {getFormGroups} from './formGroups';
import Text from '../../components/Text';

const ModalBackdrop = styled(motion.div)`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
`;

const ModalContent = styled(motion.div)`
    background: ${({theme}) => theme.colors.background};
    padding: 32px;
    border-radius: ${({theme}) => theme.sizing.borderRadius.cards};
    width: 100%;
    max-width: 400px;
    position: relative;
    border: 1px solid ${({theme}) => theme.colors.borders};
    box-sizing: border-box;
`;

const CloseButton = styled.button`
    position: absolute;
    top: 16px;
    right: 16px;
    background: none;
    border: none;
    cursor: pointer;
    color: ${({theme}) => theme.colors.textBody};
    box-sizing: border-box;
`;

const crissCrossLeft = keyframes`
    0% {
        left: -20px;
    }
    50% {
        left: 50%;
        width: 20px;
        height: 20px;
    }
    100% {
        left: 50%;
        width: 400px;
        height: 400px;
    }
`;

const crissCrossRight = keyframes`
    0% {
        right: -20px;
    }
    50% {
        right: 50%;
        width: 20px;
        height: 20px;
    }
    100% {
        right: 50%;
        width: 400px;
        height: 400px;
    }
`;

const SaveButton = styled.button`
    box-sizing: border-box;
    width: 100%;
    margin-top: 16px;
    background-color: transparent;
    color: ${({theme}) => theme.colors.primary};
    border: 1px solid ${({theme}) => theme.colors.primary};
    border-radius: ${({theme}) => theme.sizing.borderRadius.buttons};
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: color 0.6s ease-in-out;

    span {
        position: relative;
        z-index: 2;
    }

    &::before, &::after {
        content: '';
        position: absolute;
        top: 50%;
        width: 20px;
        height: 20px;
        background-color: ${({theme}) => theme.colors.primary};
        border-radius: 50%;
        z-index: 1;
    }

    &::before {
        left: -20px;
        transform: translate(-50%, -50%);
    }

    &::after {
        right: -20px;
        transform: translate(50%, -50%);
    }

    &:hover {
        color: ${({theme}) => theme.colors.background};

        &::before {
            animation: ${crissCrossLeft} 0.6s both;
        }

        &::after {
            animation: ${crissCrossRight} 0.5s both;
        }
    }
`;

const FormGroup = styled.div`
    margin-bottom: 24px;
`;

const FormLabel = styled.label`
    display: block;
    margin-bottom: 8px;
    font-size: ${({theme}) => theme.font.sizes.label};
    color: ${({theme}) => theme.colors.textBody};
`;

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({isOpen, onClose}) => {
    const {settings, setSettings} = useSettings();
    const [currentSelection, setCurrentSelection] = useState<Settings>(settings);

    useEffect(() => {
        if (isOpen) {
            setCurrentSelection(settings);
        }
    }, [settings, isOpen]);

    const handleSave = () => {
        setSettings(currentSelection);
        onClose();
    };

    const handleSettingChange = (key: keyof Settings, value: Theme | Country) => {
        setCurrentSelection((prev: Settings) => ({...prev, [key]: value}));
    };

    const formGroups = getFormGroups({currentSelection, handleSettingChange});

    return (
        <AnimatePresence>
            {isOpen && (
                <ModalBackdrop
                    onClick={onClose}
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                >
                    <ModalContent
                        onClick={(e: React.MouseEvent) => e.stopPropagation()}
                        initial={{y: -50, opacity: 0}}
                        animate={{y: 0, opacity: 1}}
                        exit={{y: 50, opacity: 0}}
                    >
                        <CloseButton onClick={onClose}><X/></CloseButton>
                        <Text as="h2" $variant="h2" style={{marginBottom: '32px'}}>
                            {MODAL_DATA.general.title}
                        </Text>

                        {formGroups.map((group) => (
                            <FormGroup key={group.id}>
                                <FormLabel>{group.label}</FormLabel>
                                {group.component}
                            </FormGroup>
                        ))}

                        <SaveButton onClick={handleSave}>
                            <span>{MODAL_DATA.general.saveButton}</span>
                        </SaveButton>
                    </ModalContent>
                </ModalBackdrop>
            )}
        </AnimatePresence>
    );
};

export default SettingsModal;