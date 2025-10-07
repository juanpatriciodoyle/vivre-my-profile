import React, {useState} from 'react';
import styled from 'styled-components';
import {AnimatePresence, motion} from 'framer-motion';
import InfoIcon from '../../assets/icons/InfoIcon';

const TooltipWrapper = styled.div`
    position: relative;
    display: inline-flex;
    align-items: center;
    box-sizing: border-box;
`;

const TooltipContent = styled(motion.div)`
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    margin-bottom: 8px;
    background-color: ${({theme}) => theme.colors.subtleBackground};
    border: 1px solid ${({theme}) => theme.colors.borders};
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    padding: 12px;
    width: 250px;
    z-index: 1001;
    text-align: left;
    box-sizing: border-box;
`;

const TooltipHeader = styled.h4`
    margin: 0 0 8px;
    font-size: 14px;
    color: ${({theme}) => theme.colors.textHeadings};
`;

const TooltipBody = styled.p`
    margin: 0 0 12px;
    font-size: 13px;
    line-height: 1.5;
    color: ${({theme}) => theme.colors.textBody};
`;

const TooltipLink = styled.a`
    font-size: 13px;
    color: ${({theme}) => theme.colors.primary};
    text-decoration: none;
    font-weight: ${({theme}) => theme.font.weights.medium};

    &:hover {
        text-decoration: underline;
    }
`;

interface TooltipProps {
    title: string;
    content: string;
    link: string;
}

const Tooltip: React.FC<TooltipProps> = ({title, content, link}) => {
    const [isVisible, setIsVisible] = useState(false);

    const showTooltip = () => setIsVisible(true);
    const hideTooltip = () => setIsVisible(false);

    const tooltipVariants = {
        hidden: {opacity: 0, y: 10, transition: {duration: 0.2}},
        visible: {opacity: 1, y: 0, transition: {duration: 0.2}},
    };

    return (
        <TooltipWrapper onMouseEnter={showTooltip} onMouseLeave={hideTooltip}>
            <InfoIcon/>
            <AnimatePresence>
                {isVisible && (
                    <TooltipContent
                        variants={tooltipVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                    >
                        <TooltipHeader>{title}</TooltipHeader>
                        <TooltipBody>{content}</TooltipBody>
                        <TooltipLink href={link} target="_blank" rel="noopener noreferrer">
                            View Data API Documentation
                        </TooltipLink>
                    </TooltipContent>
                )}
            </AnimatePresence>
        </TooltipWrapper>
    );
};

export default Tooltip;