import axiosInstance from "@/utils/axios";

export const getAllTemplate = (page: number,
                                size: number,
                                status:number = 0,
                                brandnameId: number,
                                key: string = "") => {
    return axiosInstance.get("api/template/getAll", {
        params: {page, size, status,brandnameId,key}
    })
}

export const countAllTemplate = (status:number = 0,
                                 brandnameId: number|null,
                                 key: string = "") => {
    return axiosInstance.get("api/template/countAll", {
        params: {status,brandnameId,key}
    })
}

export const createTemplate = (template: ITemplate) => {
    return axiosInstance.post("api/template/create", template)
}
export const updateTemplate = (template: ITemplate) => {
    return axiosInstance.post("api/template/update", template)
}
export const deleteTemplate = (id: number) => {
    return axiosInstance.post("api/template/delete", {id})
}