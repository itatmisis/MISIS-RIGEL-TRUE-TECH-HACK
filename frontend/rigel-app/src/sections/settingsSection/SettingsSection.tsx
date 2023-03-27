import Section from "../../components/ui/Section";
import {useEffect, useState} from "react";
import styled from "styled-components";
import testColorBlindImage from "../../assets/images/testColors.jpg";
import Card, {CardContentWrapper} from "../../components/ui/Card";
import {Button, Pagination, Slider} from "antd";

const SettingsSection = () => {
    const [colorBlindMode, setColorBlindMode] = useState<'normal' | 'deuteranopia' | 'protanopia' | 'tritanopia'>('tritanopia');
    //интенсивность дальтонизма
    const [colorBlindIntensity, setColorBlindIntensity] = useState<number>(10); // 10 - 10


    return (
        <Section>
    <Card>
        <CardContentWrapper>
            <h2>Быстрая настройка</h2>
            <TestImage src={testColorBlindImage} alt={"Тест на дальтонизм"}/>
            <ControlWrapper>
            <div style={{display: 'flex', gap: '6px', alignItems: 'center'}}>
            <Button onClick={() => setColorBlindMode('normal')} {...colorBlindMode === 'normal' ? {type: 'primary'} : {}}>Обычный режим</Button>
            <Button onClick={() => setColorBlindMode('deuteranopia')} {...colorBlindMode === 'deuteranopia' ? {type: 'primary'} : {}}>Деутеранопия</Button>
            <Button onClick={() => setColorBlindMode('protanopia')} {...colorBlindMode === 'protanopia' ? {type: 'primary'} : {}}>Протанопия</Button>
                <Button onClick={() => setColorBlindMode('tritanopia')} {...colorBlindMode === 'tritanopia' ? {type: 'primary'} : {}}>Тританопия</Button>
            </div>
            {colorBlindMode !== 'normal' && <div style={{display: 'flex', gap: '6px', alignItems: 'center', height: '100%'}}>
                <p>Степень дальтонизма:</p>
                {Array.from({length: 10}, (_, i) => i + 1).map((i) => <Button onClick={() => setColorBlindIntensity(i)} {...colorBlindIntensity === i ? {type: 'primary'} : {}}>{i}</Button>)}
            </div>}
            </ControlWrapper>
        </CardContentWrapper>
    </Card>
        </Section>
    )
}


const TestImage = styled.img`
    width: 50%;
  height: auto;
    margin: 0 auto;
    border-radius: ${props => props.theme.cardBorderRadius};
    `


const ControlWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    gap: 1em;
    `

export default SettingsSection