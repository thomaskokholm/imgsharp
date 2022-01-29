require('dotenv').config()
const express = require("express");
const helmet = require("helmet");
const axios = require("axios");
const sharp = require("sharp");
const app = express();

app.use(helmet());

app.use((_req, res, next) => {
    if (process.env.ALLOWED_ORIGINS) {
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888');
    } else {
        res.setHeader('Access-Control-Allow-Origin', '*');
    }
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});


app.get("/", function (_req, res) {
    res.send("Imgsharp - a high performing Node.js Image Processing Service.");
});

app.get("/tx/*", async (req, res) => {
    try {
        if (req.params[0]) {
            const uri = encodeURI(req.params[0]);
            const query = req.query;
            console.log("tx", query, uri);

            const ref = req.get('Referrer')
            console.log("Referrer", ref);
            res.header['x-imgsharp-referrer', ref]
            axios({ url: uri, responseType: "arraybuffer" })
                .then((arraybuffer) => {
                    const data = arraybuffer.data;
                    const tx = {};
                    if (query.w) {
                        tx.width = parseInt(query.w);
                    }
                    if (query.h) {
                        tx.height = parseInt(query.h);
                    } else if (query.aspect) {
                        const a = query.aspect.split(":");
                        const ratio = parseInt(a[0]) / parseInt(a[1])
                        tx.height = Math.round(tx.width / ratio);
                    }

                    sharp(data)
                        .resize(tx)
                        .withMetadata()
                        .webp({ quality: 90 })
                        .toBuffer()
                        .then((output) => {
                            res.contentType("image/webp");
                            res.end(output);
                        })
                        .catch((sharpErr) => {
                            console.error("sharpErr", sharpErr);
                            res.status(500).send();
                        });


                })
                .catch((err) => {
                    console.error("axiosErr", err);
                    res.status(500).send();
                });
        } else {
            console.error("req.params[0] missing");
            res.status(500).send();
        }
    } catch (error) {
        res.status(500).send();
    }
});

app.listen(3000);
