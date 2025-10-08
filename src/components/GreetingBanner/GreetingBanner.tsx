import React, {useEffect, useRef, useState} from 'react';
import styled, {css, keyframes} from 'styled-components';
import {greetingTexts} from '../../constants/greetings';
import AIIcon from '../../assets/icons/AIIcon';
import {useUserDetails} from '../../hooks/useUserDetails';
import {useParallax} from '../../hooks/useParallax';
import {fetchGovData, GovData} from '../../services/govApiService';
import {AiAssistantModal} from '../AiAssistantModal/AiAssistanModal';
import SettingsButton from "../../utils/dx/SettingsButton";

const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

const scaleIn = keyframes`
    from {
        transform: scale(0.8);
        opacity: 0;
    }
    to {
        transform: scale(1);
        opacity: 1;
    }
`;

const slideUpFadeIn = keyframes`
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

const textEntranceAnimation = css<{ $initialLoad: boolean }>`
    ${({$initialLoad}) =>
            !$initialLoad &&
            css`
                animation-name: ${slideUpFadeIn};
                animation-duration: 400ms;
                animation-timing-function: ease-out;
                animation-fill-mode: both;
            `}
`;

const Header = styled.header`
    background-color: ${({theme}) => theme.colors.background};
    border-bottom: 1px solid ${({theme}) => theme.colors.borders};
    padding: 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    animation: ${fadeIn} 200ms ease-out;
`;

const Avatar = styled.img<{ $initialLoad: boolean }>`
    width: 80px;
    height: 80px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid ${({theme}) => theme.colors.primary};
    box-sizing: border-box;
    transition: transform 0.1s ease-out;
    transform-style: preserve-3d;

    ${({$initialLoad}) =>
            !$initialLoad &&
            css`
                animation-name: ${scaleIn};
                animation-duration: 400ms;
                animation-timing-function: ease-out;
                animation-fill-mode: both;
            `}
`;

const UserInfo = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 24px;
    overflow: hidden;
`;

const Greeting = styled.h3<{ $initialLoad: boolean }>`
    margin: 0;
    font-size: ${({theme}) => theme.font.sizes.h3};
    color: ${({theme}) => theme.colors.textBody};
    font-weight: ${({theme}) => theme.font.weights.regular};
    animation-delay: 200ms;
    ${textEntranceAnimation};
`;

const UserName = styled.h1<{ $initialLoad: boolean }>`
    margin: 0;
    font-size: ${({theme}) => theme.font.sizes.h1};
    font-weight: ${({theme}) => theme.font.weights.bold};
    color: ${({theme}) => theme.colors.textHeadings};
    animation-delay: 300ms;
    ${textEntranceAnimation};
`;

const CustomerIdWrapper = styled.div<{ $isInteractive: boolean }>`
    margin-top: 4px;
    line-height: 1.4;
    position: relative;
    height: 1.4em;

    ${({$isInteractive}) =>
            $isInteractive &&
            css`
                cursor: pointer;
            `}
`;

const CustomerIdText = styled.p<{ $revealed: boolean; $initialLoad: boolean; }>`
    margin: 0;
    font-size: ${({theme}) => theme.font.sizes.subtext};
    color: ${({theme}) => theme.colors.textBody};
    opacity: ${({$revealed}) => ($revealed ? 0 : 1)};
    transition: opacity 0.2s ease-in-out;
    animation: ${({$initialLoad}) =>
            !$initialLoad ? slideUpFadeIn : 'none'} 400ms ease-out both;
    animation-delay: 400ms;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
`;

const AddressText = styled.p<{ $revealed: boolean }>`
    margin: 0;
    font-size: ${({theme}) => theme.font.sizes.subtext};
    color: ${({theme}) => theme.colors.textBody};
    opacity: ${({$revealed}) => ($revealed ? 1 : 0)};
    transition: opacity 0.2s ease-in-out;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
`;

const ActionButton = styled.button`
    background: none;
    cursor: pointer;
    padding: 8px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    position: relative;
    width: 56px;
    height: 56px;
    border: 1px solid ${({theme}) => theme.colors.borders};

    &:hover {
        background-color: ${({theme}) => theme.colors.primaryTint};
    }
`;

