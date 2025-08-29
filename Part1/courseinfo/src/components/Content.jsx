const Part = (props) =>{
    return (
        <>
            <p>{props.name} {props.exercises}</p>
        </>
    );
}

const Content = (props) => {
    const parts = props.parts;
  return (
    <div>
      {parts.map((part) => <Part key={part.id} name={part.name} exercises={part.exercises}/>)}
    </div>
  );
}


export default Content;