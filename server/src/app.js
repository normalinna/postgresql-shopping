const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");
const hpp = require("hpp")
const compression = require("compression")

const errorMiddleware = require("./middleware/error.middleware")
const DB = require("./database")

class App {
    constructor(routes) {
        this.app = express();
        this.port = process.env.PORT || 3001;
        this.env = process.env.NODE_ENV || "development";

        this.connectToDataBase();
        this.initializeMiddleware();
        this.initializeRoutes(routes);
        this.initializeErrorHandling();
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
        });
    };

    getServer() {
        return this.app;
    }

    connectToDataBase() {
        DB.sequelize.sync({force: false, alter: true})
    }

    initializeMiddleware() {
        if (this.env === "production") {
            this.app.use(cors({ origin: "https://", credentials: true }));
        } else if (this.env === "development") {
            this.app.use(cors({ origin: true, credentials: true }));
        }

        this.app.use(hpp());
        this.app.use(helmet());
        this.app.use(compression());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));
        this.app.use(cookieParser());
    }

    initializeRoutes(routes) {
        routes.forEach((route) => {
            this.app.use("/", route.router);
        })
    }

    initializeErrorHandling() {
        this.app.use(errorMiddleware);
    }
}

module.exports = App;
