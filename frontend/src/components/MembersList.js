import { useState, useEffect } from "react";

import { listAllMembers } from "../services/MemberService";

function MembersList({ discordServer }) {
  const [membersList, setMembersList] = useState(null);

  useEffect(() => {
    listAllMembers(discordServer.discordServerId).then((res) => setMembersList(res));
  }, [discordServer.discordServerId]);

  if (membersList) {
    return (
      <>
        {membersList.map((member) => (
          <div key={member.discordUserId}>
            {member.discordUserAvatar ? (
              <img
                src={`https://cdn.discordapp.com/avatars/${member.discordUserId}/${member.discordUserAvatar}.png`}
                alt="avatar"
              />
            ) : null}
            <div key={member.discordUserId}>
              {member.discordUserUsername}#{member.discordUserDiscriminator}
            </div>
          </div>
        ))}
      </>
    );
  }

  return <h1>Loading Members List...</h1>;
}

export default MembersList;
