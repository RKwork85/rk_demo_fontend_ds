import axiosInstance from "../utils/request";

// resp: 返回第58条数据
export function getDataset() {
    return axiosInstance.request({
        method: 'GET',
        url: '/dataset/58'
    })
}

// resp: 返回查询的数据
export function getDatasetById(id: number) {
    return axiosInstance.request({
        method: 'GET',
        url: `/dataset/${id}`
    })
}

// resp: 返回所有数据, 待做
export function getDatasetAll(id: number) {
    return axiosInstance.request({
        method: 'GET',
        url: `/dataset/${id}`
    })
}

// resp: 增加一条数据
export function postDataset(instruction: string, output: string) {
    return axiosInstance.request({
        method: 'POST',
        url: '/dataset',
        data: {
            instruction: instruction,
            output: output
        }

    })
}
// resp: 修改前数据 以及修改后数据
export function putDataset(uid:number, instruction:string, output:string) {
    return axiosInstance.request({
        method: 'PUT',
        url: `/dataset/${uid}?instruction=${instruction}&output=${output}`
    })
}

// resp: 删除数据的id号
export function delDataset(id: number) {
    return axiosInstance.request({
        method: 'DELETE',
        url: `/dataset/${id}`

    })
}