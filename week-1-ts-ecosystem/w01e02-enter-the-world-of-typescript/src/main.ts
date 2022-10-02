import { root } from "./shop/root.component";

function mian() {
    const app = document.querySelector('#app')??document.body;
    app.appendChild(root());
}

mian();