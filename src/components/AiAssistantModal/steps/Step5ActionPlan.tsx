import React from 'react';
import styled from 'styled-components';
import {motion} from 'framer-motion';
import {modalTexts} from '../../../constants/modalTexts';
import {PrimaryButton} from '../shared';
import PhoneIcon from '../../../assets/icons/PhoneIcon';
import DocumentIcon from '../../../assets/icons/DocumentIcon';
import NewBankIcon from '../../../assets/icons/NewBankIcon';
import {useSettings} from "../../../utils/dx/settingsContext";
import {useCurrency} from "../../../hooks/useCurrency";

const StepContainer = styled(motion.div)` text-align: center; `;
const Title = styled.h2` margin: 0 0 16px; `;
const IntroText = styled.p` margin: 0 0 24px; `;

const ActionCard = styled(motion.div)`
    background-color: ${({theme}) => theme.colors.subtleBackground};
    border: 1px solid ${({theme}) => theme.colors.borders};
    border-radius: ${({theme}) => theme.sizing.borderRadius.cards};
    padding: 16px;
    text-align: left;
    margin-bottom: 16px;
`;

const ActionHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    font-weight: ${({theme}) => theme.font.weights.semiBold};
    font-size: 16px;
    color: ${({theme}) => theme.colors.textHeadings};
`;

const ActionLinks = styled.div`
    display: flex;
    gap: 24px;
    margin-top: 16px;
    padding-top: 16px;
    border-top: 1px solid ${({theme}) => theme.colors.borders};
`;

const ActionLink = styled.a`
    color: ${({theme}) => theme.colors.primary};
    text-decoration: none;
    font-weight: ${({theme}) => theme.font.weights.medium};

    &:hover {
        text-decoration: underline;
    }
`;

interface Step5Props {
    plan: {
        contributionIncrease: number;
        strategy: 'balanced' | 'aggressive';
        includeDormant: boolean;
    };
    onClose: () => void;
    initialProjection: number;
}

export const Step5ActionPlan: React.FC<Step5Props> = ({plan, onClose, initialProjection}) => {
    const {settings} = useSettings();
    const {formatCurrency} = useCurrency();
    const texts = modalTexts(settings.country).step5;
    const noActionTaken = plan.contributionIncrease === 0 && plan.strategy === 'balanced' && !plan.includeDormant;

    if (noActionTaken) {
        return (
            <StepContainer initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 0.5, delay: 0.3}}>
                <Title>{texts.zeroAction.title}</Title>
                <IntroText>{texts.zeroAction.intro(formatCurrency(initialProjection))}</IntroText>
                <ActionCard>
                    <ActionHeader>
                        <span>{texts.zeroAction.action}</span>
                    </ActionHeader>
                </ActionCard>
                <PrimaryButton style={{marginTop: '32px'}} onClick={onClose}>{texts.zeroAction.button}</PrimaryButton>
            </StepContainer>
        )
    }

    return (
        <StepContainer initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 0.5, delay: 0.3}}>
            <Title>{texts.title}</Title>
            <IntroText>{texts.intro}</IntroText>

            {plan.contributionIncrease > 0 && (
                <ActionCard>
                    <ActionHeader><NewBankIcon/>
                        <span>{texts.contributionAction(formatCurrency(plan.contributionIncrease))}</span></ActionHeader>
                </ActionCard>
            )}

            {plan.includeDormant && (
                <ActionCard>
                    <ActionHeader><PhoneIcon/> <span>{texts.consolidationAction}</span></ActionHeader>
                    <ActionLinks><ActionLink href="tel:+35312345678">{texts.phoneLink}</ActionLink></ActionLinks>
                </ActionCard>
            )}

            {plan.strategy === 'aggressive' && (
                <ActionCard>
                    <ActionHeader><DocumentIcon/> <span>{texts.strategyAction}</span></ActionHeader>
                    <ActionLinks><ActionLink href="#" target="_blank">{texts.articleLink}</ActionLink></ActionLinks>
                </ActionCard>
            )}

            <PrimaryButton style={{marginTop: '32px'}} onClick={onClose}>{texts.finishButton}</PrimaryButton>
        </StepContainer>
    );
};