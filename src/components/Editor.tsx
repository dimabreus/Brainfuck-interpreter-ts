import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { StreamLanguage } from "@codemirror/language";
import { brainfuck } from "@codemirror/legacy-modes/mode/brainfuck";
import { darcula } from '@uiw/codemirror-theme-darcula';
import "./Editor.css";

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
  editable?: boolean
}

const Editor: React.FC<EditorProps> = ({ value, onChange, editable = true }) => {
  return (
    <div className="editor content">
      <CodeMirror
        value={value}
        height="200px"
        theme={darcula}
        extensions={[StreamLanguage.define(brainfuck)]}
        onChange={onChange}
        editable={editable}
      />
    </div>
  );
};

export default Editor;
