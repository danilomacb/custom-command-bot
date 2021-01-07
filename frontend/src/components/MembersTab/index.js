import { useState, useEffect } from "react";

import "../../styles/membersTab.scss";
import { listAllMembers } from "../../services/MemberService";

function MembersTab({ discordServer }) {
  const [membersList, setMembersList] = useState(null);

  useEffect(() => {
    listAllMembers(discordServer.discordServerId).then((res) => setMembersList(res));
  }, [discordServer.discordServerId]);

  function promote() {
    console.log("promoted");
  }

  if (membersList) {
    return (
      <>
        {membersList.map((member) => (
          <div key={member.discordUserId} className="member">
            {member.discordUserAvatar ? (
              <img
                src={`https://cdn.discordapp.com/avatars/${member.discordUserId}/${member.discordUserAvatar}.png`}
                alt="avatar"
              />
            ) : null}
            <div>
              {member.discordUserUsername}#{member.discordUserDiscriminator}
            </div>
            <input type="checkbox" name="superAdm" checked={member.superAdm} onChange={promote} />
            <label htmlFor="superAdm">Super Adm</label>
            <input type="checkbox" name="adm" checked={member.adm} onChange={promote} />
            <label htmlFor="adm">Adm</label>
          </div>
        ))}
      </>
    );
  }

  return <h1>Loading Members List...</h1>;
}

export default MembersTab;
