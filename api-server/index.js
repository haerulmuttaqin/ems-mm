global.__basedir = __dirname + "/";
require("dotenv").config();
const next = require('next')
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dev = process.env.ENV !== 'production'
const port = process.env.PORT

const app = next({dev})
const handle = app.getRequestHandler()

app.prepare().then(() => {

    const server = express()
    server.use(cors({credentials: true}));
    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({extended: true}));
    server.use(express.json());
    server.use(express.urlencoded({extended: true}));

    // route
    require("./app/routes/meter.routes")(server);

    server.get("/api", (req, res) => {
        res.json({message: `Welcome to dds-base API`});
    });

    server.get('*', (req, res) => {
        return handle(req, res)
    })

    server.listen(port, (err) => {
        if (err) throw err
        console.log(`> Ready on ${process.env.BASE_URL}, in ${process.env.ENV} mode...`)
    })


}).catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
})