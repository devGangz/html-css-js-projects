/*** REGION 1 - Global variables - Vùng khai báo biến, hằng số, tham số TOÀN CỤC */
var gOrderInRow = []

/*** REGION 2 - Vùng gán / thực thi sự kiện cho các elements */

// 2.1 Gán sự kiện cho nút Delete
$("#modal-update-order").on("click", "#btn-delete-order", function () {
    showModalDeleteOrder()
    hideModalUpdateOrder()
})

// 2.2 Gán sự kiện cho nút OK trên modal xoá
$("#btn-delete-order-modal").on("click", function () {
    onBtnOkOnModal()
})

/*** REGION 3 - Event handlers - Vùng khai báo các hàm xử lý sự kiện */
// 3.1 Khai báo hàm khi nhấn nút Ok trên modal
function onBtnOkOnModal() {
    // Gọi Api để xoá dữ liệu
    callApiToDeleteOrder()
}

/*** REGION 4 - Common funtions - Vùng khai báo hàm dùng chung trong toàn bộ chương trình*/

// 4.1: Hàm show modal Update
function showModalDeleteOrder() {
    'use strict';
    $("#delete-order-modal").modal("show")
}
// 4.2: Hàm hide modal Update
function hideModalDeleteOrder() {
    'use strict';
    $("#delete-order-modal").modal("hide")
}

// ----------------------------------MODAL---------------------------------------------
// Hàm gọi Api để xoá dữ liệu
function callApiToDeleteOrder() {
    'use strict';
    $.ajax({
        url: "http://203.171.20.210:8080/devcamp-pizza365/orders/" + gOrderInRow.id,
        type: "DELETE",
        success: function () {
            alert("Đơn hàng đã được xoá")
            //Ẩn cái modal xuống
            hideModalDeleteOrder()
            //B4: Tải lại trang với kết quả đã thay đổi
            location.reload()
        },
        error: function (paramErr) {
            console.log(paramErr.status);
        }
    })
}
