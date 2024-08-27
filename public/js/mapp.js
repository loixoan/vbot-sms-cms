$(document).ready(function () {
    //get it if Status key found
    if (localStorage.getItem("showAlert"))
    {
        $("body").append(localStorage.getItem("showAlert"));
        $("#liveToast").toast("show");
        localStorage.clear();
    }
});
function createToast(title, text, type)
{
    var template = $('#toast-template-' + type).text();
    template = template.replace('%%text%%', text);
    template = template.replace('%%title%%', title);
    return  template;
}
function loading(status) {
    if (status) {
        $("#loading-page").attr("class", "loading-page");
    } else {
        $("#loading-page").attr("class", "d-none");
    }
}
function loadView(id, url) {
    $.ajax({
        type: "GET",
        url: url,
        beforeSend: function () {
            loading(true);
        },
        success: function (data) {
            $("#" + id).html($(data).html());
        },
        complete: function (xhr) {
            loading(false);
            if (xhr.status === 401) {
                window.location.replace("/login");
            } else if (xhr.status === 403) {
                $("#modal-error-403").modal('show');
            }
        }
    });
}
function getServiceFormSelect() {
    var options = {};
    $.ajax({
        type: "GET",
        async: false,
        url: root + "/service/form-select",
        beforeSend: function () {
            loading(true);
        },
        success: function (data) {
            options = data;
        },
        complete: function (xhr) {
            loading(false);
            if (xhr.status === 401) {
                window.location.replace(root + "/login");
            } else if (xhr.status === 403) {
                $("#modal-error-403").modal('show');
            }
        }
    });

    return options;
}
function getCustomerServiceFormSelect(customerId, serviceNo) {
    var options = {};
    $.ajax({
        type: "GET",
        async: false,
        url: root + "/service/customer/form-select?customerId=" + customerId + "&serviceNo=" + serviceNo,
        beforeSend: function () {
            loading(true);
        },
        success: function (data) {
            options = data;
        },
        complete: function (xhr) {
            loading(false);
            if (xhr.status === 401) {
                window.location.replace(root + "/login");
            } else if (xhr.status === 403) {
                $("#modal-error-403").modal('show');
            }
        }
    });

    return options;
}
//var root = "/voice-gateway";
var root = "";
//===============================
$(function () {
    var current = location.pathname;
    $('#layoutSidenav .nav-link').each(function () {
        var $this = $(this);
        // if the current path is like this link, make it active
        if (current.startsWith($this.attr('href'))) {

            $this.addClass('active');
            $this.parent().parent().addClass('show');
        }
    });
    $('.datepicker').each(function () {
        $(this).datepicker({
            language: 'vi'
        });
    });
});