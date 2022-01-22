const express = require("express");
const helmet = require("helmet");
const axios = require("axios");
const sharp = require("sharp");
const app = express();

app.use(helmet());

app.get("/", function (_req, res) {
    res.send("Imgsharp - a high performing Node.js Image Processing Service.");
});

app.get("/tx/*", async (req, res) => {
    try {
        if (req.params[0]) {
            const uri = encodeURI(req.params[0]);
            const query = req.query;
            console.log("tx", query, uri);

            const { data } = await axios({ url: uri, responseType: "arraybuffer" });

            const tx = {};
            if (query.w) {
                tx.width = parseInt(query.w);
            }
            if (query.h) {
                tx.height = parseInt(query.h);
            }
            const output = await sharp(data).resize(tx).webp().toBuffer();

            res.contentType("image/webp");
            res.end(output);
        } else {
            res.status(500).send();
        }
    } catch (error) {
        res.status(500).send();
    }
});

app.listen(3000);
