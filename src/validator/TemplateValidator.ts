import _ from "lodash";
import {checkStatus} from "@/helpers/functions";
import {useToast} from "vue-toast-notification";

const $toast = useToast();

export const TemplateValidator = (template: ITemplate): boolean => {
    if (_.isEmpty(template?.name)) {
        $toast.error("Tên template phải được nhập")
        return false;
    } else if (_.isEmpty(template?.content)) {
        $toast.error("Nội dung template phải được nhập")
        return false;
    } else if (template?.brandnameId <= 0) {
        $toast.error("Brandname phải được chọn")
        return false;
    } else if (checkStatus(template.status)) {
        $toast.error("Trạng thái brandname phải được nhập")
        return false;
    }
    return true;
};