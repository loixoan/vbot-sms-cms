import _ from "lodash";
import {checkStatus} from "@/helpers/functions";
import {useToast} from "vue-toast-notification";

const $toast = useToast();

export const CampaignValidator = (campaign: ICampaign): boolean => {
    if (campaign?.tempId <= 0) {
        $toast.error("Template phải được chọn")
        return false;
    } else if (campaign?.groupId <= 0) {
        $toast.error("Nhóm chiến dịch phải được chọn")
        return false;
    } else if (checkStatus(campaign.status)) {
        $toast.error("Trạng thái campaign phải được nhập")
        return false;
    } else if (_.isEmpty(campaign?.projectCode)) {
        $toast.error("Mã project phải được nhập")
        return false;
    } else if (_.isEmpty(campaign?.name)) {
        $toast.error("Tên chiến dịch phải được nhập")
        return false;
    }  else if (_.isEmpty(campaign?.createBy)) {
        $toast.error("Người tạo phải được nhập")
        return false;
    }  else if (_.isEmpty(campaign?.updateBy)) {
        $toast.error("Người cập nhật không được để trống")
        return false;
    }
    return true;
};