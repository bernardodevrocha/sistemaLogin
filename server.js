const express = require('express');
const app = express();
const bcrypt = require('bcrypt');

app.use(express.json());

const users = [];

app.get('/users', (req, res) => {
  res.json(users);
});

app.post('/users', async (req, res) => {
  try{
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
  
  const user = {name: req.body.name, password: hashedPassword};
  users.push(user);
  res.status(201).send();
  } catch(e){
    res.status(500).send();
  }
})

app.post('/users/login', async (req, res) => {
  const user = users.find(user => user.name = req.body.name);
if(user == null) return res.status(400).send("Usuário não encontrado");

  try{
    bcrypt.compare(req.body.password, user.password);
  } catch(e){
    res.status(500),send();
  }
})

app.listen(3000);