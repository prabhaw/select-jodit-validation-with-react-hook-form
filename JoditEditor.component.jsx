import dynamic from "next/dynamic";
import React, { useRef, useState, useMemo } from "react";
const importJodit = () => import("jodit-react");

const JoditEditor = dynamic(importJodit, {
  ssr: false,
});

const Jodit = (props) => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const config = {
    readonly: false,
  };
  return useMemo(
    () => (
      <JoditEditor
        ref={props.innerRef}
        tabindex={5}
        value={content}
        config={config}
        onChange={props.onChange}
        onBlur={props.onBlur}
        name={props.name}
        value={props.value}
      />
    ),
    []
  );
};

export default Jodit;
