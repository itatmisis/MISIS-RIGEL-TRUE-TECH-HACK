import Card, {CardContentWrapper} from "../../components/ui/Card";
import Section from "../../components/ui/Section";

const ExtendedSettingsSection = () => {
    return(
        <Section className={"select-options-section"}>
            <Card style={{width: "100%"}}>
                <CardContentWrapper>
                    <h2>Расширенные настройки</h2>
                </CardContentWrapper>
            </Card>
        </Section>
    )
}
export default ExtendedSettingsSection