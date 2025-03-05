import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { StreamLanguage } from "@codemirror/language";
import { brainfuck } from "@codemirror/legacy-modes/mode/brainfuck";
import { darcula } from '@uiw/codemirror-theme-darcula';
import "./Editor.css";

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
}

const Editor: React.FC<EditorProps> = ({ value, onChange }) => {
  return (
    <div className="editor">
      <CodeMirror
        value={value}
        height="200px"
        theme={darcula}
        extensions={[StreamLanguage.define(brainfuck)]}
        onChange={onChange}
      />
    </div>
  );
};

export default Editor;
