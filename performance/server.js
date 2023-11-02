const express = require('express');
const app = express();
const cluster = require('cluster');
const os = require('os');

function delay(duration) {
   const startTime = Date.now();
   while (Date.now() - startTime < duration) {
    
   }
}

app.get('/', (req, res) => {
    res.send(`performance exm${process.pid}`)
})
app.get('/timer', (req, res) => {
    delay(9000)
    res.send(`performance exm${process.pid}`)
})

if (cluster.isMaster) {
    console.log("master has been started..");
    const NUM_WORKERS = os.cpus().length;
    for (let index = 0; index < NUM_WORKERS; index++) {
        cluster.fork()
    }
} else {
    console.log("worker process started..");
    app.listen(3001)
}
