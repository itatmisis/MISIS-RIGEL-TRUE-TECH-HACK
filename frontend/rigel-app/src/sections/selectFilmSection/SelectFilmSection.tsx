import Section from "../../components/ui/Section";
import Card, {CardContentWrapper} from "../../components/ui/Card";
import styled from "styled-components";
import IFilm from "../../interfaces/IFilm";



const films = [
    {
        img: 'https://i-viaplay-com.akamaized.net/viaplay-prod/771/672/1473257890-66ec43721fe0fd0073af100473a09da74924816c.jpg?width=400&height=600',
        title: 'Криминальное чтиво',
        director: 'Квентин Тарантино',
        streamUrl: 'https://www.youtube.com/watch?v=ewlwcEBTvcY'
    },
    {
        img: 'https://m.media-amazon.com/images/M/MV5BY2RkY2M2N2QtZGY5ZS00YmVjLThmNTItY2ZkM2JlYmFhZWQyXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_FMjpg_UX1000_.jpg',
        title: 'Cтрах и ненависть в Лас-Вегасе',
        director: 'Квентин Тарантино',
        streamUrl: 'https://www.youtube.com/watch?v=ewlwcEBTvcY'
    },
    {
        img: 'https://upload.wikimedia.org/wikipedia/ru/6/69/%D0%9B%D0%B5%D0%B2%D0%B8%D0%B0%D1%84%D0%B0%D0%BD_%D0%BA%D0%B0%D0%B4%D1%80.jpg',
        title: 'Левиафан',
        director: 'Звягинцев Александр',
        streamUrl: 'https://www.youtube.com/watch?v=ewlwcEBTvcY'
    },
    {
        img: 'https://kinopoisk-ru.clstorage.net/3a04FL320/f1d856voW01g/4MpyWXbSjh9TYI_Dj9rtWUY5O3dEVNMEJW_cgwTLQsdHRfYcaC6s4L1g4U8QMVWea6SBJ2uWVXRyHtA_Sb-JQNGvV6hnogsat6Sf8zqKnJ3zjC-j8NHnRfRa2Wb2OEBEZdLUf5qsriapVOUulQSwSmrERKNeEpEQZT0RTw5pPkOx6zH6MxLsbRaBfsN8m-_cxgkpEIcWcDAFnBwRlZkwddcyR9zpb7-Ui0b2GwfncBnaRMSw7jczk8ZMx58P6F6CIAsTKtFw3__HkHxznPiczrSJyoI2Z-Ky1y3s4UVZQTQ1U8Zc-s-P5gqn1IlFFaJo6JRHAU7kImJUTGYuXSncMZIr8UlCsh985wMPUCyb_6z1qHiR1xYgInd9fqB0qwLH9oPGf-r_nKb4Fdd4RpRAychXxyJ8d2JglKzGDr2oDhBSqnELUsHdPcbjPvOPiY5dBOm7ModmIgDUzS1DtGuAdsehRp0Yng_U27Sl2BQloFqJt9SQjvbTQWXOln2cml7y0bgxSdFgnt_0sV9AD4n-rRXoewF3BCPARr7dEmaqk2bWo1cNuh_sxVmlBqsG5pPoeUaEEi-kw3J0raUefhj8UeMr8uiCA9yedbO_8myr7B7GeukzJgZyEjedbgGXCaJmtoFHrBod3kSohdV69STw-OkUBxF9JxAjFOwm7E2JDIGD-HMawZM-ffUiHZD_K_2vVKpqAOUk0mKX_HxRZEmDZUciJj37b55W-nc1-3a2sTgbNbSTLTSgsiT_560N-T0gM_lCG-DwLG0lso2yTThsTbQZ-0ElZ4Ihhz194eZp01dUk0RMyR48ddmnZOkl9OKYiZXVEH-WoHO33jWsjcuNEXMbEdgw0N48JbEugf757lzHWRtRd0aTENRP_POXiqPFFuIGTulvfcSbhJdr1sVwWwt0xnDuNUJgd9y07yxo3qGg2BOqEIMu3Kdz7bH-qc-MBdoKEiZWMwNWjnwSxzghZMUBR4-Lrh40qWfUqqXHgypIRdaw3_QAYCR9xNxe29zhYWhxyiCzT_4koQzS_NrNvvdJymL1dCJz9T7O8JRYwoY202XN2GyM59q1RPoVZrG4KsaVoszW8UH1bnYdbks8ohCLQHqAcmze98J8gk7ZvP91yGlyhIWj4mcP7XGmWtEGl2PUHemvvRYolIXZ9-aS6Zu31OHNtPBx1H5UDl7oPWBB-cGYcoCcLRURjxBf-h9Plms5opUXgFAk3_yzlTnRVPegh655beyle7Tk63YkQ8rYZyWx_BUQ4eVNxZxO-AzywdrBSeNyTu60oX7yz-qOHwQJyyDUZsECdoxdYMcr8_YlAZROyI3vxuqn1Do0lVKLuaR2ch3kImP33GU_7vs8cNLIUchyk3ysRaFPc77LPawF--tg5WezYZZOXTCHqvH2p9OUDYh8jsfrJzTb9LbhqPpW1SIe5zKB1VyFbm_LLmJhunBKcNLubudh7cE-ySxcl7sLksR3InG3HhwxdZuR1UVzB8_7TJ_UOQTWGCWWgcpblaaw7yUTYWZups0uWt7QQspASnDyvj33YX3i79oOLIYISPI2lMNyZe0vccd5wxYnERXs2S6edxh1x9ikxxKJ2JcWIx7U8UG2HpTeXukMIJIqwlrAUC4sNoBucx7on40WWhlRpPYwUueNjREmmvCX1WGmb9idz5YbNYboVQZjC4k0dWL-d9DiRlykLD67TqCxC8PbIaCOjDWgbSPuy55dligY4ZVFkSJXvgzzF-uANkfSFy7Zr-3ki1d0O3fUQou49GRg7ETAs8ROVO69Kd5SoSvyawLzTv_FUryh31oeT1QIGvC1ZkLSRS7fM2TLkQd1YRTtmi4v9ll05At3RAG4uebnA83VYTP1jbdeTthvoOCowcgAIS7ulXGPEH_4rJzEm-kyxafAI7U-foC3uqNmh2AHDtpsf9ZpBaQqFcaxi-rmJPDftyNStU42HGy5LzJwq2P4kOKPXSUjrWLu6A9d5lmZQ6angyCHbsxxVwoSlMZxx40rD76XGrdmGkbEYjrZ9heiTuVjcJdfpcwMaiySgrjS6VBDbx4nAJ1jjjrMLSRpiJDXVSLTd-8MwyepM3TmUcXcqwxvpsiV5mhllpC7iVZHst4XI5IFbgfNb-lscILbQfsAAowfZUN9kn7YX3_me9gB1MZz4bfNjeGU-zL0VLGUXkrcPGbpVqYKpMSSaltWpwEt5NOzBo733Cy4X5IhOzG5UiNf3SaxrQJ_CP4P5Ul7I0T1gxG0jT8ihNmilXcRth_5LmxXKAWkqAV3YTnJ5cUTHldi8xbsxT1sC6xhYdiASSKQL861ck6j39jer_Q6yEKXhHCCF78OwWbLY8QHYQQuyQ-uhIpkl0gmFSCbuTTWkS80EqIHrXQdXFnNo3NoMBhjMS7_dJEv8Ayp_P82u_rgJJeTUVf-fLF0avEE5PIG7jicP5S6FBSYxrVju7tWRGN-tKATtL1Ez44prBHx-HLbYvH-bAdQXZOfK5_9lrsZYcQGYRLVzF8hZpjytiSiNK55Ti3FSMYEaAUEcGnZVqbAnFUQ05Y9x3w82tzwYrjxONCC3PyUkjxzj6jfTOYqWhAlZFHDxv38o2apEGU3MQUuqwxsJdr01Uq0hNMJyqcmkI7WwSBX3CUdzvovcZDJQjhysJ9NRfNtIZ0oz-_mS7tDFMRgw1b-3FE1uoKHZpJmbEldTJXod8cYJ8UCWzrWhqItBkBBpf43zX6YXjChqEPaYzM_X2QQPpINuR6_Foj7YUeEoVBlLCwDFauCh3TiJE2aTl4UqVdFe2dXIYmbNOcSnmYSs9XetR_POhxhw5njWODQfR9n0n_g_2nv75X7ubLEFRExxz58gOSIg9UlAIQc6x6PxitUFmt1dhCKyLR2wg-UUMMGTPbfnEgMs2FqAhtQYj19dOGe4z1YXb_G-AqRNpfAcrUMb2OXKWAUlOOHzql-vsaZZ3YZB3cxCbtFJ7N-RQCR8',
        title: 'Как Витька Чеснок вёз Лёху Штыря в дом инвалидов',
        director: 'Александр Хант',
    }] as IFilm[];


