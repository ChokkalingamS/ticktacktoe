
import './App.css';
import { useState } from "react";
export default function App() 
{
  return <Game />;
}

function Game() {
  let [data, setData] = useState([null,null,null,null,null,null,null,null,null]);
  let [turn, setTurn] = useState(true);
  let [count, setCount] = useState(0);
  let [state, setState] = useState("");
  let [turnchange,setTurnchange]=useState(["X","O"]);
  let[turnchangebutton,setTurnchangebutton]=useState("block");
  let styles={display:turnchangebutton};
  let turns=[...turnchange]

  
  let TurnChanger=()=>{turns=["O","X"]; return setTurnchange(turns)}
  console.log(turnchange);
  let copydata = [...data];
  // let output=

  let ChangeValue = (i) => {
    if (copydata[i] === null) {
      let val = turn ? turnchange[0] :turnchange[1]
      setTurn(!turn);
      copydata[i] = val;
      setData(copydata);
      setCount(count + 1);
      setTurnchangebutton("none")
      // console.log(val, i);
      console.log(val);
      // console.log(copydata);
    }
  };
  // console.log(copydata);
  let results;
  function Check(copydata, count) 
  {
    let combinations = [[0, 1, 2],[3, 4, 5],[6, 7, 8],[0, 3, 6],[1, 4, 7],[2, 5, 8],[0, 4, 8],[2, 4, 6]];
     for (let i = 0; i < combinations.length; i++) {
      let [a, b, c] = combinations[i];
     // console.log("hi",a,b,c)
      if ((copydata[a] !== null ||copydata[b] !== null ||copydata[c] !== null) &&(copydata[a] === copydata[b]) & (copydata[b] === copydata[c])) 
      {
        console.log("hi", a, b, c);
        results = copydata[a];
        setState(()=>`Winner - ${copydata[a]}`);
      } 
      else if (count === 9) 
      {
        console.log("Match Draw");
        results = "Match Draw";
        setState(()=>`Match Draw`);
      }
    }
    return results;
  }
  
  let Restart = () => {
    setData([null, null, null, null, null, null, null, null, null]);
    setState("");
    setTurnchange(["X","O"]);
    setTurnchangebutton("block")
    return setCount(()=>0);
  };

  return (
    <div className="game">
      <div className="App">
        {data.map((value, i) => (<Boxes key={i} turnchange={() =>Check(copydata, count) === undefined && count <= 9? ChangeValue(i): null}
        value={value} result={state}/>))}
      </div>
      <div className="footer">
        <button className="restart" onClick={Restart}>Restart Game</button>
        <p> {state}</p>
        <button className="turnchanger" style={styles} onClick={TurnChanger}>Change {turnchange[1]}</button>
      </div>
    </div>
  );
}
function Boxes({ turnchange, value })
 {
  return (
    <div className="box">
      <button onClick={turnchange}>{value}</button>
    </div>
  );
}
