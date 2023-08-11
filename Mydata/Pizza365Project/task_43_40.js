/*** REGION 1 - Global variables - Vùng khai báo biến, hằng số, tham số TOÀN CỤC */
var gComboPizza = null
/*** REGION 2 - Vùng gán / thực thi sự kiện cho các elements */
// 2.1 Nút Small
$("#btn-small").on("click", function () {
    onBtnSmallClick()
})
// 2.2 Nút Medium
$("#btn-medium").on("click", function () {
    onBtnMediumClick()
})
// 2.3 Nút Larger
$("#btn-large").on("click", function () {
    onBtnLargeClick()
})

/*** REGION 3 - Event handlers - Vùng khai báo các hàm xử lý sự kiện */
// 3.1 Khai báo hàm khi click vào nút chọn Small
function onBtnSmallClick() {
    'use strict';
    // Tạo đối tượng cho Combo
    gComboPizza = {
        kichCo: "S",
        duongKinh: "20cm",
        suon: 2,
        salad: 200,
        soLuongNuoc: 2,
        thanhTien: 150000
    }
    console.log("Combo khi nhấn nút Small");
    console.log(gComboPizza);
    // Đổi màu mấy cái nút
    $("#btn-small").attr("class", "btn btn-danger col-sm-12").html("<strong>Đã chọn</strong>")
    $("#btn-medium").attr("class", "btn btn-light border col-sm-12").html("<strong>Chọn</strong>")
    $("#btn-large").attr("class", "btn btn btn-light border col-sm-12").html("<strong>Chọn</strong>")
    return gComboPizza
}
// 3.2 Khai báo hàm khi click vào nút chọn Medium
function onBtnMediumClick() {
    'use strict';
    // Tạo đối tượng cho Combo
    gComboPizza = {
        kichCo: "M",
        duongKinh: "25cm",
        suon: 4,
        salad: 300,
        soLuongNuoc: 3,
        thanhTien: 200000
    }
    console.log("Combo khi nhấn nút Medium");
    console.log(gComboPizza);
    // Đổi màu mấy cái nút
    $("#btn-small").attr("class", "btn btn-light border col-sm-12").html("<strong>Chọn</strong>")
    $("#btn-medium").attr("class", "btn btn-danger col-sm-12").html("<strong>Đã chọn</strong>")
    $("#btn-large").attr("class", "btn btn btn-light border col-sm-12").html("<strong>Chọn</strong>")
    return gComboPizza
}

// 3.3 Khai báo hàm khi click vào nút chọn Large
function onBtnLargeClick() {
    'use strict';
    // Tạo đối tượng cho Combo
    gComboPizza = {
        kichCo: "L",
        duongKinh: "30cm",
        suon: 8,
        salad: 500,
        soLuongNuoc: 4,
        thanhTien: 250000
    }
    console.log("Combo khi nhấn nút Large");
    console.log(gComboPizza);
    // Đổi màu mấy cái nút
    $("#btn-small").attr("class", "btn btn-light border col-sm-12").html("<strong>Chọn</strong>")
    $("#btn-medium").attr("class", "btn btn-light border col-sm-12").html("<strong>Chọn</strong>")
    $("#btn-large").attr("class", "btn btn btn-danger col-sm-12").html("<strong>Đã chọn</strong>")
    return gComboPizza
}

/*** REGION 4 - Common funtions - Vùng khai báo hàm dùng chung trong toàn bộ chương trình*/

