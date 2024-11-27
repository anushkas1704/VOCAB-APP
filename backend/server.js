const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send("Hello from the Vocabulary App Backend!");
});

app.listen(3001, () => console.log('Backend running on port 3001'));
