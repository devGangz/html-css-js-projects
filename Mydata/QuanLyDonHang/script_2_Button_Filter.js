/*** REGION 1 - Global variables - Vùng khai báo biến, hằng số, tham số TOÀN CỤC */

/*** REGION 2 - Vùng gán / thực thi sự kiện cho các elements */
// Gán sự kiện vào nút filter
$("#btn-filter").on("click", function () {
    onBtnFilterClick()
})

/*** REGION 3 - Event handlers - Vùng khai báo các hàm xử lý sự kiện */
function onBtnFilterClick() {
    // B0: Khai báo đối tượng
    vFilter = {
        trangThai: "",
        loaiPizza: ""
    }
    // B1: Thu thập dữ liệu
    getDataFromSelect(vFilter)
    console.log("vFilter", vFilter);
    // B2: Kiểm tra dữ liệu
    // B3: Lọc dữ liệu
    var vResultFilter = functionFilterData(vFilter)
    console.log("Mảng dữ liệu lọc được là: ");
    console.log(vFilter);
    // B4: Hiển thị dữ liệu ở bảng mới
    displayDataToTable(vResultFilter)
}
/*** REGION 4 - Common funtions - Vùng khai báo hàm dùng chung trong toàn bộ chương trình*/

// 4.1 Khai báo hàm thu thập thông tin
function getDataFromSelect(paramSelect) {
    'use strict';
    paramSelect.trangThai = $("#select-status").val()
    paramSelect.loaiPizza = $("#select-pizza-style").val()
}

// 4.2 Khai báo hàm lọc dữ liệu
function functionFilterData(paramData) {
    'use strict';
    var vResult = [];

    for (var bI = 0; bI < gAllOrders.length; bI++) {
        if (gAllOrders[bI].loaiPizza !== null) {

            if (paramData.trangThai.toLowerCase() == gAllOrders[bI].trangThai.toLowerCase() && paramData.loaiPizza.toLowerCase() == 0) {
                vResult.push(gAllOrders[bI])
            }

            if (paramData.loaiPizza.toLowerCase() == gAllOrders[bI].loaiPizza.toLowerCase() && paramData.trangThai.toLowerCase() == 0) {
                vResult.push(gAllOrders[bI])
            }

            if (paramData.trangThai.toLowerCase() == gAllOrders[bI].trangThai.toLowerCase() && paramData.loaiPizza.toLowerCase() == gAllOrders[bI].loaiPizza.toLowerCase()) {
                vResult.push(gAllOrders[bI])
            }
            if (paramData.trangThai.toLowerCase() == 0 && paramData.loaiPizza.toLowerCase() == 0) {
                vResult.push(gAllOrders[bI])
            }
        }
    }
    console.log("Dữ liệu đã lọc là: ", vResult);
    return vResult
}

//4.3 Khai báo hàm hiển thị lên table */
function displayDataToTable(paramData) {
    'use strict';
    gSTT = 1;
    var vTable = $("#pizza-order-table").DataTable() // truy xuất
    vTable.clear() // xoá dữ liệu table cũ
    vTable.rows.add(paramData) // thêm dữ liệu
    vTable.draw() // vẽ lại bảng
}
