import { Link } from "react-router-dom";

function DiscordServer({ discordServerId, discordServer, isAdm }) {
  return (
    <>
      <h1>{discordServer.name}</h1>
      {isAdm ? <Link to={`/discord-server/${discordServerId}/add`}>Add</Link> : null}
      <br />
      {discordServer.textCommands.map((textCommand) => (
        <div key={textCommand._id}>
          <label>Tag: {textCommand.tag}</label>
          <div>Message: {textCommand.message}</div>
        </div>
      ))}
    </>
  );
}

export default DiscordServer;
