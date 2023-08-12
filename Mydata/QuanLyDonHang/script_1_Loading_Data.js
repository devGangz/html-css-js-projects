
/*** REGION 1 - Global variables - Vùng khai báo biến, hằng số, tham số TOÀN CỤC */
// Khai báo dữ liệu khoá học
var gAllOrders = [];
var gSTT = 1;
// Khai báo mảng tên cột
const gCOL_NAME = ["stt", "orderCode", "kichCo", "loaiPizza", "idLoaiNuocUong", "thanhTien", "hoTen", "soDienThoai", "trangThai", "action"]
// Khai báo số thứ tự cột
const gCOL_STT = 0;
const gCOL_ORDER_CODE = 1;
const gCOL_KICK_CO = 2;
const gCOL_LOAI_PIZZA = 3;
const gCOL_LOAI_NUOC_UONG = 4;
const gCOL_THANH_TIEN = 5;
const gCOL_HO_TEN = 6;
const gCOL_SO_DIEN_THOAI = 7;
const gCOL_TRANG_THAI = 8;
const gCOL_CHI_TIET = 9;

// Khai báo datatable và mapping column
var gPizzaOrder = $("#pizza-order-table").DataTable({

    data: gAllOrders,
    columns: [
        { data: gCOL_NAME[gCOL_STT] },
        { data: gCOL_NAME[gCOL_ORDER_CODE] },
        { data: gCOL_NAME[gCOL_KICK_CO] },
        { data: gCOL_NAME[gCOL_LOAI_PIZZA] },
        { data: gCOL_NAME[gCOL_LOAI_NUOC_UONG] },
        { data: gCOL_NAME[gCOL_THANH_TIEN] },
        { data: gCOL_NAME[gCOL_HO_TEN] },
        { data: gCOL_NAME[gCOL_SO_DIEN_THOAI] },
        { data: gCOL_NAME[gCOL_TRANG_THAI] },
        { data: gCOL_NAME[gCOL_CHI_TIET] },
    ],
    columnDefs: [
        {
            targets: gCOL_STT,
            render: function () {
                return gSTT++
            }
        },
        {   // Thêm nút chi tiết
            targets: gCOL_CHI_TIET,
            defaultContent:
                '<button class="btn btn-primary btn-sm" id="btn-chi-tiet">Chi tiết</button>'
        },
        {   // Hiển thị đơn vị tiền tệ
            targets: gCOL_THANH_TIEN,
            render: function (data) {
                return data + " ₫"
            }
        },
        {
            // Đổi màu
            targets: gCOL_TRANG_THAI,
            render: doiMauTrangThai
        }
    ]
})

/*** REGION 2 - Vùng gán / thực thi sự kiện cho các elements */
$(document).ready(function () {
    // Gọi api trước để lấy các biến gAllOrders;
    callApiToGetPizzaOrderArr()
    console.log("Mảng đơn hàng lấy về được là: ");
    console.log(gAllOrders);
    onPageLoading()
})

/*** REGION 3 - Event handlers - Vùng khai báo các hàm xử lý sự kiện */

// 3.1 Khai báo hàm tải lại trang
function onPageLoading() {
    'use strict';
    // Load dữ liệu vào bảng
    loadDataToTable(gAllOrders)
}

/*** REGION 4 - Common funtions - Vùng khai báo hàm dùng chung trong toàn bộ chương trình*/

//4.1 Gọi Api để lấy dữ liệu của sản phẩm
function callApiToGetPizzaOrderArr() {
    'use strict';
    $.ajax({
        url: "https://203.171.20.210:8080/devcamp-pizza365/orders",
        type: "GET",
        async: false,
        success: function (responseArr) {
            gAllOrders = responseArr
            return gAllOrders
        },
        error: function (ajaxContext) {
            console.log(ajaxContext.status);
        },
    })
}

//4.2 Khai báo hàm đổ dữ liệu vào bảng
function loadDataToTable(paramData) {
    'use strict';
    gPizzaOrder.clear();
    gPizzaOrder.rows.add(paramData);
    gPizzaOrder.draw()
}

//4.3 Khai báo hàm đổi màu trạng thái
function doiMauTrangThai(paramRow) {
    if (paramRow == "open") {
        return $("<p>").text("open").attr("class", "btn-light btn-sm border col-sm-7 mx-auto").wrap('<div></div>').parent().html()
    }
    if (paramRow == "confirmed") {
        return $("<p>").text("confirmed").attr("class", "btn-success btn-sm border col-sm-7 mx-auto").wrap('<div></div>').parent().html()
    }
    if (paramRow == "cancel") {
        return $("<p>").text("cancelled").attr("class", "btn-danger btn-sm border col-sm-7 mx-auto").wrap('<div></div>').parent().html()
    }
    else { return paramRow }
}
