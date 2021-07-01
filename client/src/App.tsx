import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import React from 'react';
import './App.css';
import Bot, { BotProp, headers } from './components/Bot';

function App() {

  const [needUpdate, setNeedUpdate] = React.useState(true);
  const [rows, setRows] = React.useState<BotProp[]>([]);
  const [inputName, setInputName] = React.useState<string>("");
  const [inputMacAddress, setInputMacAddress] = React.useState<string>("");
  const [inputMemo, setInputMemo] = React.useState<string>("");

  React.useEffect(()=>{
    if(needUpdate){
      console.log("start to update")
      fetch("/bots")
        .then((res) => res.json())
        .then((data) => {
          const tmp: BotProp[] = [];
          data.bots.map((bot: BotProp) => (
            tmp.push(bot)
          ))
          setRows(tmp)
        });
        setNeedUpdate(false)
    }else{
      console.log("skip")
    }
  },[needUpdate])

  const addBot = () => {
    console.log("add")
    if(!inputName || !inputMacAddress){
      console.log("inputName and inputMacAddress must not be empty.")
      return
    }

    const obj = {
      name: inputName,
      macaddress: inputMacAddress,
      memo: inputMemo
    };
    const method = "PUT";
    const body = JSON.stringify(obj);
    fetch("/bot", {method, headers, body})
      .then((res)=> res.json())
      .then(console.log)
      .then(clearInput)
      .then(()=>{
        setNeedUpdate(true)
      })
      .catch(console.error);   
  };

  const clearInput = () => {
    setInputMacAddress("")
    setInputMemo("")
    setInputName("")
  }

  return (
    <div className="App">
      <p>{!rows.length ? "Loading..." : ""}</p>
      <input value={inputName} type="text" placeholder="Name" onChange={e => setInputName(e.target.value)}/>
      <input value={inputMacAddress} type="text" placeholder="MAC address" onChange={e => setInputMacAddress(e.target.value)}/>
      <input value={inputMemo} type="text" placeholder="memo" onChange={e => setInputMemo(e.target.value)}/>
      <button onClick={addBot}>追加</button>
      <TableContainer component={Paper}>
        <Table size="small" aria-label="bot table">
          <TableHead>
            <TableRow>
              <TableCell>Bot name</TableCell>
              <TableCell>Mac address</TableCell>
              <TableCell>Memo</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              // <Bot _id={row._id} name={row.name} macaddress={row.macaddress} memo={row.memo}/>
              <Bot botProp={row} action={setNeedUpdate}/>
            ))}
          </TableBody>
        </Table>
    </TableContainer>
    </div>
  );
}

export default App;
