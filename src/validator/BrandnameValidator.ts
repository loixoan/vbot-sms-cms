import _ from "lodash";
import {checkStatus} from "@/helpers/functions";
import {useToast} from "vue-toast-notification";

const $toast = useToast();

export const BrandnameValidator = (brandname: IBrandname): boolean => {
    if (_.isEmpty(brandname?.name)) {
        $toast.error("Tên brandname phải được nhập")
        return false;
    } else if (_.isEmpty(brandname?.projectCode)) {
        $toast.error("Mã project phải được nhập")
        return false;
    } else if (_.isEmpty(brandname?.type)) {
        $toast.error("Loại brandname phải được chọn")
        return false;
    } else if (checkStatus(brandname.status)) {
        $toast.error("Trạng thái brandname phải được nhập")
        return false;
    } else if (_.isEmpty(brandname?.expirationAt)) {
        $toast.error("Ngày hết hạn phải được nhập")
        return false;
    }
    return true;
};