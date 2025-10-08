import React from 'react';
import styled from 'styled-components';
import {AnimatePresence, motion} from 'framer-motion';
import {modalTexts, retirementGoals} from '../../../constants/modalTexts';
import {PrimaryButton} from '../shared';
import {GapChart} from '../../BarChart/BarChart';
import {useSettings} from "../../../utils/dx/settingsContext";
import {useCurrency} from "../../../hooks/useCurrency";

const StepContainer = styled.div` text-align: center; `;

const IntroText = styled.p` max-width: 400px;
    margin: 8px auto 24px; `;

const GoalButton = styled.button<{ $isSelected: boolean }>`
    background-color: ${({
                             theme,
                             $isSelected
                         }) => $isSelected ? theme.colors.secondaryAction : theme.colors.subtleBackground};
    border: 1px solid ${({theme, $isSelected}) => $isSelected ? theme.colors.primary : theme.colors.borders};
    color: ${({theme, $isSelected}) => $isSelected ? theme.colors.textHeadings : theme.colors.textBody};
    font-weight: ${({theme}) => theme.font.weights.medium};
    border-radius: ${({theme}) => theme.sizing.borderRadius.buttons};
    padding: 12px;
    font-size: ${({theme}) => theme.font.sizes.button};
    cursor: pointer;
    transition: all 0.2s;
    box-sizing: border-box;

    &:hover {
        border-color: ${({theme}) => theme.colors.primary};
    }
`;

const GoalButtonsWrapper = styled.div` display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    margin: 24px 0; `;
const GapDisplay = styled(motion.div)`
    margin: 16px 0;
    padding: 16px;
    background-color: ${({theme}) => theme.colors.errorTint};
    border: 1px solid ${({theme}) => theme.colors.error};
    border-radius: ${({theme}) => theme.sizing.borderRadius.cards};
`;
const GapLabel = styled.h3`
    margin: 0;
    color: ${({theme}) => theme.colors.error};
    font-size: ${({theme}) => theme.font.sizes.h3};
`;

interface Goal {
    label: string;
    amount: number;
}

interface Step2Props {
    projection: number;
    selectedGoal: Goal | null;
    onGoalSelect: (goal: Goal) => void;
    onNext: () => void;
    animationType: 'smooth' | 'pop';
}

export const Step2DefineGoal: React.FC<Step2Props> = ({
                                                          projection,
                                                          selectedGoal,
                                                          onGoalSelect,
                                                          onNext,
                                                          animationType
                                                      }) => {
    const {settings} = useSettings();
    const {formatCurrency} = useCurrency();
    const texts = modalTexts(settings.country).step2;
    const shortfall = selectedGoal ? selectedGoal.amount - projection : 0;

    return (
        <StepContainer>
            <motion.div initial={{opacity: 0}} animate={{opacity: 1}} transition={{delay: 0.3}}>
                <IntroText>{texts.initialAnalysis(formatCurrency(projection))}</IntroText>

                <AnimatePresence>
                    {selectedGoal && (
                        <motion.div
                            initial={{opacity: 0, y: 10}}
                            animate={{opacity: 1, y: 0}}
                            exit={{opacity: 0}}
                        >
                            <GapChart
                                projectionValue={projection}
                                newProjectionValue={projection}
                                goalValue={selectedGoal.amount}
                                animationType={animationType}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>

                <GoalButtonsWrapper>
                    <GoalButton $isSelected={selectedGoal?.label === retirementGoals.essential.label}
                                onClick={() => onGoalSelect(retirementGoals.essential)}>{retirementGoals.essential.label}</GoalButton>
                    <GoalButton $isSelected={selectedGoal?.label === retirementGoals.comfortable.label}
                                onClick={() => onGoalSelect(retirementGoals.comfortable)}>{retirementGoals.comfortable.label}</GoalButton>
                    <GoalButton $isSelected={selectedGoal?.label === retirementGoals.adventurous.label}
                                onClick={() => onGoalSelect(retirementGoals.adventurous)}>{retirementGoals.adventurous.label}</GoalButton>
                </GoalButtonsWrapper>
            </motion.div>

            <AnimatePresence>
                {selectedGoal && (
                    <motion.div initial={{opacity: 0, y: 10}} animate={{opacity: 1, y: 0}} exit={{opacity: 0}}>
                        <GapDisplay>
                            <GapLabel>{texts.gapLabel}: {formatCurrency(shortfall)}</GapLabel>
                        </GapDisplay>
                        <PrimaryButton style={{marginTop: '16px', width: '100%'}}
                                       onClick={onNext}>{texts.continueButton}</PrimaryButton>
                    </motion.div>
                )}
            </AnimatePresence>
        </StepContainer>
    );
};