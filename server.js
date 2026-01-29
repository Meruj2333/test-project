import  'dotenv/config';

import express,{urlencoded} from 'express';
import {readFile,writeFile} from 'fs/promises';

import cors from 'cors';
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

const posts = [

]


app.get('/lists',async (req, res) => {
  let data= await readFile('posts.json', 'utf8')
    res.send(data);
})

app.get('/lists/search',async (req, res) => {

        let q = req.query.q;
    let data= await readFile('posts.json', 'utf8')
    data = JSON.parse(data)

    let values = data.filter(val => val.title.toLowerCase().includes(q.toLowerCase())||val.body.toLowerCase().includes(q.toLowerCase()));
        res.json(values);
})
app.get('/list/:id',async (req, res) => {
    let id=req.params.id;
    let data= await readFile('posts.json', 'utf8')
    data = JSON.parse(data)

    let values = data.filter(val => val.id == +id);
    res.json(values);
})
app.post('/add', async (req, res) => {
const {title, body} = req.body;
    if(!title||!body){
        return res.status(400).json({
            error:"fields empty"
        })
    }
let val={
        id:Date.now(),
            title,
            body
    }
    let data= await readFile('posts.json', 'utf8')
    data = JSON.parse(data)
    data.push(val)
    await writeFile('posts.json', JSON.stringify(data,null,2));



    res.json(val);
})
app.delete('/delete/:id', async (req, res) => {
    const id = +req.params.id;
    let data = JSON.parse(await readFile('posts.json', 'utf8'));
    data = data.filter(item => item.id !== id);
    await writeFile('posts.json', JSON.stringify(data, null, 2));
    res.json({ success: true });
});


app.listen(process.env.PORT || 3000,function(){
    console.log('Server is running');
})