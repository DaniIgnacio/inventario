const express = require("express");
const cors = require("cors");
const sequelize = require('./sequelize'); // Importar sequelize
const userRoutes = require('./routers/signup');

const app = express();
const port = process.env.PORT || 3100;

app.use(cors());
app.use(express.json());

app.use('/signup', userRoutes);

sequelize.sync()
    .then(() => {
        console.log('Database synced');
        app.listen(port, () => {
            console.log(`Server is running on port: ${port}`);
        });
    })
    .catch(err => {
        console.error('Unable to sync database:', err);
    });

app.get("/", (req, res) => {
    res.send("Hello World!");
});
