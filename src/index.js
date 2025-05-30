import "./styles/main.css";
import { init } from "./app/app.js";

document.addEventListener("DOMContentLoaded", () => {
    init(document.getElementById("content"));
});