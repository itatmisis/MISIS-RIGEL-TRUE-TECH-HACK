import Section from "../../components/ui/Section";
import Card from "../../components/ui/Card";
import styled from "styled-components";
import helloCars from "../../assets/images/helloCars.png";
import helloGrass from "../../assets/images/helloGrass.jpg";
import helloConcert from "../../assets/images/helloCon.avif";
import helloCity from "../../assets/images/helloCity.avif";
const HelloSection = () => {
    return (
        <Section className={"hello-section"}>
            <Card>
                <ThreeGrid>
                    <div id={'col1'}><HelloBox>Выбираем способ решения проблемы</HelloBox>
                        <BaseHelloImg src={helloCars} alt="helloCars" style={{width: '100%', height: 'auto'}}/>
                    </div>
                    <div id={'col2'} style={{display: 'flex', flexDirection: 'column', gap: '6px'}}>
                        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px'}}>
                            <GrassImg src={helloGrass} alt="helloGrass"/>
                            <HelloBox style={{'height': '176px', width: '100%'}}>Настраиваем видео под свои потребности</HelloBox>
                        </div>
                        <ConcertImg src={helloConcert} alt="helloConcert"/>
                        <div style={{display: 'flex', justifyContent: 'center', height: '100%'}}>
                            <HelloBox style={{'height': '176px', width: '100%'}}>Получаем готовый видеофайл</HelloBox>
                            <GrassImg src={helloGrass} alt="helloGrass"/>
                        </div>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column', gap: '6px'}}>
                        <Col3Img src={helloCity} alt="helloCity"/>
                    </div>
                </ThreeGrid>
            </Card>
        </Section>
    );
}
const BaseHelloImg = styled.img`
border-radius: 8px;
object-fit: cover;
  filter: grayscale(100%);
    transition: cubic-bezier(0.4, 0, 0.2, 1) 0.3s;
  
    &:hover {
    filter: grayscale(0%);
    }
`

const ThreeGrid = styled.div`
    display: grid;
    grid-template-columns: min-content 1.5fr 1fr;
    grid-template-rows: auto 1fr auto;
    grid-gap: 6px;
    width: 100%;
    overflow: hidden;

`

const GrassImg = styled(BaseHelloImg)`
  height: 176px;
    width: auto;
`

const ConcertImg = styled(BaseHelloImg)`
  max-width: 540px;
  max-height: 405px;
  width: 100%;
  height: 100%;
  `


const HelloBox = styled.div`
    width: 100%;
    height: 100%;
    max-height: 176px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #FFFFFF;
    border: 1px solid #DECECE;
    border-radius: 48px;
    padding: 59px 46px;
    color: ${({theme}) => theme.colors.primary};
    font-size: ${({theme}) => theme.bigFont};
    font-weight: 500;
    line-height: 1.2;
    `


const Col3Img = styled(BaseHelloImg)`
    max-height: 850px;
    max-width: 400px;
    height: 100%;
    width: auto;
    object-fit: cover;
    position: relative;
    `








export default HelloSection