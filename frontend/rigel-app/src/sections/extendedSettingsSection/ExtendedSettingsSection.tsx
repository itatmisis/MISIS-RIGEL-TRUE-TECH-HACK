import Card, {CardContentWrapper, CardInfo} from "../../components/ui/Card";
import Section from "../../components/ui/Section";
import TestImage from "../../components/ui/TestImage";
import testImage from "../../assets/images/testColors.jpg";
import styled from "styled-components";
import {Button, Slider, Switch} from "antd";
import {useOption} from "../../providers/optionProvider";
import {useFilter} from "../../providers/filterProvider";

const ExtendedSettingsSection = () => {
    const { contrast, setContrast, brightness, setBrightness, saturation, setSaturation, hue, setHue, handleResetColors, getFilterEffect, isUsingFilter, setIsUsingFilter } = useFilter();
        return(
        <Section className={"select-options-section"}>
            <Card style={{width: "100%"}}>
                <CardContentWrapper>
                    <CardInfo>
                        <div>
                            <h2>Индивидуальные настройки</h2>
                            <p>Индивидуальные настройки цвета, яркости и контрастности изображения</p>
                        </div>
                        <Switch checked={isUsingFilter} onChange={() => setIsUsingFilter(!isUsingFilter)}/>
                    </CardInfo>
                    <TestImage src={testImage} alt={"Тест на дальтонизм"} style={{filter: getFilterEffect()}}/>
                    <ControlWrapper style={!isUsingFilter ? {display: 'none'} : {}}>
                        <p>Яркость</p>
                        <Slider defaultValue={brightness} step={0.01} min={0} max={2} onChange={(value) => setBrightness(value)}/>
                        <p>Контрастность</p>
                        <Slider defaultValue={contrast} step={0.01} min={0} max={2} onChange={(value) => setContrast(value)}/>
                        <p>Насыщенность</p>
                        <Slider defaultValue={saturation} step={0.01} min={0} max={2} onChange={(value) => setSaturation(value)}/>
                        <p>Оттенки</p>
                        <Slider defaultValue={hue} step={1} min={0} max={360} onChange={(value) => setHue(value)}/>\
                        <Button onClick={handleResetColors}>Сбросить настройки</Button>
                    </ControlWrapper>
                </CardContentWrapper>
            </Card>
        </Section>
    )
}

const ControlWrapper = styled.div`
    max-width: 70%;
    margin: 0 auto;
    width: 100%;
    display: grid;  
    grid-template-columns: 1fr 3fr;
    row-gap: 1em;
    text-align: start;
    transition: ${props => props.theme.transition};
`


export default ExtendedSettingsSection