import styled from "styled-components";
import rigelIcons from "../../assets/Rigel.svg";
import {Link} from "react-router-dom";

const menuItems = [
    {
        title: 'Главная',
        path: '/',
        id: 1,
    },
]


const Profile = () => {
    return (
        <ProfileContainer>
            <ProfileImage src="https://24tv.ua/resources/photos/news/202208/2129483.jpg?v=1660425190000" alt="Profile"/>

        </ProfileContainer>
    )
}


const Header = () => {
    return (
        <HeaderContainer>
            <Link to={'/'} style={{textDecoration: 'none'}}>
                <Logo src={rigelIcons} alt="Rigel"/>
            </Link>
            <Menu>
                <p>Проблема</p>
                <p>Поиск</p>
                <p>Решение</p>
                <p>Комфорт</p>
            </Menu>
        </HeaderContainer>
    )
}

export default Header

const HeaderContainer = styled.header`
  max-width: ${(props) => props.theme.sizes.contentWidth};
  margin-inline: auto;
  padding: ${(props) => props.theme.sizes.padding};
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 0.5rem;
`

const Logo = styled.img`
  height: 2.4em;
`

const Menu = styled.nav`
  display: flex;
  gap: 24px;
  align-items: center;
`

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  сursor: pointer;
`
const ProfileImage = styled.img`
  width: 2em;
  height: 2em;
  border-radius: 50%;
  //не сжимать содержимое
  object-fit: cover;
`



