const express = require('express');
const compression = require('compression');
const path = require('path');

const app = express();

app.use(compression());
app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

//const PORT = process.env.PORT || 3000;
//app.listen(PORT, () => console.log(`App is running on port ${Port}`));
app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});