type TCampaignStatus = {
    [key:number]: {
        [key: string]: string;
    };
};
export const CampaignStatus:TCampaignStatus = {
    0: {
        message: 'READY',
        color: 'badge bg-primary'
    },
    1: {
        message: 'RUNNING',
        color: 'badge bg-secondary'
    },
    2: {
        message: 'PENDING',
        color: 'badge bg-warning text-dark'
    },
    3: {
        message: 'STOPED',
        color: 'badge bg-danger'
    },
    4: {
        message: 'DONE',
        color: 'badge bg-success'
    }
}