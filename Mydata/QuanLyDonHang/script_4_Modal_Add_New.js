/*** REGION 1 - Global variables - Vùng khai báo biến, hằng số, tham số TOÀN CỤC */
var gDrinkList = ""
var gPhanTramGiamGia = 0;
var gSoTienDuocGiam = 0;


/*** REGION 2 - Vùng gán / thực thi sự kiện cho các elements */
// 2.1 Lấy danh sách đồ uống trước:
getDrinkList()

// 2.2 Gán sự kiện change tự fill các thuộc tính của combo
$("#add-new-modal").on("change", "#select-pizza-size", function () {
    fillDataComBoPizza()
    tinhSoTienDuocGiam() // Thay đổi ở đây cũng chại tính tiền giảm luôn
})


// 2.3 Tính số tiền được giảm khi nhập mã giảm giá (đổi mã cái bấm luôn)
$("#add-new-modal").on("click", function () {
    tinhSoTienDuocGiam()
})
// 2.3.1 Tính số tiền được giảm khi nhập mã giảm giá (click chuột thì cũng chại luôn)
$("#add-new-modal").on("change", "#input-id-voucher", function () {
    tinhSoTienDuocGiam()
})

// 2.4 Gán sự kiện vào nút Add New Order (trên bảng)
$("#btn-add-new").on("click", function () {
    // Hiển thị modal
    showModalAddNew()

    // Clear dữ liệu trên modal addnew
    clearDataOnModalAddNew()
    // Load danh sách đồ uống vào modal
    loadDrinkToSelect(gDrinkList)
})

// 2.5 Gán sự kiện vào nút Add New Product (trên modal)
$("#btn-add-new-order-modal").on("click", function () {
    onBtnAddNewOrderOnModal()
})

// 2.6 Tính số tiền được giảm
$("#input-id-voucher").on("keydown", function () {
    tinhSoTienDuocGiam()
})

/*** REGION 3 - Event handlers - Vùng khai báo các hàm xử lý sự kiện */
// 3.1 Khai báo hàm khi nhấn nút vào nút Add New
function onBtnAddNewOrderOnModal() {
    'use strict';
    // B0: Khai báo đối tượng
    var vNewOrder = {
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
        trangThai: "open"
    }
    // B1: Thu thập thông tin đối tượng
    getNewOrderInfor(vNewOrder)
    console.log("Modal Add New: đối tượng thu thập ", vNewOrder);
    // B2: Kiểm tra đối tượng
    var vResultCheck = validateOrderInfor(vNewOrder)
    // B3: Gọi Api phương thức POST để thêm mới dữ liệu + thêm dữ liệu mới lên bảng
    if (vResultCheck) {
        callApiToCreateNewOrder(vNewOrder)
    }
}

/*** REGION 4 - Common funtions - Vùng khai báo hàm dùng chung trong toàn bộ chương trình*/
// 4.1 Hàm hiển thị modal thêm mới khi click vào nút AddNew
function showModalAddNew() {
    'use strict';
    $("#add-new-modal").modal("show");
}

// 4.2 Hàm ẩn modal add new.
function hideModalAddNew() {
    'use strict';
    $("#add-new-modal").modal("hide");
}

// 4.3 Hàm thu thập đối tượng
function getNewOrderInfor(paramOrder) {
    'use strict';
    paramOrder.kichCo = $("#select-pizza-size").val();
    paramOrder.duongKinh = $("#input-duong-kinh").val();
    paramOrder.suon = $("#input-suon").val();
    paramOrder.salad = $("#input-salad").val();
    paramOrder.loaiPizza = $("#select-pizza-type").val();
    paramOrder.idVourcher = $("#input-id-voucher").val().trim();
    paramOrder.thanhTien = $("#input-thanh-tien").val();
    paramOrder.giamGia = $("#input-giam-gia").val();
    paramOrder.idLoaiNuocUong = $("#select-drink-modal").val();
    paramOrder.soLuongNuoc = $("#input-so-luong-nuoc-uong").val();
    paramOrder.hoTen = $("#input-ho-ten").val().trim();
    paramOrder.email = $("#input-email").val().trim();
    paramOrder.soDienThoai = $("#input-sdt").val().trim();
    paramOrder.diaChi = $("#input-dia-chi").val().trim();
    paramOrder.loiNhan = $("#input-loi-nhan").val().trim();
    paramOrder.trangThai = $("#input-trang-thai").val();
}

// 4.4 Hàm kiểm tra dữ liệu
function validateOrderInfor(paramOrder) {
    'use strict';
    if (paramOrder.kichCo == "0") {
        alert("Bạn chưa chọn size Pizza")
        return false
    }

    if (paramOrder.loaiPizza == "0") {
        alert("Bạn chưa chọn loại Pizza")
        return false
    }
    if (paramOrder.idLoaiNuocUong == "0") {
        alert("Bạn chưa chọn loại nước uống")
        return false
    }

    if (paramOrder.hoTen == "") {
        alert("Bạn chưa nhập tên")
        return false
    }
    if (paramOrder.soDienThoai == "") {
        alert("Bạn chưa nhập số điện thoại")
        return false
    }

    if (isNaN(paramOrder.soDienThoai) == true) {
        alert("Số điện thoại không hợp lệ")
        return false
    }
    if (paramOrder.diaChi == "") {
        alert("Bạn chưa nhập địa chỉ")
        return false
    }
    return true
}


