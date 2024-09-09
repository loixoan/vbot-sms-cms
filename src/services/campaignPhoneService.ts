import axiosInstance from "@/utils/axios";

export const getAllSmsCampaignPhone = (page: number,
                                size: number,key: string = "",status:number = 0,smsCampaignId:number|null = null) => {
    return axiosInstance.get("api/smscampaign/sub/getAll", {
        params: {page, size, key,status,smsCampaignId}
    })
}

export const countAllSmsCampaignPhone = (key: string = "",status:number = 0,smsCampaignId:number|null = null) => {
    return axiosInstance.get("api/smscampaign/sub/countAll", {
        params: {key,status,smsCampaignId}
    })
}

export const createSmsCampaignPhone = (smscampaign: ICampaignPhone) => {
    return axiosInstance.post("api/smscampaign/sub/insert", smscampaign)
}
export const updateSmsCampaignPhone = (smscampaign: ICampaignPhone) => {
    return axiosInstance.post("api/smscampaign/sub/update", smscampaign)
}
export const deleteSmsCampaignPhone = (id: number) => {
    return axiosInstance.post("api/smscampaign/sub/delete", {id})
}