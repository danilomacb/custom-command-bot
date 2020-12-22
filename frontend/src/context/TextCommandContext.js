import React, { createContext, useState } from "react";

export const TextCommandContext = createContext();

function TextCommandProvider({ children }) {
  const [textCommandList, setTextCommandList] = useState(null);
  const [textCommandMode, setTextCommandMode] = useState("list");
  const [textCommandId, setTextCommandId] = useState(null);
  const [textCommandTag, setTextCommandTag] = useState("");
  const [textCommandMessage, setTextCommandMessage] = useState("");

  return (
    <TextCommandContext.Provider
      value={{
        textCommandList,
        setTextCommandList,
        textCommandMode,
        setTextCommandMode,
        textCommandId,
        setTextCommandId,
        textCommandTag,
        setTextCommandTag,
        textCommandMessage,
        setTextCommandMessage,
      }}
    >
      {children}
    </TextCommandContext.Provider>
  );
}

export default TextCommandProvider;
