function TextCommandList({ textCommandList }) {
  return (
    <>
      {textCommandList.map((textCommand) => (
        <div key={textCommand._id}>
          <label>Tag: {textCommand.tag}</label>
          <div>Message: {textCommand.message}</div>
        </div>
      ))}
    </>
  );
}

export default TextCommandList;
