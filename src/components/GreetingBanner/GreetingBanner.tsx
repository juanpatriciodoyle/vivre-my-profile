import React, {useEffect, useState} from 'react';
import styled, {css, keyframes} from 'styled-components';
import {greetingTexts} from '../../constants/greetings';
import pencilIcon from '../../assets/icons/pencil.svg';
import Tooltip from '../Tooltip/Tooltip';

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
    ${({$initialLoad}) => !$initialLoad && css`
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

    ${({$initialLoad}) => !$initialLoad && css`
        animation-name: ${scaleIn};
        animation-duration: 400ms;
        animation-timing-function: ease-out;
        animation-fill-mode: both;
    `}
    &:hover {
        box-shadow: 0 0 10px ${({theme}) => theme.colors.primary};
    }
`;

const UserInfo = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 24px;
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

const CustomerId = styled.p<{ $initialLoad: boolean }>`
    margin: 4px 0 0;
    font-size: ${({theme}) => theme.font.sizes.subtext};
    color: ${({theme}) => theme.colors.textBody};
    animation-delay: 400ms;
    ${textEntranceAnimation};
`;

const ActionButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: auto;
    box-sizing: border-box;

    &:hover {
        background-color: ${({theme}) => theme.colors.secondaryAction};
    }

    img {
        width: 24px;
        height: 24px;
    }
`;

const ProfileContainer = styled.div`
    display: flex;
    align-items: center;
    position: relative;
`;

interface GreetingBannerProps {
    userName: string;
    customerId: string;
    userAddress: string;
}

const GreetingBanner: React.FC<GreetingBannerProps> = ({userName, customerId, userAddress}) => {
    const [showTooltip, setShowTooltip] = useState(false);
    const [hasDoneEntrance, setHasDoneEntrance] = useState(false);

    useEffect(() => {
        const entranceTimer = setTimeout(() => {
            setHasDoneEntrance(true);
        }, 2000);

        return () => {
            clearTimeout(entranceTimer);
        };
    }, []);

    const handleMouseEnter = () => setShowTooltip(true);
    const handleMouseLeave = () => setShowTooltip(false);

    return (
        <Header>
            <ProfileContainer onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <Avatar
                    src={'https://vivre.woodburn.digital/dx/api/dam/v1/collections/b5ada47f-3a8d-42e9-b3c2-6a436f3359e3/items/6adba40e-4c02-4122-925c-4014c7421d17/renditions/2ec7d776-c9d9-40c9-83cc-1558e7896ba6?binary=true'}
                    alt="Profile"
                    $initialLoad={hasDoneEntrance}
                />
                <UserInfo>
                    <Greeting $initialLoad={hasDoneEntrance}>{greetingTexts.welcomeBack}</Greeting>
                    <UserName $initialLoad={hasDoneEntrance}>
                        {userName}
                    </UserName>
                    <CustomerId $initialLoad={hasDoneEntrance}>{greetingTexts.customerIdPrefix}{customerId}</CustomerId>
                </UserInfo>
                <Tooltip text={userAddress} isVisible={showTooltip}/>
            </ProfileContainer>
            <ActionButton>
                <img src={pencilIcon} alt="Edit Profile"/>
            </ActionButton>
        </Header>
    );
};

export default GreetingBanner;