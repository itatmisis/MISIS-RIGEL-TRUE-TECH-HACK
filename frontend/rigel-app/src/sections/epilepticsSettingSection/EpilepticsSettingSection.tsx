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
    const [isPlay, setIsPlay] = useState<boolean>(false);
    const componentRef = useRef<HTMLDivElement>(null);
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


    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsPlay(true);
                    }
                });
            },
            {
                root: null,
                threshold: 0.5, // change this value to adjust the trigger threshold
            }
        );

        if (componentRef.current) {
            observer.observe(componentRef.current);
        }

        return () => {
            if (componentRef.current) {
                observer.unobserve(componentRef.current);
            }
        };
    }, []);


    return (
        <Section className={"epileptics-settings-section"} ref={componentRef}>
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
                    canEnablePIP={false}
                    url={isEpilepsy ? link2 : link1}
                    playing={isPlay}
                    controls={false}
                    muted={true}
                    loop={true}
                    autoPlay={true}
                    playsinline={true}
                    pip={false}
                    stopOnEnd={false}
                    volume={0}
                    //set video time
                    onProgress={(e) => {
                        console.log(e.playedSeconds)
                        setVideoTime(e.playedSeconds)
                    }}
                    width="100%"
                    height="100%"
                    style={{filter: filterEffect}}
                />
            </Card>
        </Section>
    )
}

export default EpilepticsSettingSection