import {Status} from "@/enums/Status";
import router from "@/router";
import {getListBrandname} from "@/services/brandnameService";
import {getListCampaign} from "@/services/campaignService";
import {getListCampaignGroup} from "@/services/campaignGroupService";
import {getListTemplate} from "@/services/templateService";
import {TypeCustomField} from "@/enums/TypeCustomField";
import {TypeBrandname} from "@/enums/TypeBrandname";

export const formatDate = (dateString: string) => {
    if (!dateString) return '';

    const date = new Date(dateString);

    if (isNaN(date.getTime())) return '';

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${day}-${month}-${year} ${hours != '00' && minutes != '00' && seconds != '00' ? hours + ':' + minutes + ':' + seconds : ''}`;
}

export const formatDateToInput = (dateString: string) => {
    if (!dateString) return '';

    const date = new Date(dateString);

    if (isNaN(date.getTime())) return '';

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${year}-${month}-${day}`;
}

export const checkStatus = (status: any): boolean => {
    Object.keys(Status).forEach(key => {
        if (status == key) return true;
    })
    return false;
}
export const checkType = (status: string,clazz:object): boolean => {
  return Object.keys(clazz).some(key => {
        return status == key;
    });
}
export const closeModal = (id: string) => {
    $(`#${id}`).modal("hide")
};

export const paramUrl = () => {
    return router.currentRoute.value.query;
}
export const getAllBrandname = async (): Promise<IBrandname[] | []> => {
    try {
        const res = await getListBrandname();
        return res.data.data as IBrandname[];
    } catch (error) {
        console.error(error);
        return [];
    }
};
export const getAllCampaign = async (): Promise<ICampaign[] | []> => {
    try {
        const res = await getListCampaign();
        return res.data.data as ICampaign[];
    } catch (error) {
        console.error(error);
        return [];
    }
};
export const getAllCampaignGroup = async (): Promise<ICampaignGroup[] | []> => {
    try {
        const res = await getListCampaignGroup();
        return res.data.data as ICampaignGroup[];
    } catch (error) {
        console.error(error);
        return [];
    }
};
export const getAllTemplate = async (): Promise<ITemplate[] | []> => {
    try {
        const res = await getListTemplate();
        return res.data.data as ITemplate[];
    } catch (error) {
        console.error(error);
        return [];
    }
};
export const formatCurrency = (number:number) => {
    return number.toLocaleString('vi-VN') + ' ₫';
};
export const checkPhoneVN = (phoneNumber:string):boolean => {
    const regex = /^(0|\+84)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-9]|9[0-9])\d{7}$/;
    return regex.test(phoneNumber);
}

export const getCurrentDateInstant = ():string => {
    return formatInstantToDate(new Date().toDateString());
}
export const formatInstantToDate = (date:string):string => {
    return new Intl.DateTimeFormat('en-CA').format(new Date(date));
}

export const getArrayParamsUrl =  (string: any):string[] => {
    return string? Array.isArray(string)? string as string[] : [String(string)] : [];
}

