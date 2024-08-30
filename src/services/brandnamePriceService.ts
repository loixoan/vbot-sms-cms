import axiosInstance from "@/utils/axios";

export const getAllBrandnamePrice = (page: number,
                                size: number,
                                key: string = "") => {
    return axiosInstance.get("api/brandNamePrice/getAll", {
        params: {page, size, key}
    })
}

export const countAllBrandnamePrice = (key: string = "") => {
    return axiosInstance.get("api/brandNamePrice/countAll", {
        params: {key}
    })
}

export const createBrandnamePrice = (brandnamePrice: IBrandnamePrice) => {
    return axiosInstance.post("api/brandNamePrice/create", brandnamePrice)
}
export const updateBrandnamePrice = (brandnamePrice: IBrandnamePrice) => {
    return axiosInstance.post("api/brandNamePrice/update", brandnamePrice)
}
export const deleteBrandnamePrice = (id: number) => {
    return axiosInstance.post("api/brandNamePrice/delete", {id})
}