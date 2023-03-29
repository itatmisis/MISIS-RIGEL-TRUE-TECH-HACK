import Card, {CardContentWrapper, CardInfo} from "../../components/ui/Card";
import Section from "../../components/ui/Section";
import TestImage from "../../components/ui/TestImage";
import testImage from "../../assets/images/testColors.jpg";
import styled from "styled-components";
import {Button, Slider, Switch} from "antd";
import {useFilter} from "../../providers/filterProvider";

const ManualColorSettingsSection = () => {
    const {
        contrast,
        setContrast,
        brightness,
        setBrightness,
        saturation,
        setSaturation,
        hue,
        setHue,
        handleResetColors,
        getFilterEffect,
        isUsingFilter,
        setIsUsingFilter
    } = useFilter();
    return (
        <Section className={"manual-color-settings-section"}>
            <Card>
                <CardContentWrapper>
                    <CardInfo>
                        <div>
                            <h2>Индивидуальные настройки</h2>
                            <p>Индивидуальные настройки цвета, яркости и контрастности изображения</p>
                        </div>
                        <Switch checked={isUsingFilter} onChange={() => setIsUsingFilter(!isUsingFilter)}/>
                    </CardInfo>
                    <div style={!isUsingFilter ? {display: 'none'} : {}}>
                        <TestImage src={testImage} alt={"Тест на дальтонизм"} style={{filter: getFilterEffect()}}/>
                        <ControlWrapper>
                            <p>Яркость</p>
                            <Slider defaultValue={brightness} step={0.01} min={0} max={2} value={brightness}
                                    onChange={(value) => setBrightness(value)}/>
                            <p>Контрастность</p>
                            <Slider defaultValue={contrast} step={0.01} min={0} max={2} value={contrast}
                                    onChange={(value) => setContrast(value)}/>
                            <p>Насыщенность</p>
                            <Slider defaultValue={saturation} step={0.01} min={0} max={2} value={saturation}
                                    onChange={(value) => setSaturation(value)}/>
                            <p>Оттенки</p>
                            <Slider defaultValue={hue} step={1} min={0} max={360} onChange={(value) => setHue(value)}
                                    value={hue}/>
                        </ControlWrapper>
                        <div style={{width: '100%', display: 'flex', justifyContent: 'center', marginTop: '1em'}}>
                            <Button onClick={handleResetColors} type={"primary"}>Сбросить</Button>
                        </div>
                    </div>
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


export default ManualColorSettingsSection