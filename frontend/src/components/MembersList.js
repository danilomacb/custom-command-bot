import { useState, useEffect } from "react";

import { getMembers } from "../services/MemberService";

function MembersList({ discordServer }) {
  const [membersList, setMembersList] = useState(null);

  useEffect(() => {
    getMembers(discordServer.discordServerId).then((res) => setMembersList(res));
  }, []);

  if (membersList) {
    return (
      <>
        {membersList.map((member) => (
          <>
            {member.discordAvatar ? (
              <img
                src={`https://cdn.discordapp.com/avatars/${member.discordUserId}/${member.discordAvatar}.png`}
                alt="avatar"
              />
            ) : null}
            <div key={member.discordUserId}>
              {member.discordUsername}#{member.discordDiscriminator}
            </div>
          </>
        ))}
      </>
    );
  }

  return <h1>Loading Members List...</h1>;
}

export default MembersList;
