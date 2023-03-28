import Section from "../../components/ui/Section";
import Card, {CardContentWrapper} from "../../components/ui/Card";
import styled from "styled-components";


interface IContentSelectionSection {
    selectedFilm: string
    setSelectedFilm: (value: string) => void
}

const ContentSelectionSection = (props: IContentSelectionSection) => {
    const {selectedFilm, setSelectedFilm} = props
    return (
        <Section>
           <Card>
               <CardContentWrapper>
               <h2>Выберите фильм</h2>
                <FilmsContainer>
                    <FilmCard img={'https://i-viaplay-com.akamaized.net/viaplay-prod/771/672/1473257890-66ec43721fe0fd0073af100473a09da74924816c.jpg?width=400&height=600'} title={'Криминальное чтиво'} director={'Квентин Тарантино'} onClick={() => setSelectedFilm('Криминальное чтиво')}/>
                    <FilmCard img={'https://m.media-amazon.com/images/M/MV5BY2RkY2M2N2QtZGY5ZS00YmVjLThmNTItY2ZkM2JlYmFhZWQyXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_FMjpg_UX1000_.jpg'} title={'Cтрах и ненависть в Лас-Вегасе'} director={'Квентин Тарантино'} onClick={() => setSelectedFilm('Cтрах и ненависть в Лас-Вегасе')}/>
                    <FilmCard img={'https://www.kinopoisk.ru/images/film_big/104.jpg'} title={'Криминальное чтиво'} director={'Квентин Тарантино'} onClick={() => setSelectedFilm('Криминальное чтиво')}/>
                    <FilmCard img={'https://www.kinopoisk.ru/images/film_big/104.jpg'} title={'Криминальное чтиво'} director={'Квентин Тарантино'} onClick={() => setSelectedFilm('Криминальное чтиво')}/>
                </FilmsContainer>
                </CardContentWrapper>
           </Card>
        </Section>
    );
}
export default ContentSelectionSection




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
    onClick: () => void
}
const FilmCard = (props: IFilmCard) => {
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
