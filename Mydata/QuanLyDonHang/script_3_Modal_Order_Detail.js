/*** REGION 1 - Global variables - Vùng khai báo biến, hằng số, tham số TOÀN CỤC */
var gOrderInRow = []
var gOrderDetail = {
    orderCode: "",
    kichCo: "",
    duongKinh: "",
    suon: "",
    salad: "",
    loaiPizza: "",
    idVourcher: "",
    thanhTien: "",
    giamGia: "",
    idLoaiNuocUong: "",
    soLuongNuoc: "",
    hoTen: "",
    email: "",
    soDienThoai: "",
    diaChi: "",
    loiNhan: "",
    ngayCapNhat: "",
    ngayTao: "",
    trangThai: "open"
}

/*** REGION 2 - Vùng gán / thực thi sự kiện cho các elements */

// 2.1 Gán sự kiện cho nút chi tiết 
$("#pizza-order-table").on("click", "#btn-chi-tiet", function () {
    //  Thu thập dữ liệu ẩn trong hàng
    getDataFromRow(this)
    // Gán sự kiện len nút chi tiết
    onChiTietBtnClick(this)
})

// 2.2 Gán sự kiện cho nút Confirm
$("#modal-update-order").on("click", "#btn-confirm-order", function () {
    onBtnConfirmClick()
})

// 2.3 Gán sự kiện cho nút Cancel
$("#modal-update-order").on("click", "#btn-cancel-order", function () {
    onBtnCancelClick()
})

// 2.3 Gán sự kiện cho nút Open
$("#modal-update-order").on("click", "#btn-open-order", function () {
    onBtnOpenClick()
})


/*** REGION 3 - Event handlers - Vùng khai báo các hàm xử lý sự kiện */
// 3.1 Khai báo hàm xử lý sự kiện khi nhấn nút edit
function onChiTietBtnClick(paramButton) {
    // Hiện cái modal update lên
    showModalUpdateOrder()
    // Clear Data tren modal update
    clearDataOnModalUpdate()
    // Đẩy dữ liệu vào form modal thông qua Id
    loadDataToFormModalUpdate()
}

// 3.2 Khai báo hàm khi click nút confirm.
function onBtnConfirmClick() {
    //B1: Thu thập thông tin đối tượng
    thuThapThongTinOrder(gOrderDetail)
    console.log("Id confirmed là: ", gOrderInRow.id);
    //B2: Kiểm tra thông tin đối tượng
    var vResult = validateInforOrder(gOrderDetail)
    //B3: Gọi Api để sửa dữ liệu
    if (vResult) {
        // sửa lại trạng thái trước khi gửi đi
        gOrderDetail.trangThai = "confirmed"
        callApiToChangeStatus(gOrderDetail)
    }
    //B4: Tải lại trang để xem kết quả trạng thái đã thay đổi (đã làm trong bước 3)
}

// 3.3 Khai báo hàm khi click nút cancel.
function onBtnCancelClick() {
    //B1: Thu thập thông tin đối tượng
    thuThapThongTinOrder(gOrderDetail)
    console.log("Id cancel là: ", gOrderInRow.id);
    //B2: Kiểm tra thông tin đối tượng
    var vResult = validateInforOrder(gOrderDetail)
    //B3: Gọi Api để sửa dữ liệu
    if (vResult) {
        // sửa lại trạng thái trước khi gửi đi
        gOrderDetail.trangThai = "cancel"
        callApiToChangeStatus(gOrderDetail)
    }
}

// 3.3 Khai báo hàm khi click nút Open.
function onBtnOpenClick() {
    //B1: Thu thập thông tin đối tượng
    thuThapThongTinOrder(gOrderDetail)
    console.log("Id open là: ", gOrderInRow.id);
    //B2: Kiểm tra thông tin đối tượng
    var vResult = validateInforOrder(gOrderDetail)
    //B3: Gọi Api để sửa dữ liệu
    if (vResult) {
        // sửa lại trạng thái trước khi gửi đi
        gOrderDetail.trangThai = "open"
        callApiToChangeStatus(gOrderDetail)
    }
}

/*** REGION 4 - Common funtions - Vùng khai báo hàm dùng chung trong toàn bộ chương trình*/
// 4.1.3 Hàm clear dữ liệu
function clearDataOnModalUpdate() {
    'use strict';
    $("#input-order-code-update").val("");                                        //01
    $("#input-pizza-size-update").val("");                                        //02
    $("#input-duong-kinh-update").val("");                                        //03
    $("#input-suon-update").val("");                                              //04
    $("#input-salad-update").val("");                                             //05
    $("#input-pizza-type-update").val("");                                        //06
    $("#input-id-voucher-update").val("");                                        //07
    $("#input-thanh-tien-update").val("");                                        //08
    $("#input-giam-gia-update").val("");                                          //09
    $("#input-loai-do-uong-update").val("");                                      //10
    $("#input-so-luong-nuoc-uong-update").val("");                                //11
    $("#input-ho-ten-update").val("");                                            //12
    $("#input-email-update").val("");                                             //13
    $("#input-sdt-update").val("");                                               //14
    $("#input-dia-chi-update").val("");                                           //15
    $("#input-loi-nhan-update").val("");                                          //16
    $("#input-ngay-order-update").val("");                                        //17
    $("#input-ngay-tao-order-update").val("");                                    //18
    $("#input-trang-thai-update").val("");                                        //19
}

