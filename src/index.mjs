import express, { response } from 'express';

const app = express();

const PORT = process.env.PORT || 3000;

const users = [
    {id: 1, username: "juan", displayName: "Brandon"},
    {id: 2, username: "lexi", displayName: "Lexi Lore"},
    {id: 3, username: "peter", displayName: "Griffin"},
    {id: 4, username: "MX", displayName: "Max"},
    {id: 5, username: "LH", displayName: "Lewis"},
    {id: 6, username: "CS", displayName: "Carlos"},
    {id: 7, username: "JP", displayName: "John Petrucci"},
];

app.get('/', (request, response) => {
    response.send({"msg": "Hello"}).status(200);
});

app.post('/api/users', (request, response) => {
    
});

app.get('/api/users', (request,  response) => {
    const {query : {filter, value}} = request;

    if (filter && value) {
        response.status(200).send(users.filter((user) => user[filter].includes(value)));
        return;
    }

    response.send(users).status(200);
});

app.get('/api/users/:id', (request, response) => {
    let id = parseInt(request.params.id);

    if(isNaN(id)) {
        response.status(400).send({
            "msg": 'Bad Request',
            "data": []
        });

        return;
    }

    let foundUser = users.filter((user) => {
        if (user.id == id) {
            return user;
        }
    });

    if (foundUser.length == 0) {
        response.status(404).send({
            "msg": 'Not Found',
            "data": []
        });
        return;
    }

    response.status(200).send({
        "msg": 'User Found',
        "data": foundUser
    });
});

app.get('/api/products', (request, response) => {
    response.send([
        { id: 123, name: 'chicken breast', price: 12.99}
    ]);
});

app.listen(PORT, () => {
    console.log(`Running on Port ${PORT}`);
});