import React, {useEffect} from 'react';
import styled, {keyframes, useTheme} from 'styled-components';
import {motion, useSpring, useTransform} from 'framer-motion';

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
    overflow: visible;
`;

const Circle = styled(motion.circle)`
    stroke-width: 12;
    fill: transparent;
    stroke-linecap: round;
`;

const CircleBackground = styled(Circle)`
    stroke: ${({theme}) => theme.colors.borders};
`;

const pulse = keyframes`
    0%, 100% {
        filter: brightness(1);
    }
    50% {
        filter: brightness(1.2);
    }
`;

const CircleProgress = styled(Circle)<{ $usePulse?: boolean }>`
    animation: ${({$usePulse}) => $usePulse && pulse} 2s infinite ease-in-out;
`;

const PercentageTextContainer = styled(motion.div)`
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
    color: ${({theme}) => theme.colors.textHeadings};
`;

interface AnimatedCounterProps {
    value: number;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({value}) => {
    const motionValue = useSpring(0, {damping: 50, stiffness: 100});
    const rounded = useTransform(motionValue, (latest) => Math.round(latest));

    useEffect(() => {
        const timer = setTimeout(() => {
            motionValue.set(value);
        }, 500);

        return () => clearTimeout(timer);
    }, [value, motionValue]);

    return <motion.span>{rounded}</motion.span>;
};

interface ProgressRingProps {
    percentage: number;
}

export const ProgressRing: React.FC<ProgressRingProps> = ({percentage}) => {
    const theme = useTheme();
    const radius = 50;
    const center = 60;
    const circumference = 2 * Math.PI * radius;
    const isGoalMet = percentage >= 100;
    const progress = Math.min(percentage, 100);

    const progressValue = useSpring(0, {
        damping: 50,
        stiffness: 50,
    });

    useEffect(() => {
        progressValue.set(progress);
    }, [progress, progressValue]);

    const strokeDashoffset = useTransform(
        progressValue,
        [0, 100],
        [circumference, 0]
    );

    return (
        <RingWrapper>
            <Svg viewBox="0 0 120 120">
                <defs>
                    <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor={theme.colors.warning}/>
                        <stop offset="100%" stopColor={theme.colors.error}/>
                    </linearGradient>
                </defs>

                <CircleBackground cx={center} cy={center} r={radius}/>

                <CircleProgress
                    stroke="url(#progress-gradient)"
                    cx={center}
                    cy={center}
                    r={radius}
                    strokeDasharray={circumference}
                    style={{strokeDashoffset}}
                />

                {isGoalMet && (
                    <CircleProgress
                        $usePulse={true}
                        stroke={theme.colors.primaryHover}
                        cx={center}
                        cy={center}
                        r={radius}
                        strokeDasharray={circumference}
                        style={{strokeDashoffset: 0}}
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{delay: 3, duration: 0.5}}
                    />
                )}
            </Svg>
            <PercentageTextContainer
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{duration: 0.5}}
            >
                <AnimatedCounter value={percentage}/>%
            </PercentageTextContainer>
        </RingWrapper>
    );
};