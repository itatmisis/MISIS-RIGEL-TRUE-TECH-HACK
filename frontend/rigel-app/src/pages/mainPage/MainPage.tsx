import styled from "styled-components";
import {Link} from "react-router-dom";

const MainPage = () => {
    return (
        <>
            <BigBanner/>
            <h2>Популятрно сейчас</h2>
            <FilmsContainer>
                <Link to={"/video"}>
                <BoJackFilmCard/>
                </Link>
                <FilmCard/>
                <FilmCard/>
                <FilmCard/>
                <FilmCard/>
                <FilmCard/>
            </FilmsContainer>
        </>
    )
}

export default MainPage


const BigBanner = styled.div`
    width: 100%;
    height: 240px;
    margin-bottom: 1rem;
    //background: ${(props) => props.theme.colors.secondary};
      background: url("https://htv-vsc.kion.ru:32125/CPS/images/universal/film/poster/202302/20230206/63/20230206163704707r0p.jpg?x=1800&y=900&ar=keepcrop=keep&quality=100");
        background-size: cover;
          background-position: center;
    border-radius: ${(props) => props.theme.sizes.borderRadius}
    `

const FilmCard = styled.div`
width: 178px;
height: 267px;
background: ${(props) => props.theme.colors.secondary};
border-radius: ${(props) => props.theme.sizes.borderRadius};
`

const BoJackFilmCard = styled(FilmCard)`
background: url("https://m.media-amazon.com/images/M/MV5BYWQwMDNkM2MtODU4OS00OTY3LTgwOTItNjE2Yzc0MzRkMDllXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg");
background-size: cover;
background-position: center;
`

const FilmsContainer = styled.div`
display: flex;
gap: 1rem;
justify-content: space-between;
  width: 100%;
`


