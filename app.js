
const express=require('express');
const app=express();
const accountExists = (email) => {
  //here we should check if the account exists
  return false
}

const createAccount = (email, password) => {
  //here we should create the account
}

app.use(express.urlencoded({extended: true}));
app.get('/',(req,res)=>{
    return res.send('Hello from the server!')
})
app.post('/login',(req,res)=>{
    console.log('Login Data Received')
    const email=req.body.email;
    console.log(email)
    const password=req.body.password;
    console.log(password);

    if(email==='test@test' && password==='test')
    {
        console.log('password valid. Hello member');
        res.redirect('http://localhost:3000/member')
        return
    }
    console.log('password invalid. You are non-member');
    res.redirect('http://localhost:3000/login')
})

app.post('/signup',(req,res)=>{
    const email=req.body.email;
    const password=req.body.password;
    const password_conf=req.body.password_conf;
    console.log(email)
    console.log(password)
    console.log(password_conf)

	if (!email || !password || !password_conf) {
    res.status(400).send('Missing data')
    return
  }

    if (accountExists(email)) {
    res.status(403).send('Account already exists')
    return
  }

  if (password !== password_conf) {
    res.status(400).send('Passwords do not match')
    return
  }

  if (password.length < 8) {
    res.status(400).send('Passwords is invalid')
    return
  }

  createAccount(email, password)
    res.status(200).send('Account created')
})



app.listen(3001,()=>console.log('Server Ready'))
