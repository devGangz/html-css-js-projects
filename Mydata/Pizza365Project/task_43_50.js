/*** REGION 1 - Global variables - Vùng khai báo biến, hằng số, tham số TOÀN CỤC */
var gStylePizza = null
/*** REGION 2 - Vùng gán / thực thi sự kiện cho các elements */
// 2.1 Nút Seafood
$("#btn-seafood").on("click", function () {
    onBtnSeafoodClick()
})
// 2.2 Nút Hawaii
$("#btn-hawaii").on("click", function () {
    onBtnHawaiiClick()
})
// 2.3 Nút Bacon
$("#btn-bacon").on("click", function () {
    onBtnBaconClick()
})

/*** REGION 3 - Event handlers - Vùng khai báo các hàm xử lý sự kiện */
// 3.1 Khai báo hàm khi click vào nút chọn Seafood
function onBtnSeafoodClick() {
    'use strict';
    // Tạo đối tượng cho Combo
    gStylePizza = {
        loaiPizza: "SEAFOOD"
    }
    console.log("Style Pizza khi nhấn Seafood là: ");
    console.log(gStylePizza);
    // Đổi màu mấy cái nút
    $("#btn-seafood").attr("class", "btn btn-danger col-sm-12 mb-3").html("<strong>Đã chọn</strong>")
    $("#btn-hawaii").attr("class", "btn btn-light border col-sm-12 mb-3").html("<strong>Chọn</strong>")
    $("#btn-bacon").attr("class", "btn btn btn-light border col-sm-12 mb-3").html("<strong>Chọn</strong>")
    return gStylePizza
}
// 3.2 Khai báo hàm khi click vào nút chọn Hawaii
function onBtnHawaiiClick() {
    'use strict';
    // Tạo đối tượng cho Combo
    gStylePizza = {
        loaiPizza: "HAWAII"
    }
    console.log("Style Pizza khi nhấn Hawaii là: ");
    console.log(gStylePizza);
    // Đổi màu mấy cái nút
    $("#btn-seafood").attr("class", "btn btn-light border col-sm-12 mb-3").html("<strong>Chọn</strong>")
    $("#btn-hawaii").attr("class", "btn btn-danger col-sm-12 mb-3").html("<strong>Đã chọn</strong>")
    $("#btn-bacon").attr("class", "btn btn btn-light border col-sm-12 mb-3").html("<strong>Chọn</strong>")
    return gStylePizza
}

// 3.3 Khai báo hàm khi click vào nút chọn Bacon
function onBtnBaconClick() {
    'use strict';
    // Tạo đối tượng cho Combo
    gStylePizza = {
        loaiPizza: "BACON"
    }
    console.log("Style Pizza khi nhấn Bacon là: ");
    console.log(gStylePizza);
    // Đổi màu mấy cái nút
    $("#btn-seafood").attr("class", "btn btn-light border col-sm-12 mb-3").html("<strong>Chọn</strong>")
    $("#btn-hawaii").attr("class", "btn btn-light border col-sm-12 mb-3").html("<strong>Chọn</strong>")
    $("#btn-bacon").attr("class", "btn btn btn-danger col-sm-12 mb-3").html("<strong>Đã chọn</strong>")
    return gStylePizza
}
/*** REGION 4 - Common funtions - Vùng khai báo hàm dùng chung trong toàn bộ chương trình*/

