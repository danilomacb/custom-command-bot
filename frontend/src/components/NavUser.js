function NavUser({ user }) {
  return (
    <>
      {user.avatar ? (
        <img
          src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`}
          alt="avatar"
        />
      ) : null}
      {user.username}
    </>
  );
}

export default NavUser;
