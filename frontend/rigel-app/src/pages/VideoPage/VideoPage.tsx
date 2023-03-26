import ReactPlayer from "react-player";


const VideoPage = () => {
    return (
        <div className="video-page">
        <ReactPlayer
            url="https://movies2.fox-fan.tv/video1/HBayq7URrI1k9GnNFuqC5Q/1679904108/bojack/5/NewStudio/506.mp4"
            playing={true}
            controls={true}
            width="100%"
            height="100%"
        />
        </div>
    )
}

export default VideoPage