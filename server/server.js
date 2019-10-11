const path = require('path');
const express = require('express');

publicPath = path.join(__dirname, '../public');
let port = process.env.PORT || 3000;
let app = express();

app.use(express.static(publicPath));

app.listen(port, () => {
    console.log(`server is up on port 3000 ${port}`);
});