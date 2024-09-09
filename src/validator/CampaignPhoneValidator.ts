import _ from "lodash";
import {checkPhoneVN, checkStatus} from "@/helpers/functions";
import {useToast} from "vue-toast-notification";

const $toast = useToast();

export const CampaignPhoneValidator = (campaignPhone: ICampaignPhone): boolean => {
    if (_.isEmpty(campaignPhone?.name)) {
        $toast.error("Tên phải được nhập")
        return false;
    } else if (_.isEmpty(campaignPhone?.phone)) {
        $toast.error("Số điện thoại phải được nhập")
        return false;
    } else if (!checkPhoneVN(campaignPhone?.phone)) {
        $toast.error("Số điện thoại không hợp lệ")
        return false;
    } else if (checkStatus(campaignPhone.status)) {
        $toast.error("Trạng thái không hợp lệ")
        return false;
    } else if (campaignPhone?.campaignId <= 0) {
        $toast.error("Chiến dịch phải được chọn")
        return false;
    }
    return true;
};