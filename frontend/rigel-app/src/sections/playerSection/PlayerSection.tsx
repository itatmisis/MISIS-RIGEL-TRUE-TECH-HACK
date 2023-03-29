import ReactPlayer from "react-player";
import Section from "../../components/ui/Section";
import {useFilter} from "../../providers/filterProvider";
import IFilm from "../../interfaces/IFilm";
import styled from "styled-components";
import React, {useRef} from "react";
import 'material-icons/iconfont/material-icons.css';


interface IFilmSection {
    selectedFilm?: IFilm
}

const PlayerSection = (props: IFilmSection) => {
    const {selectedFilm} = props

    if (!selectedFilm) return null
    const {getFilterEffect} = useFilter();
    // Удалить
    const timestamp = React.useMemo(() => Date.now(), [])
    const link = `https://movies3.fox-fan.tv/video1/I8E7HB5vqescbcsZ216oyA/${timestamp}/bojack/4/original/402.mp4`
    const [isFullScreen, setIsFullScreen] = React.useState(false)

    const filterEffect = getFilterEffect()
    const playerRef = useRef<HTMLDivElement>(null);
    const onFullScreen = () => {
        if (playerRef.current) {
            if (!isFullScreen) {
                playerRef.current.style.position = "fixed";
                playerRef.current.style.top = "0";
                playerRef.current.style.left = "0";
                playerRef.current.style.width = "100vw";
                playerRef.current.style.height = "100vh";
                playerRef.current.style.zIndex = "9999";
                playerRef.current.style.background = "black";
                //body no scroll
                document.body.style.overflow = "hidden";
            } else {
                playerRef.current.style.position = "relative";
                playerRef.current.style.top = "auto";
                playerRef.current.style.left = "auto";
                playerRef.current.style.width = "100%";
                playerRef.current.style.height = "100%";
                playerRef.current.style.zIndex = "auto";
                playerRef.current.style.background = "rgba(0,0,0,0.5)";
                //body no scroll
                document.body.style.overflow = "auto";
            }
        }
        setIsFullScreen((prev) => !prev)
    }


    return (
        <Section className="player-section">
            <div style={{width: '100%', height: '100%', filter: filterEffect}} ref={playerRef as any}
                 onClick={onFullScreen}>
                <ReactPlayer
                    url={link}
                    controls={false}
                    width="100%"
                    volume={0.5}
                    height="100%"
                    playing={true}
                    disablePictureInPicture
                />
                {/*    <Row>*/}
                {/*        <Button type="primary" shape="circle" icon={<CaretRightOutlined />} size={'large'} />*/}
                {/*        //video scroll*/}
                {/*        <Slider defaultValue={30} style={{width: '50%'}} />*/}
                {/*        //volume scroll*/}
                {/*        <Slider defaultValue={30} />*/}
                {/*        <Button>Fullscreen</Button>*/}
                {/*    </Row>*/}
            </div>
            {selectedFilm &&
                <FilmInfo>
                    <FilmTitle>{selectedFilm.title}</FilmTitle>
                    <FilmDirector>{selectedFilm.director}</FilmDirector>
                </FilmInfo>
            }
        </Section>
    )
}

const PlayerControls = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  gap: 1rem;
`


const FilmTitle = styled.h3`
  text-align: start;
  font-size: 1.5rem;
  font-weight: 700;
`

const FilmDirector = styled.p`
  text-align: start;
  font-size: 1rem;
  font-weight: 400;
`


const FilmInfo = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
`


export default PlayerSection
