/*** REGION 1 - Global variables - Vùng khai báo biến, hằng số, tham số TOÀN CỤC */

var gPhanTramGiamGia = -1;
var gCreateNewOrder = null // (biến này dùng cho phần sau).

/*** REGION 2 - Vùng gán / thực thi sự kiện cho các elements */
// 2.1 Gán sự kiện vào nút gửi
$("#btn-send-click").on("click", function () {
    onBtnSendClick()
})

/*** REGION 3 - Event handlers - Vùng khai báo các hàm xử lý sự kiện */
// 3.1 Khai báo hàm khi khách hàng nhấn vào nút gửi.
function onBtnSendClick() {
    // 3.1 XỬ LÝ CHO VOUCHER TRƯỚC
    // B1: Thu thập voucher
    var vVoucher = $("#inp-voucher").val().trim()
    // B2: Bỏ qua
    // B3: Gọi Api để lấy phần trăm giảm giá
    if (vVoucher !== "") {
        callApiToGetPercentDiscount(vVoucher)
    }
    else { gPhanTramGiamGia = 0 }
    // B4: Hiển thị số tiền được giảm lên console
    console.log("Số % được giảm là: ", gPhanTramGiamGia);

    // 3.2 TIẾP TỤC XỬ LÝ CÁC TRƯỜNG CÒN LẠI
    // B0: Khai báo đối tượng thu thập
    var vOrderSendObj = {
        kichCo: "",
        duongKinh: "",
        suon: 0,
        salad: 0,
        loaiPizza: "",
        idVourcher: "",
        thanhTien: 0,
        giamGia: 0,
        soTienPhaiThanhToan: 0,
        idLoaiNuocUong: "",
        soLuongNuoc: 0,
        hoTen: "",
        email: "",
        soDienThoai: "",
        diaChi: "",
        loiNhan: "",
    }

    //B1: Thu thập thông tin đối tượng (2 combo và style phải được click thì mới thu thập)
    var vResultCheckPizza = checkComBoAndStylePizza()
    if (vResultCheckPizza) {
        thuThapThongTinOrder(vOrderSendObj)
    }
    else { return }
    gCreateNewOrder = vOrderSendObj
    //B2: Kiểm tra các nút chọn và thông tin đối tượng
    var vResultCheck = kiemTraThongTinDoiTuong(vOrderSendObj)
    //B3: Cho hiển thị lên modal (Kết hợp xem ở file số 2)
    if (vResultCheck) {
        // Bật modal lên
        showModalDetailOrder()
        // Load thông tin lên modal
        loadInformationToModal(vOrderSendObj)
    }
}

/*** REGION 4 - Common funtions - Vùng khai báo hàm dùng chung trong toàn bộ chương trình*/

//Trước tiên phải xử lý các số liệu từ voucher và lưu vào biến global thì các phần sau sẽ dễ làm hơn.
// 4.1.1 Gọi Api để lấy kết của của voucher (có thì lấy được số tiền giảm; k có thì số tiền giảm = 0)       
function callApiToGetPercentDiscount(paramVoucherRequest) {
    'use strict';
    $.ajax({
        url: "https://203.171.20.210:8080/devcamp-pizza365/voucher_detail/" + paramVoucherRequest,
        type: "GET",
        async: false,
        success: function (paramObject) {
            // Lấy phần trăm được giảm
            gPhanTramGiamGia = paramObject.phanTramGiamGia
        },
        error: function () {
            console.log("Mã giảm giá không đúng hoặc không tồn tại");
            gPhanTramGiamGia = 0;
        }
    })
}

// 4.2.1 Khai báo hàm thu thập thông tin đối tượng
function thuThapThongTinOrder(paramOrder) {
    paramOrder.kichCo = gComboPizza.kichCo
    paramOrder.duongKinh = gComboPizza.duongKinh
    paramOrder.suon = gComboPizza.suon
    paramOrder.salad = gComboPizza.salad
    paramOrder.loaiPizza = gStylePizza.loaiPizza
    paramOrder.idVourcher = $("#inp-voucher").val().trim()
    paramOrder.thanhTien = gComboPizza.thanhTien
    paramOrder.giamGia = gPhanTramGiamGia + "%"
    paramOrder.soTienPhaiThanhToan = (paramOrder.thanhTien - paramOrder.thanhTien * gPhanTramGiamGia / 100) + " vnđ"
    paramOrder.idLoaiNuocUong = $("#select-drinks").val()
    paramOrder.soLuongNuoc = gComboPizza.soLuongNuoc
    paramOrder.hoTen = $("#inp-ho-ten").val().trim()
    paramOrder.email = $("#inp-email").val().trim()
    paramOrder.soDienThoai = $("#inp-sdt").val().trim()
    paramOrder.diaChi = $("#inp-dia-chi").val().trim()
    paramOrder.loiNhan = $("#inp-loi-nhan").val().trim()
}

// 4.2.2 Hàm kiểm tra 2 cái chọn combo và style
function checkComBoAndStylePizza() {
    // đối tượng gCombo phải khác null
    if (gComboPizza == null) {
        alert("Bạn chưa chọn combo pizza")
        return false
    }
    // đối tượng gStylePizza phải khác null
    if (gStylePizza == null) {
        alert("Bạn chưa chọn loại pizza")
        return false
    }
    return true
}

//4.2.3 Kiểm tra thông tin đối tượng đã nhập
function kiemTraThongTinDoiTuong(paramObject) {
    // kiểm tra chọn đồ uống
    if (paramObject.idLoaiNuocUong == "0") {
        alert("Bạn chưa chọn đồ uống")
        return false
    }
    // kiểm tra điền họ tên chưa?
    if (paramObject.hoTen == "") {
        alert("Bạn chưa điền họ tên")
        return false
    }
    // kiểm tra điền email chưa?
    if (paramObject.email == "") {
        alert("Bạn chưa điền email")
        return false
    }

    // kiểm tra email chứa ký tự @?
    if (paramObject.email.includes("@") == false) {
        alert("Email không hợp lệ - không chứa @")
        return false
    }

    // kiểm tra trước và sau @ phải có ký tự
    if (paramObject.email.startsWith("@") == true || paramObject.email.endsWith("@") == true) {
        alert("Email không hợp lệ - trước hoặc sau không có ký tự")
        return false
    }

    // kiểm tra điền số điện thoại chưa?
    if (paramObject.soDienThoai == "") {
        alert("Bạn chưa điền số điện thoại")
        return false
    }
    // kiểm tra số điện thoại phải là số
    if (isNaN(paramObject.soDienThoai)) {
        alert("Số điện thoại phải là số")
        return false
    }

    // kiểm tra điền địa chỉ chưa?
    if (paramObject.diaChi == "") {
        alert("Bạn chưa điền địa chỉ")
        return false
    }
    return true
}
