// const express = require("express");
// const childProcess = require("child_process");
import express from "express";
import childProcess from "child_process";
import { renderToString } from "react-dom/server";
import Home from "../pages/Home";
import React from "react";
import path from "path";

const app = express();

const content = renderToString(<Home />);

// 将对应的打包文件作为静态文件导入
app.use(express.static(path.resolve(process.cwd(), "client_build")));

app.get("*", (req, res) => {
    res.send(`
    <html>
        <body>
            <div id="root">${content}</div>
            <script src="/index.js"></script>
        </body>
    </html>
    `)
});

app.listen(3000, () => {
    console.log("ssr-server listen on 3000");
})

childProcess.exec("start http://127.0.0.1:3000");

