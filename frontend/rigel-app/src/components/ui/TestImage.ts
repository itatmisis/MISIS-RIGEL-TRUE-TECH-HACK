import styled from "styled-components";

const TestImage = styled.img`
    width: 50%;
  height: auto;
    margin: 0 auto;
    border-radius: ${props => props.theme.cardBorderRadius};
    `

export default TestImage;