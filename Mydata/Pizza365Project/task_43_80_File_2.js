/*** REGION 1 - Global variables - Vùng khai báo biến, hằng số, tham số TOÀN CỤC */
var gOrderCode = "";
/*** REGION 2 - Vùng gán / thực thi sự kiện cho các elements */
//2.1 Gán sự kiện cho nút "Tạo đơn"
$("#modal-order-information").on("click", "#btn-create-order", function () {
    onBtnCreateNewOrder()
})


//2.2 Gán sự kiện cho nút "Quay lại"
$("#modal-order-information").on("click", "#btn-return", function () {
    onBtnReturnModal()
})

/*** REGION 3 - Event handlers - Vùng khai báo các hàm xử lý sự kiện */
// 3.1 Khai báo hàm cho nút "Tạo đơn"
function onBtnCreateNewOrder() {
    //B0: Khai báo thông tin đối tượng
    var vNewObject = {
        kichCo: "0",
        duongKinh: "",
        suon: 0,
        salad: 0,
        loaiPizza: "",
        idVourcher: "",
        idLoaiNuocUong: "",
        soLuongNuoc: 0,
        hoTen: "",
        thanhTien: 0,
        giamGia: 0,
        email: "",
        soDienThoai: "",
        diaChi: "",
        loiNhan: ""
    }
    //B1: Thu thập thông tin đối tượng
    getInformationToCreateNewOrder(vNewObject)
    //B2: Không cần kiểm tra nữa vì chỉ cần lấy thông tin sau khi đã check ỏ bước trước đó.
    //B3: Gọi Api để tạo mới order
    console.log(vNewObject);
    callApiCreateNewOrder(vNewObject)
    //B4: Hiển thị modal cho người dùng biết đã đặt hàng thành công.
}

// 3.2 Khai báo hàm cho nút "Quay lại"
function onBtnReturnModal() {
    hideModalDetailOrder()
}

/*** REGION 4 - Common funtions - Vùng khai báo hàm dùng chung trong toàn bộ chương trình*/

// 4.1: Hàm show modal Thông tin đơn hàng
function showModalDetailOrder() {
    'use strict';
    $("#modal-order-information").modal("show")
}
// 4.2: Hàm hide modal Thông tin đơn hàng
function hideModalDetailOrder() {
    'use strict';
    $("#modal-order-information").modal("hide")
}
// 4.3 Hàm hiển thị thông tin lên modal
function loadInformationToModal(paramObject) {
    'use strict';
    $("#input-modal-ho-va-ten").val(paramObject.hoTen);
    $("#input-modal-sdt").val(paramObject.soDienThoai);
    $("#input-modal-dia-chi").val(paramObject.diaChi);
    $("#input-modal-loi-nhan").val(paramObject.loiNhan);
    $("#input-modal-voucher").val(paramObject.idVourcher);
    $("#areatext-detail-infor").val
        (
            "Xác nhận: " + paramObject.hoTen + "; Số điện thoại: " + paramObject.soDienThoai + "; Địa chỉ: " + paramObject.diaChi + ";" + "\n" +
            "Combo Pizza: " + paramObject.kichCo + "; Đường kính: " + paramObject.duongKinh + "; Số lượng sườn: " + paramObject.suon + "; Loại nước: " + paramObject.idLoaiNuocUong + "; Số lượng nước: " + paramObject.soLuongNuoc + "; Salad: " + paramObject.salad + "g;" + "\n" +
            "Loại Pizza: " + paramObject.loaiPizza + "; Giá niêm yết: " + paramObject.thanhTien + " vnđ" + "; Mã giảm giá: " + paramObject.idVourcher + ";" + "\n" +
            "Số tiền cần thanh toán: " + paramObject.soTienPhaiThanhToan + " (giảm giá " + gPhanTramGiamGia + "%" + "); Lời nhắn: " + paramObject.loiNhan + ";"

        );
}

// 4.4 Thu thập thông tin 
function getInformationToCreateNewOrder(paramNewOrder) {
    'use strict';
    paramNewOrder.kichCo = gCreateNewOrder.kichCo;
    paramNewOrder.duongKinh = gCreateNewOrder.duongKinh;
    paramNewOrder.suon = gCreateNewOrder.suon;
    paramNewOrder.salad = gCreateNewOrder.salad;
    paramNewOrder.loaiPizza = gCreateNewOrder.loaiPizza;
    paramNewOrder.idVourcher = gCreateNewOrder.idVourcher;
    paramNewOrder.idLoaiNuocUong = gCreateNewOrder.idLoaiNuocUong
    paramNewOrder.soLuongNuoc = gCreateNewOrder.soLuongNuoc
    paramNewOrder.hoTen = gCreateNewOrder.hoTen
    paramNewOrder.thanhTien = gCreateNewOrder.thanhTien
    paramNewOrder.giamGia = gCreateNewOrder.thanhTien * gPhanTramGiamGia / 100
    paramNewOrder.email = gCreateNewOrder.email
    paramNewOrder.soDienThoai = gCreateNewOrder.soDienThoai
    paramNewOrder.diaChi = gCreateNewOrder.diaChi
    paramNewOrder.loiNhan = gCreateNewOrder.loiNhan
}

// 4.5 Gọi Api tạo mới order
function callApiCreateNewOrder(paramNewOrder) {
    'use strict';
    $.ajax({
        url: "https://203.171.20.210:8080/devcamp-pizza365/orders/",
        type: "POST",
        contentType: "application/json; charset = UTF-8",
        data: JSON.stringify(paramNewOrder),
        success: function (paramResponse) {
            gOrderCode = paramResponse.orderCode
            // B4: Hàm hiển thị sau khi tạo mới order thành công.
            // Ẩn cái modal xuống
            hideModalDetailOrder()
            // Hiện modal thông báo kết quả và orderCode
            showModalOrderCreatedSuccess()
        },
        error: function (paramErr) {
            console.log(paramErr.status);
        }
    })
}

// 4.6 Hàm hiển thị modal thông báo kết quả và orderCode kèm theo.
function showModalOrderCreatedSuccess() {
    $("#success-order-create").modal("show")
    $("#inp-readonly-order-code").val(gOrderCode)
}


