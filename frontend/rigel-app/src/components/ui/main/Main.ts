import styled from "styled-components";

export const Main = styled.main`
    max-width: ${(props) => props.theme.sizes.contentWidth};
    margin-inline: auto;
    padding: ${(props) => props.theme.sizes.padding};
    display: flex;
        height: 100%;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
        position: relative;
    gap: 5em;
        margin-top: 20px;
        `;

