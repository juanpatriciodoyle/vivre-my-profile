import styled, {keyframes} from 'styled-components';

export const fadeIn = keyframes`
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

export const ModalHeader = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 24px;
    color: ${({theme}) => theme.colors.primary};
`;

export const Message = styled.h3`
    text-align: center;
    font-weight: ${({theme}) => theme.font.weights.regular};
    line-height: 1.6;
    margin: 0 0 24px;
`;

export const PrimaryButton = styled.button`
    background-color: ${({theme}) => theme.colors.primary};
    color: white;
    border: none;
    border-radius: ${({theme}) => theme.sizing.borderRadius.buttons};
    padding: 12px;
    font-size: ${({theme}) => theme.font.sizes.button};
    font-weight: ${({theme}) => theme.font.weights.medium};
    cursor: pointer;
    transition: background-color 0.2s;
    box-sizing: border-box;

    &:hover {
        background-color: ${({theme}) => theme.colors.primaryHover};
    }
`;

export const LiveIndicator = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    margin-top: 12px;
    font-size: 12px;
    color: ${({theme}) => theme.colors.textBody};
    animation: ${fadeIn} 0.5s 0.2s ease-out both;
`;