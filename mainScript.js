const express = require('express');
const app = express();
const cookies = require('cookie-parser');
const methodOverrid = require('method-override');
const Port = process.env.PORT || 8000;
app.set('view engine', 'ejs');
app.use(express.json());
app.use(cookies())
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}))
app.use(methodOverrid("_method"));



const userRouter = require('./Routes/userRoutes');
app.use('/', userRouter);
const BlogRouter = require('./Routes/blogRoutes');
app.use('/', BlogRouter);
app.use('/', (req, res) => {
    
    res.sendFile(__dirname + `/public/Html/404.html`);
});
app.listen(Port, () => {
    console.log(`Server listening at port ${process.env.Port}`);
});
