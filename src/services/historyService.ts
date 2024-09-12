import axiosInstance from "@/utils/axios";
import {getCurrentDateInstant} from "@/helpers/functions";
import qs from 'qs'

export const getAllHistory = (
    page: number,
    size: number,
    brandCodes: string[] = [],
    campaignCodes: string[] = [],
    tempCodes: string[] = [],
    status: number = 0,
    start: string = getCurrentDateInstant(),
    end: string = getCurrentDateInstant()
) => {
    console.log(brandCodes)
    return axiosInstance.get("api/history/statistical/getAll", {
        params: {
            page,
            size,
            brandCodes: brandCodes.join(','),
            campaignCodes: campaignCodes.join(','),
            tempCodes: tempCodes.join(','),
            status,
            start,
            end,
        },
    });
};


export const countAllHistory = (brandCodes: string[] = [],
                                campaignCodes: string[] = [],
                                tempCodes: string[] = [],
                                status: number = 0,
                                start: string = getCurrentDateInstant(),
                                end: string = getCurrentDateInstant()) => {
    return axiosInstance.get("api/history/statistical/countAll", {
        params: {
            brandCodes: brandCodes.join(","),
            campaignCodes: campaignCodes.join(","),
            tempCodes: tempCodes.join(","),
            status,
            start,
            end
        }
    })
}