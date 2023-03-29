import Section from "../../components/ui/Section";
import Card, {CardContentWrapper} from "../../components/ui/Card";
import OptionCardBackground from "../../assets/images/card-chs.svg";
import styled from "styled-components";
import eyeSettingsIcon from "../../assets/icons/eye.svg";
import colorSettingsIcon from "../../assets/icons/colorSetting.svg";


const SelectOptionsSection = () => {
    //scroll to class name section
    const scrollToSection = (className: string) => {
        const element = document.querySelector(className);
        if (element) {
            element.scrollIntoView({behavior: "smooth"});
        }
    }

    const scrollToEpilepsySection = () => {
        scrollToSection('.color-blind-settings-section');
    }

    const scrollToColorBlindSection = () => {
        scrollToSection('.epileptics-settings-section');
    }


    return (
        <Section className={"select-options-section"}>
            <Card style={{width: "100%"}}>
                <CardContentWrapper>
                    <h2>У вас есть проблемы с восприятием цвета или света?</h2>
                    <OptionCase>
                        <OptionsWrapper>
                            <OptionCard>
                                <SettingsButton onClick={scrollToEpilepsySection}>
                                    <SettingsIcon src={colorSettingsIcon} alt={"Настройки цветового восприятия"}/>
                                </SettingsButton>
                            </OptionCard>
                            <h3>Настроить
                                цветовосприятие</h3>
                            <p>Коррекция цвета, яркости и контраста изображения</p>
                        </OptionsWrapper>
                        <OptionsWrapper>
                            <OptionCard>
                                <SettingsButton onClick={scrollToColorBlindSection}>
                                    <SettingsIcon src={eyeSettingsIcon} alt={"Настройки цветочувствительности"}/>
                                </SettingsButton>
                            </OptionCard>
                            <h3>Включить
                                безопасный просмотр</h3>
                            <p>Маскирует опасное мерцание, вспышки, резкие переходы кадров</p>
                        </OptionsWrapper>
                    </OptionCase>
                </CardContentWrapper>
            </Card>
        </Section>
    );
}


const OptionCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 56px 48px;
  gap: 24px;
  max-width: 211px;
  max-height: 217px;
  width: 100%;
  height: 100%;
  //cover image
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  background-image: url(${OptionCardBackground});

`

const SettingsIcon = styled.img`
  width: 48px;
  height: 48px;
  object-fit: contain;
`


const OptionCase = styled.div`
  display: flex;
  flex-direction: row;
  gap: 128px;
  justify-content: center;
  align-items: start;
`

const SettingsButton = styled.button`
  width: 96px;
  height: 96px;
  background: #4F4BFF;
  border-radius: ${({theme}) => theme.sizes.borderRadius};
  display: flex;
  justify-content: center;
  align-items: center;
`


const OptionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1em;
  max-width: 322px;
  width: 100%;
  height: auto;
`

export default SelectOptionsSection