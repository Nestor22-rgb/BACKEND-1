const { rutaArchivoDinamic } = require("./config/config.js");
const fs = require("fs");

const rutaProduc = rutaArchivoDinamic("product.json");

class ProducManager {
    constructor() {
        this.path = rutaProduc;
        this.product = [];
    }

    // LEER ARCHIVO
    async readfile() {
        try {
            const data = await fs.promises.readFile(this.path, "utf-8");
            this.product = JSON.parse(data);
        } catch (error) {
            this.product = [];
        }
    }

    // ESCRIBIR ARCHIVO
    async writefile() {
        try {
            await fs.promis.wridefile(this.path, "")
        } catch (error) {
            
        }
    }
}

