import { useState, useEffect } from "react";

import "../../styles/membersTab.scss";
import { listAllMembers, updateMember } from "../../services/MemberService";

function MembersTab({ discordServer }) {
  const { discordServerId } = discordServer;

  const [membersList, setMembersList] = useState(null);

  useEffect(() => {
    listAllMembers(discordServerId).then((res) => setMembersList(res));
  }, [discordServerId]);

  async function promotion(e, member) {
    await updateMember(discordServerId, member.discordUserId, e.target.name);

    const members = await listAllMembers(discordServerId);
    setMembersList(members);
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
            {member.discordServerOwner ? <strong>(Owner)</strong> : null}
            <input
              type="checkbox"
              name="superAdm"
              checked={member.superAdm}
              onChange={(e) => promotion(e, member)}
              disabled={member.discordServerOwner}
            />
            <label htmlFor="superAdm">Super Adm</label>
            <input
              type="checkbox"
              name="adm"
              checked={member.adm}
              onChange={(e) => promotion(e, member)}
              disabled={member.discordServerOwner}
            />
            <label htmlFor="adm">Adm</label>
          </div>
        ))}
      </>
    );
  }

  return <h1>Loading Members List...</h1>;
}

export default MembersTab;
