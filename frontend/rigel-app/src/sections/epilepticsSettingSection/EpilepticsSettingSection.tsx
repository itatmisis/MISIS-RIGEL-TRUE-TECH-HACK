import Section from "../../components/ui/Section";
import Card, {CardInfo} from "../../components/ui/Card";
import {Switch} from "antd";
import ReactPlayer from "react-player";
import {useEffect, useRef, useState} from "react";
import {useFilter} from "../../providers/filterProvider";

const EpilepticsSettingSection = () => {
    const [isEpilepsy, setIsEpilepsy] = useState(false)
    const [videoTime, setVideoTime] = useState(0)
    const {getFilterEffect} = useFilter();
    const link1 = "https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_fmp4/master.m3u8"
    const link2 = `https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_fmp4/master.m3u8`
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
        <Section className={"epileptics-settings-section"}>
            <Card>
                <CardInfo>
                    <div>
                        <h2>Безопасный режим</h2>
                        <p>Для людей с проблемой восприятия мерцающего видеоряда</p>
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
            </Card>
        </Section>
    )
}

export default EpilepticsSettingSection