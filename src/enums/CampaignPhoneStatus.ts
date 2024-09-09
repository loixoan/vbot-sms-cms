type TCampaignPhoneStatus = {
    [key:number]: {
        [key: string]: string;
    };
};
export const CampaignPhoneStatus:TCampaignPhoneStatus = {
    0: {
        message: 'Sẵn sàng',
        color: 'badge bg-danger'
    },
    1: {
        message: 'Đang gửi',
        color: 'badge bg-warning text-dark'
    },
    2: {
        message: 'Đã gửi',
        color: 'badge bg-success'
    }
}