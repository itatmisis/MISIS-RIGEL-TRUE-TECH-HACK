import Header from "./components/header/Header";
import {Main} from "./components/ui/main/Main";
import Footer from "./components/footer/Footer";
import FilmSection from "./sections/filmSection/FilmSection";
import styled from "styled-components";
import HelloSection from "./sections/helloSection/HelloSection";
import SelectOptionsSection from "./sections/selectOptionsSection/SelectOptionsSection";
import ContentSelectionSection from "./sections/contentSelectionSection/ContentSelectionSection";
import SettingsSection from "./sections/settingsSection/SettingsSection";
import ExtendedSettingsSection from "./sections/extendedSettingsSection/ExtendedSettingsSection";

function App() {
  return (
      <>
        <Header/>
        <Main>
            <HelloSection/>
            <SelectOptionsSection/>
            <SettingsSection/>
            <ExtendedSettingsSection/>
            <ContentSelectionSection/>
            <FilmSection/>
        </Main>
        <Footer/>
          </>
  )
}

const Section = styled.section`
display: flex;
flex-direction: column;
align-items: center;
`






export default App
