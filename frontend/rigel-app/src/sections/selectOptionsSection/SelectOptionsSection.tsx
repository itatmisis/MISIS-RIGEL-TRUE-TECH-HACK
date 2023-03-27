import Section from "../../components/ui/Section";
import Card, {CardContentWrapper} from "../../components/ui/Card";
import {Button} from "antd";

const SelectOptionsSection = () => {
    return (
        <Section className={"select-options-section"}>
            <Card style={{width: "100%"}}>
                <CardContentWrapper>
                    <h2>У вас есть проблемы с восприятием цвета или света?</h2>
                    <div>
                        <Button>Да</Button>
                        <Button>)))</Button>
                    </div>
                </CardContentWrapper>
            </Card>
        </Section>
    );
}

export default SelectOptionsSection