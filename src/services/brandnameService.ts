import axiosInstance from "@/utils/axios";

export const getAll = (page:number,
                       size:number,
                       code = null,
                       name = null,
                       status = null,
                       type = null) => {
   return axiosInstance.get("api/brandName/getAll",{
       params: {page,size,code,name,status,type}
   })
}

export const countAll = (code = null,
                       name = null,
                       status = null,
                       type = null) => {
    return axiosInstance.get("api/brandName/countAll",{
        params: {code,name,status,type}
    })
}

export const create = (brandname:IBrandname) => {
    return axiosInstance.post("api/brandName/create",brandname)
}
export const update = (brandname:IBrandname) => {
    return axiosInstance.post("api/brandName/update",brandname)
}
