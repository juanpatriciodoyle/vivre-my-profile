import React from 'react';
import styled from 'styled-components';
import {motion, Variants} from 'framer-motion';
import {GovData} from '../../../services/govApiService';
import {modalTexts} from '../../../constants/modalTexts';
import RevenueIcon from '../../../assets/icons/RevenueIcon';
import DspIcon from '../../../assets/icons/DspIcon';
import GovBuildingIcon from '../../../assets/icons/GovBuildingIcon';
import {PrimaryButton} from '../shared';
import Tooltip from '../../InfoTooltip/InfoTooltip';
import {useSettings} from "../../../utils/dx/settingsContext";
import {useCurrency} from "../../../hooks/useCurrency";

const StepContainer = styled.div` text-align: center; `;
const Title = styled.h2` margin: 0 0 16px; `;
const IntroText = styled.p` margin: 0 0 24px; `;

const DataCard = styled(motion.div)`
    background-color: ${({theme}) => theme.colors.subtleBackground};
    border: 1px solid ${({theme}) => theme.colors.borders};
    border-radius: ${({theme}) => theme.sizing.borderRadius.cards};
    padding: 16px;
    text-align: left;
    margin-bottom: 16px;
`;

const SourceHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: ${({theme}) => theme.font.weights.semiBold};
    padding-bottom: 8px;
    margin-bottom: 8px;
    border-bottom: 1px solid ${({theme}) => theme.colors.borders};
`;

const DataRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: ${({theme}) => theme.font.sizes.body};
    padding: 8px 0;
`;

const DataLabelContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;

const DataLabel = styled.span` color: ${({theme}) => theme.colors.textBody}; `;
const DataValue = styled.span` font-weight: ${({theme}) => theme.font.weights.medium};
    color: ${({theme}) => theme.colors.textHeadings}; `;

const cardVariants: Variants = {
    hidden: {opacity: 0, y: -20},
    visible: (i: number) => ({
        opacity: 1, y: 0,
        transition: {delay: i * 0.2, duration: 0.4, ease: "easeInOut"},
    }),
};

const SecondaryActionLink = styled.a`
    display: block;
    margin-top: 16px;
    color: ${({theme}) => theme.colors.textBody};
    font-size: ${({theme}) => theme.font.sizes.subtext};
    text-decoration: underline;
    cursor: pointer;
    box-sizing: border-box;

    &:hover {
        color: ${({theme}) => theme.colors.textHeadings};
    }
`;

interface Step1Props {
    govData: GovData;
    onNext: () => void;
}

export const Step1VerifyData: React.FC<Step1Props> = ({govData, onNext}) => {
    const {settings} = useSettings();
    const {formatCurrency} = useCurrency();
    const texts = modalTexts(settings.country).step1;

    return (
        <StepContainer>
            <Title>{texts.title}</Title>
            <IntroText>{texts.intro}</IntroText>
            <DataCard custom={1} initial="hidden" animate="visible" variants={cardVariants}>
                <SourceHeader><RevenueIcon/><span>{texts.sourceRevenue}</span></SourceHeader>
                <DataRow>
                    <DataLabelContainer>
                        <DataLabel>{texts.incomeLabel}</DataLabel>
                        <Tooltip {...texts.tooltips.income} />
                    </DataLabelContainer>
                    <DataValue>{formatCurrency(govData.revenue.annualIncome)}</DataValue>
                </DataRow>
                <DataRow>
                    <DataLabelContainer>
                        <DataLabel>{texts.pensionContributionsLabel}</DataLabel>
                        <Tooltip {...texts.tooltips.income} />
                    </DataLabelContainer>
                    <DataValue>{formatCurrency(govData.revenue.pensionContributionsYTD)}</DataValue>
                </DataRow>
            </DataCard>
            <DataCard custom={2} initial="hidden" animate="visible" variants={cardVariants}>
                <SourceHeader><DspIcon/><span>{texts.sourceDsp}</span></SourceHeader>
                <DataRow>
                    <DataLabelContainer>
                        <DataLabel>{texts.statePensionLabel}</DataLabel>
                        <Tooltip {...texts.tooltips.dsp} />
                    </DataLabelContainer>
                    <DataValue>{formatCurrency(govData.socialProtection.projectedStatePension)} / week</DataValue>
                </DataRow>
            </DataCard>
            <DataCard custom={3} initial="hidden" animate="visible" variants={cardVariants}>
                <SourceHeader><GovBuildingIcon/><span>{texts.sourceRegistry}</span></SourceHeader>
                <DataRow><DataLabel>{texts.dependentsLabel}</DataLabel><DataValue>{govData.publicRegistry.dependents}</DataValue></DataRow>
            </DataCard>
            <motion.div initial={{opacity: 0}} animate={{opacity: 1}} transition={{delay: 1, duration: 0.5}}>
                <PrimaryButton style={{marginTop: '16px', width: '100%'}}
                               onClick={onNext}>{texts.confirmButton}</PrimaryButton>
                <SecondaryActionLink href="#"
                                     onClick={(e) => e.preventDefault()}>{texts.editDataLink}</SecondaryActionLink>
            </motion.div>
        </StepContainer>
    );
};