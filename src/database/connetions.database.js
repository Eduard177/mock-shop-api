const mongoose = require("mongoose")
const {Configuration} = require("../config/config.key");
const {ConfigService} = require("../config/")

const config = new ConfigService();
function connectionDB (){
    mongoose.connect(config.get(Configuration.MONGO_URI))
        .then(() => {
            console.log("Connected to the database!");
        })
        .catch(err => {
            console.log("Cannot connect to the database!", err);
            process.exit();
        });
}

module.exports = {connectionDB}
