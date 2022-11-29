const express = require("express");
const cors = require("cors");
const ApiError = require("./api-error");

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "Welcome to contact book application." });
});

const contactController = require("./controllers/contact.controller");

app
    .route("/api/contacts")
    .get(contactController.findAll)
    .post(contactController.create)
    .delete(contactController.deleteAll);
app.route("/api/contacts/favorite").get(contactController.findAllFavorite);
app
    .route("/api/contacts/:id(\\d+)")
    .get(contactController.findOne)
    .put(contactController.update)
    .delete(contactController.delete);

// app
//   .route("/api/contacts/:id")
//   .get(contactController.findOne)
//   .put(contactController.update)
//   .delete(contactController.delete);

app.use((req, res, next) => {
    return next(new ApiError(404, "Resource not found"));
});

app.use((error, req, res, next) => {
    return res
        .status(error.statusCode || 500)
        .json({ message: error.message || "Internal Server Error" });
});
module.exports = app;