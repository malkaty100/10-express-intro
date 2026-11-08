// Express.js Intro - write your server here.
// Run it with: node index.js   (stop it with Ctrl + C)
 import express from 'express' 
const app=express()
app.use(express.json())
const PORT=3000
app.listen(PORT)
// Part 1: create an express app, a GET /greet endpoint and app.listen(3000)
app.get('/greet',(req,res)=>{
    res.json({ "msg": "hi from get endpoint "+new Date().toISOString() })
})
// Part 2: GET /greet/:name  and  GET /test (calls /greet/:name with fetch)
app.get('/greet/:name',(req,res)=>{
    let {name}=req.params
    console.log(`i got name: ${name}`);
    res.json({ 'msg': `got name: ${name}`})
})
app.get('/test',async (req,res)=>{
    let name="alice"
    const data=await fetch(`http://localhost:3000/greet/${name}`)
    const response=await data.json()
    
    if(response.msg&&response.msg.split(":")?.[1].trim()==name){
        res.json({ "result": "ok" })
    }
    else
        res.json({ "result": "fail" })
})
// Part 3: POST /action  ("joke" / "cat fact", otherwise 400 "body is malformed")
app.post('/action',async (req,res)=>{
if(!req.body||(req.body?.action!='joke'&&req.body?.action!='cat fact'))  {
res.status(400)
res.json({ "msg": "body is malformed" })
}    
const {action}=req.body
if(action==='joke'){
const request=await fetch("https://v2.jokeapi.dev/joke/Any?type=single&safe-mode")
const data=await request.json()
res.json({"joke":data.joke.toUpperCase()})
}
if(action==='cat fact'){
const request = await fetch('https://api.thecatapi.com/v1/images/search?limit=11',{headers: { "x-api-key":process.env.CAT_API_KEY}})
const data=await request.json()
res.json({ "length":data.length })
}
})