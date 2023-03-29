import Header from "./components/header/Header";
import {Main} from "./components/ui/main/Main";
import Footer from "./components/footer/Footer";
import PlayerSection from "./sections/playerSection/PlayerSection";
import WelcomeSection from "./sections/welcomeSection/WelcomeSection";
import SelectOptionsSection from "./sections/selectOptionsSection/SelectOptionsSection";
import SelectFilmSection from "./sections/selectFilmSection/SelectFilmSection";
import ColorBlindSettingsSection from "./sections/colorBlindSettingsSection/ColorBlindSettingsSection";
import ManualColorSettingsSection from "./sections/manualColorSettingsSection/ManualColorSettingsSection";
import {useState} from "react";
import EpilepticsSettingSection from "./sections/epilepticsSettingSection/EpilepticsSettingSection";
import IFilm from "./interfaces/IFilm";

function App() {
    const [selectedFilm, setSelectedFilm] = useState<IFilm | undefined>(undefined)

    return (
        <>
            <Header/>
            <Main>
                <WelcomeSection/>
                <SelectOptionsSection/>
                <ColorBlindSettingsSection/>
                <ManualColorSettingsSection/>
                <EpilepticsSettingSection/>
                <SelectFilmSection selectedFilm={selectedFilm} setSelectedFilm={setSelectedFilm}/>
                <PlayerSection selectedFilm={selectedFilm}/>
            </Main>
            <Footer/>
        </>
    )
}


export default App
