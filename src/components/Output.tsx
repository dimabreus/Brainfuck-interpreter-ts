import { FC } from "react";
import "./Output.css";
import Editor from "./Editor";

interface OutputProps {
    value: string
}

const Output: FC<OutputProps> = ({value}: OutputProps) => {
    return (
        <div className="output content">
            <Editor
                value={"Output:\n" + value}
                onChange={() => {}}
                editable={false}
            />
        </div>
    )
}

export default Output