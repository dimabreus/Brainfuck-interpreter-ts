export async function execute(
    code: string,
    memory: number[],
    input: () => Promise<number>
): Promise<string> {
    let outputData: string = "";

    const stack: number[] = [];
    const codeSplit = code.split('');
    let isFinal = false;
    let codePoint: number = 0;
    let point: number = 0;

    while (!isFinal) {
        switch (codeSplit[codePoint]) {
            case '+':
                if (memory[point] === 255) {
                    memory[point] = 0;
                } else {
                    memory[point]++;
                }
                codePoint++;
                break;
            case '-':
                if (memory[point] === 0) {
                    memory[point] = 255;
                } else {
                    memory[point]--;
                }
                codePoint++;
                break;
            case '>':
                point++;
                if (memory[point] === undefined) {
                    memory.push(0);
                }
                codePoint++;
                break;
            case '<':
                if (point > 0) point--;
                codePoint++;
                break;
            case '.':
                outputData += String.fromCharCode(memory[point]);
                codePoint++;
                break;
            case ',':
                memory[point] = await input();
                codePoint++;
                break;
            case '[':
                if (memory[point] === 0) {
                    let depth = 1;
                    while (depth > 0) {
                        codePoint++;
                        if (codeSplit[codePoint] === '[') depth++;
                        if (codeSplit[codePoint] === ']') depth--;
                    }
                } else {
                    stack.push(codePoint);
                }
                codePoint++;
                break;
            case ']':
                if (memory[point] !== 0) {
                    codePoint = stack[stack.length - 1];
                } else {
                    stack.pop();
                    codePoint++;
                }
                break;
            default:
                break;
        }
        
        if (codePoint >= codeSplit.length) { isFinal = true; }
    }

    return outputData;
}
