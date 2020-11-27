import "../styles/form.scss";

function AddText({ match }) {
  async function handleSubmit(e) {
    e.preventDefault();

    let res;
    try {
      res = await fetch(`http://localhost:3001/text/${match.params.discordServerId}/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tag: e.target[0].value, message: e.target[1].value }),
      });
    } catch (err) {
      console.log(err);
      return;
    }

    try {
      const jsonRes = await res.json();

      console.log(jsonRes.message);
    } catch (err) {
      console.error(err);
      return;
    }
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <input type="text" />
        <textarea type="message" />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default AddText;
