import './App.css'
import Editor from './components/Editor'
import Output from './components/Output'
import { useCallback, useState, useEffect } from 'react';
import SplitPane, { Pane } from "split-pane-react";
import 'split-pane-react/esm/themes/default.css';
import { execute } from './utils/interpreter';

function App() {
  const savedSizes = JSON.parse(localStorage.getItem('sizes') || '["60%", "auto"]');
  const savedValue = localStorage.getItem('value') || "++++++++[>++++++++<-]>.";

  const [sizes, setSizes] = useState<(number | string)[]>(savedSizes);
  const [value, setValue] = useState(savedValue);
  const [output, setOutput] = useState<string>("");

  const onChange = useCallback(async (val: string) => {
    console.log("val:", val);
    setValue(val);

    const memory: number[] = [0];
    const executeValue: string = await execute(val, memory, () => new Promise((resolve) => resolve(10)));

    console.log(executeValue, memory)
    setOutput(executeValue);
  }, []);

  useEffect(() => {
    localStorage.setItem('sizes', JSON.stringify(sizes));
    localStorage.setItem('value', value);
  }, [sizes, value]);

  return (
    <div className="wrapper">
      <SplitPane
        split="horizontal"
        sizes={sizes}
        onChange={setSizes}
        sashRender={() => null}
      >
        <Pane minSize="20%">
          <Editor value={value} onChange={onChange} />
        </Pane>
        <Output value={output} />
      </SplitPane>
    </div>
  );
}

export default App;
