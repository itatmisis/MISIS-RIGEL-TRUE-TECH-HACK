import Section from "../../components/ui/Section";
import styled from "styled-components";
import testColorBlindImage from "../../assets/images/testColors.jpg";
import Card, {CardContentWrapper, CardInfo} from "../../components/ui/Card";
import {Button, Switch} from "antd";
import TestImage from "../../components/ui/TestImage";
import {useColorBlind} from "../../providers/colorBlindProvider";
import {useOption} from "../../providers/optionProvider";

const ColorBlindSettingsSection = () => {
    const {setColorBlindMode, colorBlindMode, setColorBlindIntensity, colorBlindIntensity} = useColorBlind();
    const {isColorBlindMode, setIsColorBlindMode} = useOption();

    return (
        <Section className={"color-blind-settings-section"}>
            <Card>
                <CardContentWrapper>
                    <CardInfo>
                        <div>
                            <h2>Индивидуальные настройки</h2>
                            <p>Индивидуальные настройки цвета, яркости и контрастности изображения</p>
                        </div>
                        <Switch checked={isColorBlindMode} onChange={() => setIsColorBlindMode(!isColorBlindMode)}/>
                    </CardInfo>
                    <TestImage src={testColorBlindImage} alt={"Тест на дальтонизм"}/>
                    <ControlWrapper style={!isColorBlindMode ? {display: 'none'} : {}}>
                        <div style={{display: 'flex', gap: '6px', alignItems: 'center'}}>
                            <Button
                                onClick={() => setColorBlindMode('deuteranopia')} {...colorBlindMode === 'deuteranopia' ? {type: 'primary'} : {}}>Деутеранопия</Button>
                            <Button
                                onClick={() => setColorBlindMode('protanopia')} {...colorBlindMode === 'protanopia' ? {type: 'primary'} : {}}>Протанопия</Button>
                            <Button
                                onClick={() => setColorBlindMode('tritanopia')} {...colorBlindMode === 'tritanopia' ? {type: 'primary'} : {}}>Тританопия</Button>
                        </div>
                        <div style={{display: 'flex', gap: '6px', alignItems: 'center', height: '100%'}}>
                            <p>Степень дальтонизма:</p>
                            {Array.from({length: 10}, (_, i) => i + 1).map((i) => <Button
                                onClick={() => setColorBlindIntensity(i)} {...colorBlindIntensity === i ? {type: 'primary'} : {}}>{i}</Button>)}
                        </div>
                    </ControlWrapper>
                </CardContentWrapper>
            </Card>
        </Section>
    )
}


const ControlWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  gap: 1em;
  animation: ${props => props.theme.animation}
`

export default ColorBlindSettingsSection