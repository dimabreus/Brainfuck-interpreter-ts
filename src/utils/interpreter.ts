export class Interpreter {
    isFinished: boolean = false;
    memory: number[] = [0];
    output: string = "";

    private code: string;
    private stack: number[] = [];

    private pointerPosition: number = 0;
    private codePointerPosition: number = 0;

    private input: () => Promise<number>;

    constructor(code: string, input: () => Promise<number>) {
        this.code = code;
        this.input = input;
    }

    async makeStep() {
        if (this.isFinished) return;

        if (this.codePointerPosition >= this.code.length) {
            this.isFinished = true;
            return;
        }

        switch (this.code[this.codePointerPosition]) {
            case '+':
                this.memory[this.pointerPosition] =
                    this.memory[this.pointerPosition] === 255
                        ? 0
                        : this.memory[this.pointerPosition] + 1
                this.codePointerPosition++;

                break;
            case '-':
                this.memory[this.pointerPosition] =
                    this.memory[this.pointerPosition] === 0
                        ? 255
                        : this.memory[this.pointerPosition] - 1
                this.codePointerPosition++;

                break;
            case '>':
                this.pointerPosition++;

                this.memory[this.pointerPosition] = this.memory[this.pointerPosition] || 0;

                this.codePointerPosition++;

                break;
            case '<':
                if (this.pointerPosition > 0) this.pointerPosition--;

                this.codePointerPosition++;

                break;
            case '.':
                this.output += String.fromCharCode(this.memory[this.pointerPosition]);

                this.codePointerPosition++;

                break;
            case ',':
                this.memory[this.pointerPosition] = await this.input();

                this.codePointerPosition++;

                break;
            case '[':
                if (this.memory[this.pointerPosition] === 0) {
                    let bracketsCount: number = 1;

                    while (bracketsCount > 0) {
                        this.codePointerPosition++;

                        if (this.codePointerPosition >= this.code.length) {
                            this.isFinished = true;
                            this.output = `There is no loop ending.`;
                            return;
                        }

                        if (this.code[this.codePointerPosition] === "[") bracketsCount++;
                        else if (this.code[this.codePointerPosition] === "]") bracketsCount--;
                    }
                } else {
                    this.stack.push(this.codePointerPosition);
                }

                this.codePointerPosition++;

                break;
            case ']':
                if (this.memory[this.pointerPosition] !== 0) {
                    this.codePointerPosition = this.stack[this.stack.length - 1];
                } else {
                    this.stack.pop();
                    this.codePointerPosition++;
                }
                
                break;
            default:
                this.isFinished = true;
                this.output = `Error at index ${this.codePointerPosition} - ${this.code[this.codePointerPosition]}`;
        }
    }
}
