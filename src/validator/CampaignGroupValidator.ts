import _ from "lodash";
import {checkStatus} from "@/helpers/functions";
import {useToast} from "vue-toast-notification";

const $toast = useToast();

export const CampaignGroupValidator = (campaignGroup: ICampaignGroup): boolean => {
    if (_.isEmpty(campaignGroup?.name)) {
        $toast.error("Tên nhóm campaign phải được nhập")
        return false;
    } else if (_.isEmpty(campaignGroup?.description)) {
        $toast.error("Mô tả phải được nhập")
        return false;
    }
    return true;
};