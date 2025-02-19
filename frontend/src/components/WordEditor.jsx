import React, { useCallback, useMemo, useState } from "react";
import { createEditor, Transforms, Editor, Text } from "slate";
import { Slate, Editable, withReact } from "slate-react";

const WordEditor = () => {
  const editor = useMemo(() => withReact(createEditor()), []);
  const [value, setValue] = useState([
    {
      type: "paragraph",
      children: [{ text: "Start writing here..." }],
    },
  ]);

  const renderLeaf = useCallback((props) => {
    return <Leaf {...props} />;
  }, []);

  return (
    <Slate
      editor={editor}
      value={value}
      onChange={(newValue) => setValue(newValue)}
    >
      <Toolbar editor={editor} />
      <Editable
        renderLeaf={renderLeaf}
        onKeyDown={(event) => {
          if (!event.ctrlKey) return;
          switch (event.key) {
            case "b":
              event.preventDefault();
              toggleMark(editor, "bold");
              break;
            case "i":
              event.preventDefault();
              toggleMark(editor, "italic");
              break;
          }
        }}
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          minHeight: "300px",
        }}
      />
    </Slate>
  );
};

// Define custom formatting (Bold, Italic, Underline)
const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);
  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

// Formatting buttons
const Toolbar = ({ editor }) => {
  return (
    <div style={{ marginBottom: "10px" }}>
      <button
        onMouseDown={(e) => {
          e.preventDefault();
          toggleMark(editor, "bold");
        }}
      >
        Bold
      </button>
      <button
        onMouseDown={(e) => {
          e.preventDefault();
          toggleMark(editor, "italic");
        }}
      >
        Italic
      </button>
      <button
        onMouseDown={(e) => {
          e.preventDefault();
          toggleMark(editor, "underline");
        }}
      >
        Underline
      </button>
    </div>
  );
};

// Leaf component for formatting
const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) children = <strong>{children}</strong>;
  if (leaf.italic) children = <em>{children}</em>;
  if (leaf.underline) children = <u>{children}</u>;
  return <span {...attributes}>{children}</span>;
};

export default WordEditor;
