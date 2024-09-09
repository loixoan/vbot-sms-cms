import _ from "lodash";
import {checkType} from "@/helpers/functions";
import {useToast} from "vue-toast-notification";
import {TypeCustomField} from "@/enums/TypeCustomField";

const $toast = useToast();

export const CustomFieldValidator = (customField: ICustomField): boolean => {
    if (_.isEmpty(customField?.name)) {
        $toast.error("Tên phải được nhập")
        return false;
    } else if (_.isEmpty(customField?.key)) {
        $toast.error("Key phải được nhập")
        return false;
    } else if (_.isEmpty(customField?.type)) {
        $toast.error("Type phải được chọn")
        return false;
    }else if (!checkType(customField?.type,TypeCustomField)) {
        $toast.error("Type không hợp lệ")
        return false;
    } else if (_.isEmpty(customField?.projectCode)) {
        $toast.error("Mã project phải được nhập")
        return false;
    }
    return true;
};