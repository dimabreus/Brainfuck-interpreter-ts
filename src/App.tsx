import { useCallback, useState, useEffect } from 'react';

import Editor from './components/Editor'
import Output from './components/Output'
import Tutorial from './components/Tutorial';

import SplitPane, { Pane } from "split-pane-react";

import { Interpreter } from './utils/interpreter';

import './App.css'
import 'split-pane-react/esm/themes/default.css';

function App() {
  const savedHorizontalPanelSizes = JSON.parse(localStorage.getItem('horizontal-sizes') || '["60%", "auto"]');
  const savedVerticalPanelSizes = JSON.parse(localStorage.getItem('vertical-sizes') || '["60%", "auto"]');
  const savedInput = localStorage.getItem('input') || "++++++++++[>++++++++++<-]>++++.+.<+++[>>++++++++++<<-]>>+++.";

  const [horizontalPanelSizes, setHorizontalPanelSizes] = useState<(number | string)[]>(savedHorizontalPanelSizes);
  const [verticalPanelSizes, setVerticalPanelSizes] = useState<(number | string)[]>(savedVerticalPanelSizes);
  const [input, setInput] = useState(savedInput);
  const [output, setOutput] = useState<string>("Nothing here");
  const [interpreter, setInterpreter] = useState<Interpreter>();

  const prompt = (msg: string): Promise<string | null> => {
    return new Promise<string | null>((resolve) => {
      const input = window.prompt(msg);
      resolve(input);
    });
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      let i = 0;

      while (i < 100 && interpreter && !interpreter?.isFinished) {
        interpreter.makeStep();

        i++;
      }

      setOutput(interpreter?.output || "...");
    });

    return () => clearInterval(intervalId);
  }, [interpreter]);


  const onChange = useCallback(async (val: string) => {
    setInput(val);

    if (interpreter) {
      interpreter.isFinished = true;
    }

    const newInterpreter = new Interpreter(
      val,
      async () => ((await prompt("")) || "0").charCodeAt(0)
    );

    setOutput(newInterpreter.output);
    setInterpreter(newInterpreter);
  }, [interpreter]);

  useEffect(() => {
    onChange(input);
  }, []);

  useEffect(() => {
    localStorage.setItem('horizontal-sizes', JSON.stringify(horizontalPanelSizes));
    localStorage.setItem('vertical-sizes', JSON.stringify(verticalPanelSizes));
    localStorage.setItem('input', input);
  }, [horizontalPanelSizes, verticalPanelSizes, input]);

  return (
    <div className="wrapper">
      <SplitPane
        split="horizontal"
        sizes={horizontalPanelSizes}
        onChange={setHorizontalPanelSizes}
        sashRender={() => null}
      >
        <Pane minSize="20%">
          <Editor value={input} onChange={onChange} />
        </Pane>
        <Pane>
          <SplitPane
            split="vertical"
            sizes={verticalPanelSizes}
            onChange={setVerticalPanelSizes}
            sashRender={() => null}
          >
            <Pane minSize="10%">
              <Output value={output} />
            </Pane>
            <Pane>
              <Tutorial />
            </Pane>
          </SplitPane>
        </Pane>

      </SplitPane>
      {/* <Tutorial /> */}
    </div>
  );
}

export default App;
