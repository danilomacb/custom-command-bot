function NavUser({ discordUser }) {
  return (
    <>
      {discordUser.avatar ? (
        <img
          src={`https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png`}
          alt="avatar"
        />
      ) : null}
      {discordUser.username}
    </>
  );
}

export default NavUser;
