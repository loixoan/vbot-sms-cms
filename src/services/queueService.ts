import axiosInstance from "@/utils/axios";

export const getAllQueue = (page: number,
                            size: number,
                            smsCampaignCode: string = "",
                            brandNameCode: string = "",
                            tempCode: string = "",
                            status: number = 0,
                            key: string = "") => {
    return axiosInstance.get("api/smscampaign/queue/getAll", {
        params: {page, size,smsCampaignCode,brandNameCode,tempCode,status, key}
    })
}

export const countAllQueue = (smsCampaignCode: string = "",
                              brandNameCode: string = "",
                              tempCode: string = "",
                              status: number = 0,
                              key: string = "") => {
    return axiosInstance.get("api/smscampaign/queue/countAll", {
        params: {smsCampaignCode,brandNameCode,tempCode,status,key}
    })
}