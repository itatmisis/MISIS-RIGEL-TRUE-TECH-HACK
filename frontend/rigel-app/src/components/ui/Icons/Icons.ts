import styled from "styled-components";

export const Icon = styled.img`
    width: ${(props) => props.theme.sizes.icon};
    height: ${(props) => props.theme.sizes.icon};
    //invert colors
    filter: invert(100%);
    
    &:hover {
        cursor: pointer;
    }
`;
