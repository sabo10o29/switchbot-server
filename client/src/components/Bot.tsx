import { TableCell, TableRow } from "@material-ui/core";

export const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};

export interface BotProps {
  botProp: BotProp;
  action: React.Dispatch<React.SetStateAction<boolean>>
}

export interface BotProp {
　_id: Number;
  name: string;
  macaddress: string;
  memo: string
}

export default function Bot(props: BotProps) {
  // const { _id, name, macaddress, memo } = props;
  const {botProp, action} = props;
  const _id = botProp._id;
  const name = botProp.name;
  const macaddress = botProp.macaddress;
  const memo = botProp.memo;

  const deleteBot = () => {
    console.log("delete")
    const obj = {id: _id};
    const method = "DELETE";
    const body = JSON.stringify(obj);
    fetch("/delete", {method, headers, body})
      .then((res)=> res.json())
      .then(()=>{
        action(true)
      })
      .catch(console.error);
  };

  const press = () => {
    console.log("press")
    const obj = {id: _id};
    const method = "POST";
    const body = JSON.stringify(obj);
    fetch("/press", {method, headers, body}).then((res)=> res.json()).then(console.log).catch(console.error);
  };

  const restart = () => {
    console.log("restart")
    const obj = {id: _id};
    const method = "POST";
    const body = JSON.stringify(obj);
    fetch("/restart", {method, headers, body}).then((res)=> res.json()).then(console.log).catch(console.error);
  };

  return (
    <TableRow key={macaddress}>
      <TableCell>{name}</TableCell>
      <TableCell>{macaddress}</TableCell>
      <TableCell>{memo}</TableCell>
      <TableCell>
          <button onClick={deleteBot}>削除</button>
      </TableCell>
      <TableCell>
          <button onClick={press}>起動/停止</button>
      </TableCell>
      <TableCell>
          <button onClick={restart}>再起動</button>
      </TableCell>
    </TableRow>
  );
}