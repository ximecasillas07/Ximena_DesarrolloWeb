'use client';
import { useState } from 'react';


const HelloComponent = ({message, alertStyle = 'bg-transparente'} : { message: string, alertStyle?: string}) => {

  return (<div className={alertStyle}> <p>{message}</p> </div>);
}

const Home = () => {
  const [index , setIndex] = useState<number>(1); 
  // variable que agarra la memoria y inicializa y revisa la variable y interactuan  

  const onClickButton = () => {
    setIndex(index + 1);
    console.log(index);
  }
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <HelloComponent message={`Hello world ${index}`}/>
      <button className="btn btn-sm" onClick={onClickButton}> Click me {index % 2 === 0 ? 'Even' : 'Odd'}</button>
      {index % 10 === 0 && <HelloComponent message={`Gotha`}/> }  
      {index % 10 === 0 ? <HelloComponent message={`Gotha`}/> : <HelloComponent message={`Not Gotha`}/>} 
    </div>
  );
}

export default Home;