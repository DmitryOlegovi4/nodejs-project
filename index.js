const express = require("express");
const mysql = require("mysql2");
const multer = require("multer");
const crypto = require("crypto");
const cookieParser = require("cookie-parser");
const uuid = require("uuid");
const handlebars = require('express-handlebars');
const HTMLParser = require('node-html-parser');
const fs = require('fs');
const uniqid = require('uniqid');
const index = express();
const PORT = 3000;

index.use(cookieParser('dmitry')); //secret key
index.use(express.static(`${__dirname}/public`));

index.engine(
    'handlebars',
    handlebars.engine({
        defaultLayout: 'layout',
    })
);
index.set('views', './views');
index.set('view engine', 'handlebars');


const connection = mysql.createConnection({
    host: "bqcrjka5bwtvebrem2u6-mysql.services.clever-cloud.com",
    user: "ulsfrvenjystf4av",
    password: "eDzPz4CCUgZl3MqL8rI2",
    database: "bqcrjka5bwtvebrem2u6"
})
connection.connect((error)=>{
    if(error) throw error
    console.log("Подключение к БД установлено")
})

index.get("/", (req, res)=>{
    res.render('main', {
        title: "Home",
        heading: "Node.JS",
        subheading: "Пример сайта на Express с помощью шаблонизатора Handlebars",
        content: `<div class="text-center">Привет, меня зовут Дмитрий! <br> И это пример сайта, реализованного на базе шаблона bootstrap. <br> <b>Используется Express и шаблонизатора Handlebars.</b> <br> Реализована регистрация, авторизация, отрисовка данных из БД, добавление новых данных в БД и т.д.</div>`,
        img_bg: 'home',
        type_page: "site",
    })
})
index.get("/about", (req, res)=>{
    res.render('main', {
        title: "About",
        heading: "About Me",
        subheading: "This is what I do.",
        content: '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe nostrum ullam eveniet pariatur voluptates odit, fuga atque ea nobis sit soluta odio, adipisci quas excepturi maxime quae totam ducimus consectetur?</p>\n <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius praesentium recusandae illo eaque architecto error, repellendus iusto reprehenderit, doloribus, minus sunt. Numquam at quae voluptatum in officia voluptas voluptatibus, minus!</p>\n <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut consequuntur magnam, excepturi aliquid ex itaque esse est vero natus quae optio aperiam soluta voluptatibus corporis atque iste neque sit tempora!</p>',
        img_bg: 'about',
        type_page: "page",
    })
})
index.get("/posts", (req, response)=>{
    connection.query("SELECT * FROM articles",
        (error,res,metaData)=>{
            if(res.length){
                response.render('main', {
                    title: "Posts",
                    heading: "Список всех статей",
                    posts: res,
                    img_bg: 'posts',
                    type_page: "post",
                })

            }
            else{
                response.render('main', {
                    title: "Posts",
                    heading: "Man must explore, and this is exploration at its greatest",
                    subheading: "Problems look mighty small from 150 miles up",
                    meta: `Posted by\n <a href="#">Start Bootstrap</a>\n on August 24, 2022`,
                    content: `<p>Never in all their history have men been able truly to conceive of the world as one: a single sphere, a globe, having the qualities of a globe, a round earth in which all the directions eventually meet, in which there is no center because every point, or none, is center — an equal earth which all men occupy as equals. The airman's earth, if free men make it, will be truly round: a globe in practice, not in theory.</p>
                        <p>Science cuts two ways, of course; its products can be used for both good and evil. But there's no turning back from science. The early warnings about technological dangers also come from science.</p>
                        <p>What was most significant about the lunar voyage was not that man set foot on the Moon but that they set eye on the earth.</p>
                        <p>A Chinese tale tells of some men sent to harm a young girl who, upon seeing her beauty, become her protectors rather than her violators. That's how I felt seeing the Earth for the first time. I could not help but love and cherish her.</p>
                        <p>For those who have seen the Earth from space, and for the hundreds and perhaps thousands more who will, the experience most certainly changes your perspective. The things that we share in our world are far more valuable than those which divide us.</p>
                        <h2 class="section-heading">The Final Frontier</h2>
                        <p>There can be no thought of finishing for ‘aiming for the stars.’ Both figuratively and literally, it is a task to occupy the generations. And no matter how much progress one makes, there is always the thrill of just beginning.</p>
                        <p>There can be no thought of finishing for ‘aiming for the stars.’ Both figuratively and literally, it is a task to occupy the generations. And no matter how much progress one makes, there is always the thrill of just beginning.</p>
                        <blockquote class="blockquote">The dreams of yesterday are the hopes of today and the reality of tomorrow. Science has not yet mastered prophecy. We predict too much for the next year and yet far too little for the next ten.</blockquote>
                        <p>Spaceflights cannot be stopped. This is not the work of any one man or even a group of men. It is a historical process which mankind is carrying out in accordance with the natural laws of human development.</p>
                        <h2 class="section-heading">Reaching for the Stars</h2>
                        <p>As we got further and further away, it [the Earth] diminished in size. Finally it shrank to the size of a marble, the most beautiful you can imagine. That beautiful, warm, living object looked so fragile, so delicate, that if you touched it with a finger it would crumble and fall apart. Seeing this has to change a man.</p>
                        <a href="#"><img class="img-fluid" src="assets/img/post-sample-image.jpg" alt="..." /></a>
                        <span class="caption text-muted">To go places and do things that have never been done before – that’s what living is all about.</span>
                        <p>Space, the final frontier. These are the voyages of the Starship Enterprise. Its five-year mission: to explore strange new worlds, to seek out new life and new civilizations, to boldly go where no man has gone before.</p>
                        <p>As I stand out here in the wonders of the unknown at Hadley, I sort of realize there’s a fundamental truth to our nature, Man must explore, and this is exploration at its greatest.</p>
                        <p>
                            Placeholder text by
                            <a href="http://spaceipsum.com/">Space Ipsum</a>
                            &middot; Images by
                            <a href="https://www.flickr.com/photos/nasacommons/">NASA on The Commons</a>
                        </p>`,
                    img_bg: 'post',
                    type_page: "post",
                })
            }
        })

})
index.get("/contact", (req, res)=>{
    res.render('main', {
        title: "Contact",
        heading: "Contact Me",
        subheading: "Have questions? I have answers.",
        content: `<p>Want to get in touch? Fill out the form below to send me a message and I will get back to you as soon as possible!</p>
                        <div class="my-5">
                            <form id="contactForm" data-sb-form-api-token="API_TOKEN">
                                <div class="form-floating">
                                    <input class="form-control" id="name" type="text" placeholder="Enter your name..." data-sb-validations="required" />
                                    <label for="name">Name</label>
                                    <div class="invalid-feedback" data-sb-feedback="name:required">A name is required.</div>
                                </div>
                                <div class="form-floating">
                                    <input class="form-control" id="email" type="email" placeholder="Enter your email..." data-sb-validations="required,email" />
                                    <label for="email">Email address</label>
                                    <div class="invalid-feedback" data-sb-feedback="email:required">An email is required.</div>
                                    <div class="invalid-feedback" data-sb-feedback="email:email">Email is not valid.</div>
                                </div>
                                <div class="form-floating">
                                    <input class="form-control" id="phone" type="tel" placeholder="Enter your phone number..." data-sb-validations="required" />
                                    <label for="phone">Phone Number</label>
                                    <div class="invalid-feedback" data-sb-feedback="phone:required">A phone number is required.</div>
                                </div>
                                <div class="form-floating">
                                    <textarea class="form-control" id="message" placeholder="Enter your message here..." style="height: 12rem" data-sb-validations="required"></textarea>
                                    <label for="message">Message</label>
                                    <div class="invalid-feedback" data-sb-feedback="message:required">A message is required.</div>
                                </div>
                                <br />
                                <div class="d-none" id="submitSuccessMessage">
                                    <div class="text-center mb-3">
                                        <div class="fw-bolder">Form submission successful!</div>
                                        To activate this form, sign up at
                                        <br />
                                        <a href="https://startbootstrap.com/solution/contact-forms">https://startbootstrap.com/solution/contact-forms</a>
                                    </div>
                                </div>
                                <div class="d-none" id="submitErrorMessage"><div class="text-center text-danger mb-3">Error sending message!</div></div>
                                <button class="btn btn-primary text-uppercase disabled" id="submitButton" type="submit">Send</button>
                            </form>
                        </div>
                        <script src="https://cdn.startbootstrap.com/sb-forms-latest.js"></script>`,
        img_bg: 'contact',
        type_page: "page",
    })
})