// 4.1.4: Hàm show modal Update
function showModalUpdateOrder() {
    'use strict';
    $("#modal-update-order").modal("show")
}
// 4.1.5: Hàm hide modal Update
function hideModalUpdateOrder() {
    'use strict';
    $("#modal-update-order").modal("hide")
}

// 4.1.6 Hàm load dữ liệu vào form sau khi modal bật lên
function loadDataToFormModalUpdate() {
    'use strict';
    $("#input-order-code-update").val(gOrderInRow.orderCode);                                     //01
    $("#input-pizza-size-update").val(gOrderInRow.kichCo.toUpperCase());                          //02
    $("#input-duong-kinh-update").val(gOrderInRow.duongKinh);                                     //03
    $("#input-suon-update").val(gOrderInRow.suon);                                                //04
    $("#input-salad-update").val(gOrderInRow.salad);                                              //05
    $("#input-pizza-type-update").val(gOrderInRow.loaiPizza.toUpperCase());                       //06
    $("#input-id-voucher-update").val(gOrderInRow.idVourcher);                                    //07
    $("#input-thanh-tien-update").val(gOrderInRow.thanhTien);                                     //08
    $("#input-giam-gia-update").val(gOrderInRow.giamGia);                                         //09
    $("#input-loai-do-uong-update").val(gOrderInRow.idLoaiNuocUong.toUpperCase());                //10
    $("#input-so-luong-nuoc-uong-update").val(gOrderInRow.soLuongNuoc);                           //11
    $("#input-ho-ten-update").val(gOrderInRow.hoTen);                                             //12
    $("#input-email-update").val(gOrderInRow.email);                                              //13
    $("#input-sdt-update").val(gOrderInRow.soDienThoai);                                          //14
    $("#input-dia-chi-update").val(gOrderInRow.diaChi);                                           //15
    $("#input-loi-nhan-update").val(gOrderInRow.loiNhan);                                         //16
    $("#input-ngay-order-update").val(gOrderInRow.ngayCapNhat);                                   //17
    $("#input-ngay-tao-order-update").val(gOrderInRow.ngayTao);                                   //18
    $("#input-trang-thai-update").val(gOrderInRow.trangThai);                                     //19
    // disable nút cùng trạng thái với trạng thái đơn hàng
    let vTrangThai = gOrderInRow.trangThai
    disableButtonOrNot(vTrangThai)
    console.log(vTrangThai);
}
// 4.1.7 disable nút cùng trạng thái với trạng thái đơn hàng
function disableButtonOrNot(paramTrangThai) {
    var vButtonConfirm = $("#btn-confirm-order").text()
    var vButtonCancel = $("#btn-cancel-order").text()
    var vButtonOpen = $("#btn-open-order").text()
    if (paramTrangThai.toUpperCase() == vButtonConfirm.toUpperCase()) {
        $("#btn-confirm-order").prop("disabled", true)
        $("#btn-cancel-order").prop("disabled", false)
        $("#btn-open-order").prop("disabled", false)
    }
    if (paramTrangThai.toUpperCase() == vButtonCancel.toUpperCase()) {
        $("#btn-confirm-order").prop("disabled", false)
        $("#btn-cancel-order").prop("disabled", true)
        $("#btn-open-order").prop("disabled", false)
    }
    if (paramTrangThai.toUpperCase() == vButtonOpen.toUpperCase()) {
        $("#btn-confirm-order").prop("disabled", false)
        $("#btn-cancel-order").prop("disabled", false)
        $("#btn-open-order").prop("disabled", true)
    }
}

