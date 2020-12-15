import React, { createContext, useState } from "react";

export const DiscordUserContext = createContext();

function DiscordUserProvider({ children }) {
  const [discordUser, setDiscordUser] = useState(null);

  return (
    <DiscordUserContext.Provider value={{ discordUser, setDiscordUser }}>{children}</DiscordUserContext.Provider>
  );
}

export default DiscordUserProvider;
