import styled from "styled-components";
import watchLater from "../../assets/icons/watchL.svg";
import watchingHistory from "../../assets/icons/svgexport-6.svg";
import {Icon} from "../../components/ui/Icons/Icons";
import {Link, Routes} from "react-router-dom";
import {Outlet} from "react-router-dom";
const SettingsPage = () => {
    return (
        <SettingsPageContainer>
        <AsideMenuPanel/>
            <ProfileContent>
                <Outlet/>
            </ProfileContent>
        </SettingsPageContainer>
    )
}

const ExampleProfileCategory = () => {
    return (
        <div>
            <h3>Профиль</h3>
            <div>
                <div>
                    <span>Имя</span>
                </div>
            </div>
        </div>
    )
}


export default SettingsPage


const SettingsPageContainer = styled.div`
    display: flex;
    gap: 4rem;
    `;


const ProfileContent = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: ${(props) => props.theme.sizes.padding};
    `;


// Подписки
// Промокод
//
// Мои телеканалы
// Напоминания
// Настройка телеканалов
//
// Другое
// Мои устройства
// Отправить обращение
// Справка
// Пользовательское соглашение
const asideMenuItems = [
    {
        icon: watchLater,
        alt: "Смотреть позже",
        title: "Смотреть позже"
    },
    {
        icon: watchingHistory,
        alt: "История просмотров",
        title: "История просмотров"
    },
    {
        icon: watchingHistory,
        alt: "Мои фильмы и сериалы",
        title: "Мои фильмы и сериалы",
    },
    {
        icon: watchingHistory,
        alt: "Подписки",
        title: "Мои подписки",
    },
    {
        icon: watchingHistory,
        alt: "Телеканалы",
        title: "Телеканалы",
    },
    {
        icon: watchingHistory,
        alt: "Напоминания",
        title: "Напоминания",
    },
    {
        icon: watchingHistory,
        alt: "Настройка телеканалов",
        title: "Настройка телеканалов",
},
{
    icon: watchingHistory,
    alt: "Устройства",
    title: "Мои устройства",
},
{
    icon: watchingHistory,
    alt: "Отправить обращение",
    title: "Отправить обращение",
},
{
    icon: watchingHistory,
    alt: "Справка",
    title: "Справка",
},
{
    icon: watchingHistory,
    alt: "Пользовательское соглашение",
    title: "Пользовательское соглашение",
},
]


const AsideMenuPanel = () => {
return (
    <SidePanelContainer>
        <SidePanelMenu>
            {asideMenuItems.map((item, index) => (
                <SidePanelMenuItem key={index}>
                    <Icon src={item.icon} alt={item.alt}/>
                    <span style={{width: "100%"}}>{item.title}</span>
                </SidePanelMenuItem>
            ))}
            <Link to={'/settings/colors'}>
            <SidePanelMenuItem>
                <Icon src={watchingHistory} alt="Настройки цветочувствительности"/>
                <span style={{width: "100%"}}>Настройки цветочувствительности</span>
            </SidePanelMenuItem>
            </Link>
        </SidePanelMenu>
    </SidePanelContainer>
)
}


const SidePanelContainer = styled.aside`
    max-width: 100%;
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-shrink: 1;
    flex-grow: 1;
    padding: 20px;
    top: 0;
    left: 0;
    bottom: 0;
    gap: ${(props) => props.theme.sizes.padding};
    border-radius: ${(props) => props.theme.sizes.borderRadius};
    background-color: ${(props) => props.theme.colors.secondary};
    `;

const SidePanelMenu = styled.nav`
    display: flex;
    flex-direction: column;
    width: max-content;
    `;

const SidePanelMenuItem = styled.a`
    width: 100%;
    display: flex;
    align-items: center;
    gap: ${(props) => props.theme.sizes.padding};
    padding: ${(props) => props.theme.sizes.padding};
    border-radius: ${(props) => props.theme.sizes.borderRadius};
    transition: ${(props) => props.theme.transitions};
    cursor: pointer;
    &:hover {
        color: ${(props) => props.theme.colors.accent};
    }
    `;



