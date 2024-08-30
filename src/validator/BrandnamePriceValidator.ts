import _ from "lodash";
import {useToast} from "vue-toast-notification";

const $toast = useToast();

export const BrandnamePriceValidator = (brandnamePrice: IBrandnamePrice): boolean => {
    if (brandnamePrice?.brandNameId <= 0) {
        $toast.error("Brandname phải được chọn")
        return false;
    } else if (!brandnamePrice?.price) {
        $toast.error("Giá phải được nhập")
        return false;
    } else if (brandnamePrice?.price <= 0) {
        $toast.error("Giá không hợp lệ")
        return false;
    } else if (_.isEmpty(brandnamePrice?.telcoCode)) {
        $toast.error("Mã telco phải được nhập")
        return false;
    }
    return true;
};