const NotificationBadge = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
    width: 8px;
    height: 8px;
    background-color: ${({theme}) => theme.colors.primary};
    border-radius: 50%;
    border: 1px solid ${({theme}) => theme.colors.background};
    box-sizing: border-box;
`;

const ProfileContainer = styled.div`
    display: flex;
    align-items: center;
    min-width: 0;
    perspective: 1000px;
`;

const ActionButtonsContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
`;

interface GreetingBannerProps {
    userName: string;
    customerId: string;
    userAddress: string;
    onSettingsClick: () => void;
    isSettingsModalOpen: boolean;
    isLocalhost: boolean;
}

const GreetingBanner: React.FC<GreetingBannerProps> = ({
                                                           userName,
                                                           customerId,
                                                           userAddress,
                                                           onSettingsClick,
                                                           isSettingsModalOpen,
                                                           isLocalhost
                                                       }) => {
    const [isAddressVisible, setIsAddressVisible] = useState(false);
    const [hasDoneEntrance, setHasDoneEntrance] = useState(false);
    const [govData, setGovData] = useState<GovData | null>(null);
    const [isAiModalOpen, setIsAiModalOpen] = useState(false);
    const [hasNotificationBeenSeen, setHasNotificationBeenSeen] = useState(false);

    const avatarRef = useRef<HTMLImageElement>(null);
    const parallaxTransform = useParallax(avatarRef, avatarRef);

    const {
        displayName,
        avatarUrl,
        displayCustomerId,
        displayUserAddress,
    } = useUserDetails(userName, customerId, userAddress);

    useEffect(() => {
        const entranceTimer = setTimeout(() => {
            setHasDoneEntrance(true);
        }, 2000);

        const getGovData = async () => {
            const data = await fetchGovData(userName);
            setGovData(data);
        };

        getGovData();

        return () => {
            clearTimeout(entranceTimer);
        };
    }, [userName]);

    const handleMouseEnter = () => {
        if (displayUserAddress) {
            setIsAddressVisible(true);
        }
    };

    const handleMouseLeave = () => {
        if (displayUserAddress) {
            setIsAddressVisible(false);
        }
    };

    const handleAiModalOpen = () => {
        if (govData) {
            setIsAiModalOpen(true);
            setHasNotificationBeenSeen(true);
        }
    };

    const handleAiModalClose = () => {
        setIsAiModalOpen(false);
    };

    return (
        <>
            <Header>
                <ProfileContainer>
                    <Avatar
                        ref={avatarRef}
                        src={avatarUrl}
                        alt="Profile"
                        $initialLoad={hasDoneEntrance}
                        style={{transform: parallaxTransform}}
                    />
                    <UserInfo>
                        <Greeting $initialLoad={hasDoneEntrance}>
                            {greetingTexts.welcomeBack}
                        </Greeting>
                        <UserName $initialLoad={hasDoneEntrance}>
                            {displayName}
                        </UserName>
                        {displayCustomerId && (
                            <CustomerIdWrapper
                                $isInteractive={!!displayUserAddress}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                            >
                                <CustomerIdText
                                    $revealed={isAddressVisible}
                                    $initialLoad={hasDoneEntrance}
                                >
                                    {greetingTexts.customerIdPrefix}
                                    {displayCustomerId}
                                </CustomerIdText>
                                <AddressText $revealed={isAddressVisible}>
                                    {displayUserAddress}
                                </AddressText>
                            </CustomerIdWrapper>
                        )}
                    </UserInfo>
                </ProfileContainer>
                <ActionButtonsContainer>
                    <ActionButton onClick={handleAiModalOpen}>
                        <AIIcon/>
                        {govData && !hasNotificationBeenSeen && <NotificationBadge/>}
                    </ActionButton>
                    <SettingsButton
                        isLocalhost={isLocalhost}
                        onClick={onSettingsClick}
                        isActive={isSettingsModalOpen}
                    />
                </ActionButtonsContainer>
            </Header>
            <AiAssistantModal
                isOpen={isAiModalOpen}
                onClose={handleAiModalClose}
                govData={govData}
            />
        </>
    );
};

export default GreetingBanner;