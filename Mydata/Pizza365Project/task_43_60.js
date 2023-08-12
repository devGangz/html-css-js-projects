/*** REGION 1 - Global variables - Vùng khai báo biến, hằng số, tham số TOÀN CỤC */
gDrinkList = []
/*** REGION 2 - Vùng gán / thực thi sự kiện cho các elements */
//2.1 Lấy danh sách đồ uống trước.
getDrinkList()

//2.2 Gán sự kiện lúc tải lại trang
$(document).ready(function () {
    onPageLoading()
})

/*** REGION 3 - Event handlers - Vùng khai báo các hàm xử lý sự kiện */
//3.1 Khai báo hàm onPageLoading
function onPageLoading() {
    // Load dữ liệu vào thẻ select drinks
    loadDrinkToSelect(gDrinkList)
}

/*** REGION 4 - Common funtions - Vùng khai báo hàm dùng chung trong toàn bộ chương trình*/
//4.1.1 Gọi Api để lấy danh sách đồ uống
function getDrinkList() {
    'use strict';
    $.ajax({
        url: "https://203.171.20.210:8080/devcamp-pizza365/drinks",
        type: "GET",
        async: false,
        success: function (responseObject) {
            gDrinkList = responseObject
            return gDrinkList
        },
        error: function (ajaxContext) {
            console.log(ajaxContext.status);
        }
    })
}

//4.1.2 Hàm load dữ liệu vào select đồ uống
function loadDrinkToSelect(paramDrinks) {
    'use strict';
    $("#select-drinks").append($('<option>', {
        value: 0,
        text: 'Chọn Loại Đồ Uống'

    }));
    for (var bI = 0; bI < paramDrinks.length; bI++) {
        $("#select-drinks").append($('<option>', {
            value: paramDrinks[bI].maNuocUong,
            text: paramDrinks[bI].tenNuocUong
        }));
    }
}