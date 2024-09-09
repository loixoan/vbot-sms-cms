import axiosInstance from "@/utils/axios";

export const getAllCampaign = (page: number,
                                size: number,
                                status: number = 0,
                                projectCode: string = "",
                                groupId:number = 0,
                                tempId: number = 0,
                                key: string = "") => {
    return axiosInstance.get("api/smscampaign/getAll", {
        params: {page, size, status, projectCode,groupId,tempId, key}
    })
}

export const countAllCampaign = (status: number = 0,
                                 projectCode: string = "",
                                 groupId:number = 0,
                                 tempId: number = 0,
                                 key: string = "") => {
    return axiosInstance.get("api/smscampaign/countAll", {
        params: {status, projectCode,groupId,tempId, key}
    })
}

export const createCampaign = (campaign: ICampaign) => {
    return axiosInstance.post("api/smscampaign/insert", campaign)
}
export const updateCampaign = (campaign: ICampaign) => {
    return axiosInstance.post("api/smscampaign/update", campaign)
}
export const deleteCampaign = (id: number) => {
    return axiosInstance.post("api/smscampaign/delete", {id})
}
export const getListCampaign = () => {
    return axiosInstance.get("api/smscampaign/getAllNoPage")
}