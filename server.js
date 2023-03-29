import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 8090;

app.use(cors());
app.use(express.json());

let savedState = {
    auth: {
        loggedIn: false,
    }, count: {
        value: 0,
    }
};

app.get('/state', (req, res) => {
    res.json(savedState);
});

app.post('/state', (req, res) => {
    savedState = {...req.body};
    res.json('saved state');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});