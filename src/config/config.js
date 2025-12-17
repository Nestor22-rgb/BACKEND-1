const path = require("path");

const rutaArchivoDinamic = function (nameFile) {
    const mypath = path.join(__dirname, "..", "..", "data", nameFile);
    return mypath;
};



module.exports = { rutaArchivoDinamic };
