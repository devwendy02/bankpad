
const Error = (props) => {
  const { text, isError } = props;

  return (
    <div className='error' style={{display : isError === true ? 'block':'none'}}>
        <div dangerouslySetInnerHTML={{__html: text}}/>
    </div>
  );
};

export default Error;