// 4.1.7 Hàm lấy dữ liệu trong hàng
function getDataFromRow(paramButton) {
    'use strict';
    var vTableRow = $(paramButton).parents("tr");
    var vOrderInRow = gPizzaOrder.row(vTableRow).data();
    return gOrderInRow = vOrderInRow
}
// ----------------------------------MODAL---------------------------------------------
//4.2.1 Hàm thu thập thông tin khách hàng
function thuThapThongTinOrder(paramOrder) {
    'use strict';
    paramOrder.orderCode = $("#input-order-code-update").val();
    paramOrder.kichCo = $("#input-pizza-size-update").val();
    paramOrder.duongKinh = $("#input-duong-kinh-update").val();
    paramOrder.suon = $("#input-suon-update").val();
    paramOrder.salad = $("#input-salad-update").val();
    paramOrder.loaiPizza = $("#input-pizza-type-update").val();
    paramOrder.idVourcher = $("#input-id-voucher-update").val();
    paramOrder.thanhTien = $("#input-thanh-tien-update").val();
    paramOrder.giamGia = $("#input-giam-gia-update").val();
    paramOrder.idLoaiNuocUong = $("#input-loai-do-uong-update").val();
    paramOrder.soLuongNuoc = $("#input-so-luong-nuoc-uong-update").val();
    paramOrder.hoTen = $("#input-ho-ten-update").val();
    paramOrder.email = $("#input-email-update").val();
    paramOrder.soDienThoai = $("#input-sdt-update").val();
    paramOrder.diaChi = $("#input-dia-chi-update").val();
    paramOrder.loiNhan = $("#input-loi-nhan-update").val();
    paramOrder.ngayCapNhat = $("#input-ngay-order-update").val();
    paramOrder.ngayTao = $("#input-ngay-tao-order-update").val();
    paramOrder.trangThai = $("#input-trang-thai-update").val();
}
// 4.2.2 Hàm kiểm tra dữ liệu nhập
function validateInforOrder(paramOrder) {
    if (paramOrder.orderCode == "") {
        alert("OrderCode bị thiếu - Hãy xoá order này")
        return false
    }
    if (paramOrder.kichCo !== "S" && paramOrder.kichCo !== "M" && paramOrder.kichCo !== "L") {
        alert("Size bánh bị thiếu - Hãy xoá order này")
        return false
    }
    if (paramOrder.duongKinh == "") {
        alert("Đường kính bánh bị thiếu - Hãy xoá order này")
        return false
    }
    if (paramOrder.suon == "") {
        alert("Sườn nướng bị thiếu - Hãy xoá order này")
        return false
    }
    if (paramOrder.salad == "") {
        alert("Salad bị thiếu - Hãy xoá order này")
        return false
    }
    if (paramOrder.loaiPizza !== "HAWAII" && paramOrder.loaiPizza !== "SEAFOOD" && paramOrder.loaiPizza !== "BACON") {
        alert("Loại pizza bị thiếu - Hãy xoá order này")
        return false
    }

    if (paramOrder.thanhTien == "") {
        alert("Thành tiền bị thiếu - Hãy xoá order này")
        return false
    }
    if (paramOrder.giamGia == "") {
        alert("Giảm giá bị thiếu - Hãy xoá order này")
        return false
    }
    if (paramOrder.idLoaiNuocUong !== "TRATAC" && paramOrder.idLoaiNuocUong !== "COCA" && paramOrder.idLoaiNuocUong !== "PEPSI"
        && paramOrder.idLoaiNuocUong !== "LAVIE" && paramOrder.idLoaiNuocUong !== "TRASUA" && paramOrder.idLoaiNuocUong !== "FANTA") {
        alert("Loại nước ngọt bị thiếu - Hãy xoá order này")
        return false
    }
    if (paramOrder.soLuongNuoc == "") {
        alert("Số lượng nước ngọt bị thiếu - Hãy xoá order này")
        return false
    }
    if (paramOrder.hoTen == "") {
        alert("Họ tên bị thiếu - Hãy xoá order này")
        return false
    }

    if (paramOrder.soDienThoai == "") {
        alert("Số điện thoại bị thiếu - Hãy xoá order này")
        return false
    }
    if (paramOrder.diaChi == "") {
        alert("Địa chỉ bị thiếu - Hãy xoá order này")
        return false
    }
    if (paramOrder.ngayCapNhat == "") {
        alert("Ngày cập nhật bị thiếu - Hãy xoá order này")
        return false
    }
    if (paramOrder.ngayTao == "") {
        alert("Ngày tạo bị thiếu - Hãy xoá order này")
        return false
    }
    if (paramOrder.trangThai == "") {
        alert("Trạng thái bị thiếu - Hãy xoá order này")
        return false
    }

    return true
}
// Hàm gọi Api để sửa dữ liệu (chuyển trạng thái)
function callApiToChangeStatus(paramObjectRequest) {
    $.ajax({
        url: "http://203.171.20.210:8080/devcamp-pizza365/orders/" + gOrderInRow.id,
        type: "PUT",
        contentType: "application/json; charset = UTF-8",
        data: JSON.stringify(paramObjectRequest),
        success: function (paramRes) {
            alert("Đã thay đổi trạng thái của đơn hàng này.")
            //Ẩn cái modal xuống
            hideModalUpdateOrder()
            //B4: Tải lại trang với kết quả đã thay đổi
            location.reload()

        },
        error: function (paramErr) {
            console.log(paramErr.status);
        }
    })
}
