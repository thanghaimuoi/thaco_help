const CategoryLogic = require("../logic/CategoryLogic.js")

require("./db.js")
CategoryLogic.insert({
    name: "Thư mục gốc",
    parent: null
}).then(() => {
    console.log("Tạo thành công thư mục gốc");
})