index.get("/reg", (req, res)=>{
    res.render('reg', {
        title: "Registration",
        heading: "Регистрация пользователя",
        img_bg: 'reg',
        type_page: "page",
    })
    // res.sendFile(__dirname + "/reg.html");
})
index.get("/login", (req, res)=>{
    res.render('login', {
        title: "LogIn",
        heading: "Авторизация пользователя",
        img_bg: 'login',
        type_page: "page",
    })
    // res.sendFile(__dirname + "/auth.html");
})
index.get("/lk", (req, res)=>{
    let token = req.cookies['user_token'] == null ? undefined : req.cookies['user_token'];
    connection.query("SELECT * FROM users WHERE user_token = ?", [token], (err, result)=>{
        if(result.length){
            let user = {
                id: result[0].id,
                name: result[0].name,
                lastname: result[0].lastname,
                email: result[0].email
            }
            res.render('lk',{user,
                title: "Personal account",
                heading: "Личный кабинет",
                img_bg: 'lk',
                type_page: "page",})
            // res.send("<h1>Личный кабинет</h1>");
        }else{
            res.send(`<style>*{text-align: center}b{color:red}</style><b>Доступ запрещён</b> <br> <a href='/'>Go to Home page</a>`);
        }
    })
})
index.get("/logout", (req, res)=>{
    res.clearCookie('user_token');
    res.send("<h3> Log Out </h3> \n <a href='/'>Go to Home page</a>")
})
index.get("/addArticle", (req, res)=>{
    let token = req.cookies['user_token'] == null ? undefined : req.cookies['user_token'];
    connection.query("SELECT * FROM users WHERE user_token = ?", [token], (err, result)=>{
        if(result.length){
            res.render('addArticle',{
                title: "Add article",
                heading: "Добавить статью",
                img_bg: 'addArticle',
                type_page: "page",})
            // res.send("<h1>Личный кабинет</h1>");
        }else{
            res.send(`<style>*{text-align: center}b{color:red}</style><b>Доступ запрещён</b> <br> <a href='/'>Go to Home page</a>`);
        }
    })
})

