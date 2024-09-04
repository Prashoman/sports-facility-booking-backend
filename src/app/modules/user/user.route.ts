import  express  from "express";

const route = express.Router();

route.get('/users', (req, res) => {
  res.send('Hello World!');
});
route.post('/signup', (req, res) => {
    res.send('Hello World!');
    });


export const UserRoute = route;