import React, { createContext, useState } from "react";

export const TextCommandListContext = createContext();

function TextCommandListProvider({ children }) {
  const [textCommandList, setTextCommandList] = useState(null);

  return (
    <TextCommandListContext.Provider value={{ textCommandList, setTextCommandList }}>
      {children}
    </TextCommandListContext.Provider>
  );
}

export default TextCommandListProvider;
