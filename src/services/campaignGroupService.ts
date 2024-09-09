import axiosInstance from "@/utils/axios";

export const getAllSmsCampaignGroup = (page: number,
                                size: number,key: string = "") => {
    return axiosInstance.get("api/smsCampaignGroup/getAll", {
        params: {page, size, key}
    })
}

export const countAllSmsCampaignGroup = (key: string = "") => {
    return axiosInstance.get("api/smsCampaignGroup/countAll", {
        params: {key}
    })
}

export const createSmsCampaignGroup = (smsCampaignGroup: ICampaignGroup) => {
    return axiosInstance.post("api/smsCampaignGroup/insert", smsCampaignGroup)
}
export const updateSmsCampaignGroup = (smsCampaignGroup: ICampaignGroup) => {
    return axiosInstance.post("api/smsCampaignGroup/update", smsCampaignGroup)
}
export const deleteSmsCampaignGroup = (id: number) => {
    return axiosInstance.post("api/smsCampaignGroup/delete", {id})
}
export const getListCampaignGroup = () => {
    return axiosInstance.get("api/smsCampaignGroup/getAllNoPage")
}