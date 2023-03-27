import {theme} from "../../styles/themes/main.theme";
import styled from "styled-components";

const Card = styled.div`
    background-color: ${(props) => props.theme.colors.secondary};
    border-radius: ${(props) => props.theme.sizes.cardBorderRadius};
    padding: ${(props) => props.theme.sizes.cardPadding};
    display: flex;
    width: 100%;
  display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const CardContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    gap: 3em;
    width: 100%;
    height: 100%;
    `

export default Card;
export {CardContentWrapper};
