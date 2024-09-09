import axiosInstance from "@/utils/axios";

export const getAllCustomField = (page: number,
                                size: number,
                                type:string= '',
                                isRequired: boolean| null = null,
                                key: string = "") => {
    return axiosInstance.get("api/smsField/getAll", {
        params: {page, size, type,isRequired,key}
    })
}

export const countAllCustomField = (type:string= '',
                                    isRequired: boolean| null = null,
                                    key: string = "") => {
    return axiosInstance.get("api/smsField/countAll", {
        params: { type,isRequired,key}
    })
}

export const createCustomField = (customField: ICustomField) => {
    return axiosInstance.post("api/smsField/insert", customField)
}
export const updateCustomField = (customField: ICustomField) => {
    return axiosInstance.post("api/smsField/update", customField)
}
export const deleteCustomField = (id: number) => {
    return axiosInstance.post("api/smsField/delete", {id})
}
export const getListCustomField = () => {
    return axiosInstance.get("api/smsField/getAllNoPage")
}