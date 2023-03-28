import Section from "../../components/ui/Section";
import Card, {CardInfo} from "../../components/ui/Card";
import {Switch} from "antd";
import ReactPlayer from "react-player";
import {useEffect, useRef, useState} from "react";
import {useFilter} from "../../providers/filterProvider";

const EpilepsySettingsSection = () => {
    const [isEpilepsy, setIsEpilepsy] = useState(false)
    const [videoTime, setVideoTime] = useState(0)
    const {getFilterEffect} = useFilter();
    const link1 = "https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_fmp4/master.m3u8"
    const link2 = `https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_fmp4/master.m3u8`
    //if (isEpilepsy) link2 else link1
    //then isEilepsy = change set on playerRef videoTime
    const playerRef = useRef<ReactPlayer | null>(null)
    useEffect(() => {
        if (playerRef.current) {
            playerRef.current.seekTo(videoTime)
        }
    }
        , [isEpilepsy])
    //SET FILTER
    const filterEffect = getFilterEffect()

    return (
        <Section className={"epilepsy-settings-section"}>
            <Card>
                <CardInfo>
                    <div>
                        <h2>Эпилепсия</h2>
                        <p>Индивидуальные настройки цвета, яркости и контрастности изображения</p>
                    </div>
                    <Switch onChange={() => setIsEpilepsy(!isEpilepsy)}/>
                </CardInfo>
                <ReactPlayer
                    ref={playerRef}
                    //set video location
                    url={isEpilepsy ? link2 : link1}
                    playing={false}
                    controls={true}
                    //set video time
                    onProgress={(e) => {
                        console.log(e.playedSeconds)
                        setVideoTime(e.playedSeconds)
                    }}
                    width="100%"
                    height="100%"
                    volume={0.5}
                    style={{filter: filterEffect}}
                />
                <p>Описание алго</p>
            </Card>
        </Section>
    )
}

export default EpilepsySettingsSection