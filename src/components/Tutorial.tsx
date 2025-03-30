import "./Tutorial.css"
const Tutorial = () => {
    return (
        <div className="tutorial content">
            <p>Brainfuck (BF) is an esoteric programming language designed to be as minimalistic as possible while still being Turing complete. It operates on an array of memory cells, each initially set to zero, and a data pointer that moves across these cells.</p>
            <table>
                <tbody>
                    <tr>
                        <th>
                            <span>Command</span>
                        </th>
                        <th>
                            <span>Description</span>
                        </th>
                    </tr>
                    <tr>
                        <th>
                            <span>&gt;</span>
                        </th>
                        <th>
                            <span>Move the data pointer to the right</span>
                        </th>
                    </tr>
                    <tr>
                        <th>
                            <span>&lt;</span>
                        </th>
                        <th>
                            <span>Move the data pointer to the left</span>
                        </th>
                    </tr>
                    <tr>
                        <th>
                            <span>+</span>
                        </th>
                        <th>
                            <span>Increment the byte at the data pointer</span>
                        </th>
                    </tr>
                    <tr>
                        <th>
                            <span>-</span>
                        </th>
                        <th>
                            <span>Decrement the byte at the data pointer</span>
                        </th>
                    </tr>
                    <tr>
                        <th>
                            <span>.</span>
                        </th>
                        <th>
                            <span>Output the byte at the data pointer as ASCII</span>
                        </th>
                    </tr>
                    <tr>
                        <th>
                            <span>,</span>
                        </th>
                        <th>
                            <span>Input a byte and store it at the data pointer</span>
                        </th>
                    </tr>
                    <tr>
                        <th>
                            <span>&#91;</span>
                        </th>
                        <th>
                            <span>Jump past the matching &#91; if the byte at the data pointer is zero</span>
                        </th>
                    </tr>
                    <tr>
                        <th>
                            <span>&#93;</span>
                        </th>
                        <th>
                            <span>Jump back to the matching &#93; if the byte at the data pointer is nonzero</span>
                        </th>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
export default Tutorial