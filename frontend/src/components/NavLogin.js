function NavLogin() {
  return (
    <a href="https://discord.com/api/oauth2/authorize?client_id=777841418483662868&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Flogin&response_type=token&scope=identify">
      <button>Login</button>
    </a>
  );
}

export default NavLogin;
