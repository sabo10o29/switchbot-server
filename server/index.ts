import express from 'express'
import Datastore from 'nedb'
import { PythonShell } from 'python-shell';
import { stringify } from 'qs';

const app: express.Express = express()
app.use(express.json())

const PORT = process.env.PORT || 3001;

const db = new Datastore({
    filename: './database.db',
    autoload: true
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

app.get("/bots", (req, res) => {
    console.log("get all bot.")
    db.find({}, (error: any, docs: any) => {
        const bots = {
            bots: docs
        }
        res.json(bots);
    });
});

app.put("/bot", (req, res) => {
    console.log("add a bot")

    const item = {
        name: req.body.name,
        macaddress: req.body.macaddress,
        memo: req.body.memo,
    }

    db.insert(item, function(err, newDoc: any) {
        res.json({id: newDoc._id})
    });
});

app.delete('/delete', function (req, res) {
    console.log("delete ", req.body.id)
    const query = { _id: req.body.id };
    db.remove(query, (error, numOfDocs) => {
        res.json({id: req.body.id})
    });
});

app.post('/restart', function (req, res) {
    console.log("restart ", req.body.id)
    const query = { _id: req.body.id };
    db.find(query, (error: any, Docs: any) => {
        const bot = Docs[0]
        restartTask(bot.macaddress)
        res.json({id: req.body.id})
    });
});

app.post('/press', function (req, res) {
    console.log("press ", req.body.id)
    const query = { _id: req.body.id };
    db.find(query, (error: any, Docs: any) => {
        const bot = Docs[0]
        pressTask(bot.macaddress)
        res.json({id: req.body.id})
    });
    
});

function restartTask(address: string){

}

function pressTask(address: string){
    PythonShell.runString('x=1+1;print(x)', undefined, function (err,data) {
        if (err) throw err;
        console.log(data)
        console.log('finished');
      });
}