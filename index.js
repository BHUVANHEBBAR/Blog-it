import express from 'express';
import bodyParser from 'body-parser';
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

var posts=[];
app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));

const defaultUser  ={
    username : 'admin',
    password : '123'
};


app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/index.html");
});

app.get('/login',(req,res)=>{
    res.render('login.ejs');
});

app.post('/login',(req,res)=>{

    const {username , password} = req.body;

    if(username === defaultUser.username && password === defaultUser.password){
        res.redirect('/post-create.html');
        console.log('success');
    }
    else{
        res.render('login.ejs', { error: 'Invalid username or password' });
    }
});


app.post('/post-create',(req,res)=>{
    const {title , content}=req.body;

    const newPost ={
        postTitle : title,
        postContent : content,
        postID: posts.length+1
    };

    posts.push(newPost);
    console.log(posts);
    console.log("New post created");
    res.redirect("posts");
});

app.get('/posts',(req,res)=>{
    res.render('posts.ejs',{posts:posts});
});

app.post('/delete/:postID',(req,res)=>{
    const posttodelete = req.params.postID;
    posts = posts.filter(post => post.postID !== parseInt(posttodelete));
    console.log("Deleted post!");
    res.redirect('/posts');

});
app.listen(port,()=>{
    console.log("Listening on port" + port);
});

