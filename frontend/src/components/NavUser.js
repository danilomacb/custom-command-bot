function NavUser({ user }) {
  return (
    <>
      <img
        src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`}
        alt="user profile"
      />
      {user.username}
    </>
  );
}

export default NavUser;
