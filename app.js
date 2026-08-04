const express = require("express");

const app = express();

// Disable Express version disclosure
app.disable("x-powered-by");

app.get("/", (req, res) => {
    res.send("Hello Jenkins-nexus Pipeline!");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
// webhook test
