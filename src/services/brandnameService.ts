import axiosInstance from "@/utils/axios";

export const getAllBrandname = (page: number,
                                size: number,
                                status: number = 0,
                                type: string = "",
                                key: string = "") => {
    return axiosInstance.get("api/brandName/getAll", {
        params: {page, size, status, type, key}
    })
}

export const countAllBrandname = (status: number = 0,
                                  type: string = "",
                                  key: string = "") => {
    return axiosInstance.get("api/brandName/countAll", {
        params: {status, type,key}
    })
}

export const createBrandname = (brandname: IBrandname) => {
    return axiosInstance.post("api/brandName/create", brandname)
}
export const updateBrandname = (brandname: IBrandname) => {
    return axiosInstance.post("api/brandName/update", brandname)
}
export const deleteBrandname = (id: number) => {
    return axiosInstance.post("api/brandName/delete", {id})
}
export const getListBrandname = () => {
    return axiosInstance.get("api/brandName/getAllBrandName")
}