import { FC } from "react";
import "./Output.css";

interface OutputProps {
    value: string
}

const Output: FC<OutputProps> = ({value}: OutputProps) => {
    return (
        <div className="output">
            {value}
        </div>
    )
}

export default Output