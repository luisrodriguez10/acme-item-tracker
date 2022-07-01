const { User } = require('./db/User');
const { Thing } = require('./db/Thing');
const express = require('express');
const app = express();
const path = require('path');
const {seeder} = require('./db')

app.use(express.json());
app.use('/dist', express.static('dist'));

app.get('/', (req, res)=> res.sendFile(path.join(__dirname, 'index.html')));


app.post('/api/things', async(req, res, next)=> {
  try {
    res.status(201).send(await Thing.create(req.body));
  }
  catch(ex){
    next(ex);
  }
});
app.get('/api/things', async(req, res, next)=> {
  try {
    res.send(await Thing.findAll());
  }
  catch(ex){
    next(ex);
  }
});

app.get('/api/users', async(req, res, next)=> {
  try {
    res.send(await User.findAll());
  }
  catch(ex){
    next(ex);
  }
});


const port = process.env.PORT || 3000;

app.listen(port, ()=> console.log(`listening on port ${port}`));

const init = async()=> {
  try {
    // await conn.sync({ force: true });
    // const [moe, larry, lucy, ethyl] = await Promise.all(
    //   ['moe', 'larry', 'lucy', 'ethyl'].map( name => User.create({ name }))
    // );
    // const [foo, bar, bazz, quq, fizz] = await Promise.all(
    //   ['foo', 'bar', 'bazz', 'quq', 'fizz'].map( name => Thing.create({ name }))
    // );
    await seeder();
  }
  catch(ex){
    console.log(ex);
  }
};

init();
