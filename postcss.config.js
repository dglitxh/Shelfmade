const tailwind = require("tailwindcss")

module.exports = {
    plugins: {
        tailwindcss("./tailwind.config.js"),

       require("autoprefixer")
    }
}