interface ISelectFilmSection {
    selectedFilm?: IFilm,
    setSelectedFilm: (film: IFilm) => void
}
const SelectFilmSection = (props: ISelectFilmSection) => {
    const {selectedFilm, setSelectedFilm} = props
    const handleFilmClick = (film: IFilm) => {
        setSelectedFilm(film);
        //scroll to player section after 0.5s
        setTimeout(() => {
            const playerSection = document.querySelector('.player-section')
            if (playerSection) {
                playerSection.scrollIntoView({behavior: 'smooth'})
            }
        }, 500)
    }

    return (
        <Section>
            <Card>
                <CardContentWrapper>
                    <h2>Выберите фильм</h2>
                    <FilmsContainer>
                        {films.map((film) =>
                            <div style={selectedFilm?.title === film.title ? {border: '2px solid #FFC107'} : {}}>
                            <FilmCard {...film} onClick={() => handleFilmClick(film)}/>
                            </div>
                        )}
                    </FilmsContainer>
                </CardContentWrapper>
            </Card>
        </Section>
    );
}
export default SelectFilmSection


const FilmsContainer = styled.div`
  //with horizontal scroll
  display: flex;
  flex-direction: row;
  overflow-x: auto;
  overflow-y: hidden;
  gap: 6px;
  padding: 6px;
  width: 100%;
  height: 100%;
`

interface IFilmCard {
    img: string
    title: string
    director: string
    streamUrl: string
    onClick: () => void
}


const FilmCard = (props: IFilm) => {
    const {img, title, director} = props
    return (
        <FilmContainer onClick={props.onClick}>
            <FilmPoster src={img} alt={title}/>
            <FilmTitle>{title}</FilmTitle>
            <FilmDirector>{director}</FilmDirector>
        </FilmContainer>
    )
}

const FilmContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-content: start;
  gap: 6px;
  width: 249px;
  height: auto;
  cursor: pointer;
`

const FilmPoster = styled.img`
  width: 249px;
  height: 373.5px;
  border-radius: 16px;
  object-fit: cover;
`
const FilmTitle = styled.h3`
  justify-self: start;
  font-size: ${({theme}) => theme.sizes.font};
  font-weight: 800;
  line-height: 1.2;
  color: ${({theme}) => theme.colors.primary};
`

const FilmDirector = styled.p`
  font-size: ${({theme}) => theme.sizes.font};
  font-weight: 500;
  line-height: 1.2;
  color: ${({theme}) => theme.colors.primary};
`
