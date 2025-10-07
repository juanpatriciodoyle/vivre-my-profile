import React from 'react';
import styled from 'styled-components';
import {motion} from 'framer-motion';

const RingWrapper = styled.div`
    position: relative;
    width: 150px;
    height: 150px;
    margin: 24px auto;
`;

const Svg = styled.svg`
    width: 100%;
    height: 100%;
    transform: rotate(-90deg);
`;

const Circle = styled(motion.circle)`
    stroke-width: 12;
    fill: transparent;
`;

const CircleBackground = styled(Circle)`
    stroke: ${({theme}) => theme.colors.borders};
`;

const CircleProgress = styled(Circle)<{ $isGoalMet: boolean }>`
    stroke: ${({theme, $isGoalMet}) => $isGoalMet ? theme.colors.success : theme.colors.error};
    stroke-linecap: round;
`;

const CircleSparkle = styled(Circle)`
    stroke: white;
    stroke-width: 2;
`;

const PercentageText = styled(motion.div)`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28px;
    font-weight: ${({theme}) => theme.font.weights.bold};
`;

interface ProgressRingProps {
    percentage: number;
}

export const ProgressRing: React.FC<ProgressRingProps> = ({percentage}) => {
    const radius = 50;
    const circumference = 2 * Math.PI * radius;
    const progress = Math.min(percentage, 100);
    const strokeDashoffset = circumference - (progress / 100) * circumference;
    const isGoalMet = percentage >= 100;

    return (
        <RingWrapper>
            <Svg viewBox="0 0 120 120">
                <CircleBackground cx="60" cy="60" r={radius}/>
                <CircleProgress
                    $isGoalMet={isGoalMet}
                    cx="60"
                    cy="60"
                    r={radius}
                    strokeDasharray={circumference}
                    initial={{strokeDashoffset: circumference}}
                    animate={{strokeDashoffset}}
                    transition={{duration: 1, ease: 'easeOut'}}
                />
                {isGoalMet && (
                    <CircleSparkle
                        cx="60" cy="60" r={radius}
                        strokeDasharray="1 15"
                        initial={{pathLength: 0, opacity: 1}}
                        animate={{pathLength: 1}}
                        transition={{duration: 0.5, ease: 'easeIn', delay: 0.8}}
                    />
                )}
            </Svg>
            <PercentageText
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{duration: 0.5, delay: 0.5}}
            >
                {Math.round(percentage)}%
            </PercentageText>
        </RingWrapper>
    );
};