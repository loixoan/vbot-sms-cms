type TStatus = {
    [key:number]: {
        [key: string]: string;
    };
};
export const Status:TStatus = {
    0: {
        message: 'Hoạt động',
        color: 'badge bg-success'
    },
    1: {
        message: 'Tạm dừng',
        color: 'badge bg-danger'
    }
}