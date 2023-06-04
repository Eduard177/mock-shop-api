const axios = require("axios");

module.exports = {
    async getAllOrder(req, res) {
        try {
            const response = await axios.get("https://fakestoreapi.com/products");
            const data = response.data
            res.json(data);
        } catch (error) {
            console.log("test error")
            return new CallApiError(error.message);
        }
    },

}