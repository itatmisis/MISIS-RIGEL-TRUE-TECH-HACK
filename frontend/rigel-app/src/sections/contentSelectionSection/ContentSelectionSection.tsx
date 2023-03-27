import Section from "../../components/ui/Section";
import Card, {CardContentWrapper} from "../../components/ui/Card";
import styled from "styled-components";

const ContentSelectionSection = () => {
    return (
        <Section>
           <Card>
               <CardContentWrapper>
               <h2>Выберите фильм</h2>
                <FilmsContainer>
                    {FilmCard('https://www.kinopoisk.ru/images/film_big/104.jpg', 'Криминальное чтиво', 'Квентин Тарантино')}
                    {FilmCard('https://www.kinopoisk.ru/images/film_big/104.jpg', 'Криминальное чтиво', 'Квентин Тарантино')}
                    {FilmCard('https://m.media-amazon.com/images/M/MV5BYWQwMDNkM2MtODU4OS00OTY3LTgwOTItNjE2Yzc0MzRkMDllXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg', 'BoJack Horseman', 'Raphael Bob-Waksberg')}
                    {FilmCard('https://www.kinopoisk.ru/images/film_big/104.jpg', 'Криминальное чтиво', 'Квентин Тарантино')}
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

const FilmCard = (img: string, title: string, director: string) => {
    return (
<FilmContainer>
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
