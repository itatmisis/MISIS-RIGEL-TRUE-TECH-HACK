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
import {useState} from "react";
import EpilepsySettingsSection from "./sections/epilepsySettingsSection/EpilepsySettingsSection";

function App() {
    const [selectedFilm, setSelectedFilm] = useState('')
    const [filmUrl, setFilmUrl] = useState('')

  return (
      <>
        <Header/>
        <Main>
            <HelloSection/>
            <SelectOptionsSection/>
            <SettingsSection/>
            <ExtendedSettingsSection/>
            <EpilepsySettingsSection/>
            <ContentSelectionSection selectedFilm={selectedFilm} setSelectedFilm={setSelectedFilm}/>
            <FilmSection filmUrl={filmUrl}/>
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
