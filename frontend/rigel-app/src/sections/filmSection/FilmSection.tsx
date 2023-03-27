import ReactPlayer from "react-player";
import Section from "../../components/ui/Section";


const FilmSection = () => {
    const timestamp = Date.now()
    console.log(timestamp)
    //generate https://movies1.fox-fan.tv/video1/D7j5VFuOvCSPtlj5jzIixw/1679975342/bojack/4/original/402.mp4 but with current timestamp
    //https://movies3.fox-fan.tv/video1/I8E7HB5vqescbcsZ216oyA/1679975500/bojack/4/original/402.mp4
    const link = `https://movies3.fox-fan.tv/video1/I8E7HB5vqescbcsZ216oyA/${timestamp}/bojack/4/original/402.mp4`
    //const link = `https://movies1.fox-fan.tv/video1/D7j5VFuOvCSPtlj5jzIixw/${timestamp}/bojack/4/original/402.mp4`
    console.log(link)
    return (
        <Section>
        <ReactPlayer
            url={link}
            playing={true}
            controls={true}
            width="100%"
            height="100%"
        />
        </Section>
    )
}

export default FilmSection