index.post("/reg", multer().none(), (req, response)=>{
    let sentResult = "success";
    const email = req.body.email.toLowerCase();
    const hashPass = crypto
        .createHash('sha256', 'back02')
        .update(req.body.pass)
        .digest("hex");
    connection.query("SELECT id FROM users WHERE email=?", [email],
        (error,res,metaData)=>{
            if(res.length){
                console.log("exist");
                sentResult = "exist";
                response.send(sentResult);
            }
            else{
                let user = [req.body.name, req.body.lastname, email, hashPass];
                connection.query("INSERT INTO `users`(`name`, `lastname`, `email`, `pass`) VALUES (?,?,?,?)", user,(error,result,metaData)=>{
                    console.log(error);
                    console.log(result);
                    response.send(sentResult);
                })
            }
    })
})
index.post("/login", multer().none(), (req, response) => {
    const email = req.body.email.toLowerCase();
    connection.query("SELECT * FROM users WHERE email=? ", [email], (error, res,metaData)=>{
        if(res.length){
            const hashPass = crypto
                .createHash('sha256', 'back02')
                .update(req.body.pass)
                .digest("hex");
            if(hashPass === res[0].pass){
                let uid = uuid.v4();
                connection.query("UPDATE users SET user_token=? WHERE id=?", [uid, res[0].id]);
                response.cookie('user_token', uid);
                console.log('Log In success');
                response.send('success')
            }else{
                console.log("Pass is not correct");
                response.send('error pass')
            }
        }else{
            console.log("Email is not correct");
            response.send('error email')
        }
    })
})
index.post("/addArticle", multer().none(), (req, response)=>{
    let root = HTMLParser.parse(req.body.content);
    let imgs = root.querySelectorAll("img");
    imgs.forEach( img => {
        let src = img.getAttribute('src').split(",");
        let imgBuf = Buffer.from(src[1], "base64");
        let imgName = uniqid() + "." + src[0].split("/")[1].split(";")[0];
        fs.writeFileSync(`./public/assets/img/content/${imgName}`, imgBuf);
        img.setAttribute("src", `/assets/img/content/${imgName}`);
    })
    let article = [req.body.title, req.body.author, root.toString()];
    connection.query("INSERT INTO articles (`title`, `author`, `content`) VALUES (?,?,?)", article, (err, result)=>{
        console.log(result);
        response.send("success");
    })
})

index.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server started on port ${PORT}`)
})

