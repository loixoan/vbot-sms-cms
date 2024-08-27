import {Status} from "@/enums/Status";

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

export const checkStatus = (status:any):boolean => {
    Object.keys(Status).forEach(key => {
        if (status == key) return true;
    })
    return false;
}
export const closeModal = (id:string) => {
    $(`#${id}`).modal("hide")
};
