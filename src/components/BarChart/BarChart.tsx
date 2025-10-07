import React from 'react';
import styled from 'styled-components';
import {motion, Transition} from 'framer-motion';
import {formatCurrency} from '../../utils/financialCalculations';

const ChartWrapper = styled.div`
    width: 100%;
    padding: 32px 0 24px;
    position: relative;
`;

const BarTrack = styled.div`
    width: 100%;
    height: 40px;
    background-color: ${({theme}) => theme.colors.errorTint};
    border-radius: 8px;
    position: relative;
    overflow: hidden;
    border: 1px solid ${({theme}) => theme.colors.primary};
`;

const BarFill = styled(motion.div)<{ $color: string; $zIndex?: number }>`
    height: 100%;
    background-color: ${({$color}) => $color};
    position: absolute;
    top: 0;
    left: 0;
    z-index: ${({$zIndex}) => $zIndex || 1};
`;

const GoalMarker = styled(motion.div)`
    position: absolute;
    top: -8px;
    bottom: -8px;
    width: 2px;
    background-color: ${({theme}) => theme.colors.error};
    z-index: 3;
`;

const GoalLabel = styled(motion.div)`
    position: absolute;
    top: -32px;
    transform: translateX(-50%);
    font-size: 12px;
    font-weight: bold;
    color: ${({theme}) => theme.colors.error};
    white-space: nowrap;
`;

const ValueLabel = styled(motion.span)`
    position: absolute;
    top: 50%;
    right: 12px;
    transform: translateY(-50%);
    font-weight: bold;
    color: white;
    font-size: 14px;
    z-index: 4;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.4);
`;

interface GapChartProps {
    projectionValue: number;
    newProjectionValue: number;
    goalValue: number;
    animationType?: 'smooth' | 'pop';
}

export const GapChart: React.FC<GapChartProps> = ({
                                                      projectionValue,
                                                      newProjectionValue,
                                                      goalValue,
                                                      animationType = 'smooth'
                                                  }) => {
    const maxValue = Math.max(projectionValue, newProjectionValue, goalValue) * 1.1;
    const theme = {colors: {primary: '#4f9a7c', error: '#d00a74'}};

    const goalPosition = (goalValue / maxValue) * 100;

    const smoothTransition: Transition = {duration: 0.3, ease: "easeOut"};
    const popTransition: Transition = {type: "spring", stiffness: 400, damping: 17};
    const barTransition = animationType === 'pop' ? popTransition : smoothTransition;
    const goalTransition: Transition = {duration: 0.8, ease: "easeOut"};

    return (
        <ChartWrapper>
            <BarTrack>
                <BarFill
                    $color={theme.colors.primary}
                    $zIndex={3}
                    initial={false}
                    animate={{width: `${(newProjectionValue / maxValue) * 100}%`}}
                    transition={barTransition}
                />
                <ValueLabel
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{delay: 0.5}}
                >
                    {formatCurrency(newProjectionValue)}
                </ValueLabel>
            </BarTrack>
            <GoalMarker
                animate={{left: `${goalPosition}%`}}
                transition={goalTransition}
            />
            <GoalLabel
                animate={{left: `${goalPosition}%`}}
                transition={goalTransition}
            >
                Goal: {formatCurrency(goalValue)}
            </GoalLabel>
        </ChartWrapper>
    );
};