// 4.5 Hàm hiển thị khi add product thành công
function displayInsertSuccessGrade() {
    'use strict';
    // Thông báo cho người dùng
    alert("Thêm mới sản phẩm thành công")
    // Ẩn cái modal xuống 
    hideModalAddNew()
    // Reload lại trang để xem thay đổi
    location.reload()
}

// 4.6 Hàm clear cái modal khi nhấn lại nút addnew (trên bảng)
function clearDataOnModalAddNew() {
    'use strict';
    $('#select-pizza-size').val("0").attr('selected', true)
    $('#select-pizza-size').change()
    $('#select-pizza-type').val("0").attr('selected', true)
    $('#select-pizza-type').change()

    $("#input-duong-kinh").val("")
    $("#input-suon").val("")
    $("#input-salad").val("")
    $("#input-id-voucher").val("")
    $("#input-thanh-tien").val("")
    $("#input-giam-gia").val("")
    $("#input-so-luong-nuoc-uong").val("")
    $("#input-ho-ten").val("")
    $("#input-email").val("")
    $("#input-sdt").val("")
    $("#input-dia-chi").val("")
    $("#input-loi-nhan").val("")
    $("#input-trang-thai").val("open")
    $('#select-drink-modal').empty();
}

// 4.7 Gọi Api để lấy danh sách đồ uống
function getDrinkList() {
    'use strict';
    $.ajax({
        url: "https://203.171.20.210:8080/devcamp-pizza365/drinks",
        type: "GET",
        async: false,
        success: function (responseObject) {
            gDrinkList = responseObject
            return responseObject
        },
        error: function (ajaxContext) {
            console.log(ajaxContext.status);
        }
    })
}

// 4.8 Hàm load dữ liệu vào select đồ uống
function loadDrinkToSelect(paramDrinks) {
    'use strict';
    $("#select-drink-modal").append($('<option>', {
        value: 0,
        text: 'Chọn Loại Đồ Uống'

    }));
    for (var bI = 0; bI < paramDrinks.length; bI++) {
        $("#select-drink-modal").append($('<option>', {
            value: paramDrinks[bI].maNuocUong,
            text: paramDrinks[bI].tenNuocUong
        }));
    }
}

// 4.9 Hàm fill dữ liệu theo combo Pizza.
function fillDataComBoPizza() {
    'use strict';
    var vSize = $("#select-pizza-size").val()
    if (vSize == "S") {
        $("#input-duong-kinh").val(20)
        $("#input-suon").val(2)
        $("#input-salad").val(200)
        $("#input-thanh-tien").val(150000)
        $("#input-so-luong-nuoc-uong").val(2)
    }
    if (vSize == "M") {
        $("#input-duong-kinh").val(25)
        $("#input-suon").val(4)
        $("#input-salad").val(300)
        $("#input-thanh-tien").val(200000)
        $("#input-so-luong-nuoc-uong").val(3)
    }
    if (vSize == "L") {
        $("#input-duong-kinh").val(30)
        $("#input-suon").val(8)
        $("#input-salad").val(500)
        $("#input-thanh-tien").val(250000)
        $("#input-so-luong-nuoc-uong").val(4)
    }
    if (vSize == "0") {
        $("#input-duong-kinh").val("")
        $("#input-suon").val("")
        $("#input-salad").val("")
        $("#input-thanh-tien").val("")
        $("#input-so-luong-nuoc-uong").val("")
    }
}

// 4.10 Hàm tính số tiền được giảm
function tinhSoTienDuocGiam() {
    'use strict';
    var vVoucherID = $("#input-id-voucher").val().trim()
    console.log(vVoucherID);
    if (vVoucherID !== "") {
        callApiToGetPercentDiscount(vVoucherID)
    } else { gSoTienDuocGiam = 0 }
    $("#input-giam-gia").val(gSoTienDuocGiam)
}

// 4.11 Hàm gọi api để tính số tiền được giảm
function callApiToGetPercentDiscount(paramVoucherRequest) {
    'use strict';
    $.ajax({
        url: "https://203.171.20.210:8080/devcamp-pizza365/voucher_detail/" + paramVoucherRequest,
        type: "GET",
        async: false,
        success: function (paramObject) {
            // Lấy phần trăm được giảm
            var vGiaNiemYet = $("#input-thanh-tien").val().trim()
            gPhanTramGiamGia = paramObject.phanTramGiamGia
            gSoTienDuocGiam = gPhanTramGiamGia * vGiaNiemYet / 100
            $("#input-giam-gia").val(gSoTienDuocGiam)
        }
    })
}

// 4.12 Hàm gọi Api để tạo mới order
function callApiToCreateNewOrder(paramRequest) {
    'use strict';
    console.log("Dữ liệu hợp lệ");
    $.ajax({
        url: "https://203.171.20.210:8080/devcamp-pizza365/orders/",
        type: "POST",
        contentType: "application/json; charset = UTF-8",
        data: JSON.stringify(paramRequest),
        success: function () {
            alert("Đã thêm đơn hàng")
            //Ẩn cái modal xuống
            hideModalAddNew()
            //B4: Tải lại trang với kết quả đã thay đổi
            location.reload()
        },
        error: function (ajaxContext) {
            console.log(ajaxContext.status);
        }
    })
}