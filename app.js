const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3000;
const fs = require('fs');
const { v4: uuidv4 } = require('uuid')
let jsonData = JSON.parse(fs.readFileSync('data.json'));
let editUser;

const app = express();

app.set('views', path.join(__dirname, 'pages'));
app.set('view engine', 'pug');

app.use(express.urlencoded({ extended: false }));


app.get('/', (req, res) => {
    res.render('landing', { 'data': jsonData.users });
})

app.get('/create', (req, res) => {
    res.render('create');
})

app.get('/listing', (req, res) => {
    res.render('listing', { 'data': jsonData.users });
})



app.post('/listing:user', (req, res) => {
    let id = req.params.user
    jsonData.users.forEach(element => {
        if (element.uniqueId == id) {
            jsonData.users.splice(jsonData.users.indexOf(element), 1);
            fs.writeFileSync('data.json', JSON.stringify(jsonData));
        }
    });
    res.redirect('/listing');
})

app.post('/edit:user', (req, res) => {

    let userId = req.params.user;
    jsonData.users.forEach(element => {
        if (element.uniqueId == userId) {
            editUser = element;
            jsonData.users.splice(jsonData.users.indexOf(element), 1);
        }
    });
    //put the edit inside of the post so that the user can't get to the edit page without picking a user first
    app.get('/edit', (req, res) => {
        res.render('edit', { 'user': editUser });
        editUser = {};
    })
    res.redirect('/edit');
})

app.post('/create', (req, res) => {
    let tempObj = {};

    tempObj['uniqueId'] = uuidv4();
    tempObj['name'] = req.body.name;
    tempObj['username'] = req.body.username;
    tempObj['email'] = req.body.email;
    tempObj['age'] = req.body.age;
    res.redirect('/listing');
    jsonData.users.push(tempObj);
    fs.writeFileSync('data.json', JSON.stringify(jsonData));
})

app.listen(PORT, () => {
    console.log(`Listing on port ${PORT}`);
})