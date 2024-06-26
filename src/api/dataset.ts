import axiosInstance from "../utils/request";

export function loginPost(uuid: string) {
    return axiosInstance.request({
        method: 'POST',
        url: '/login',
        data: {
            uuid: uuid,
        }

    })
}

export function setUuid() {
    return axiosInstance.request({
        method: 'GET',
        url: `/api/login`
    })
}

export function checkUuid() {
    return axiosInstance.request({
        method: 'GET',
        url: `/api/dashboard`
    })
}
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

// resp: 返回所有数据, 一个json： {data:[[{id,{}],[{id,{}],...]]} 示例：[5, {'input': '', 'instruction': '你好', 'output': '我是广州阿斯加德莱克斯顿就看见阿拉萨吉拉拉吉林省拉德季拉丝机到啦萨达撒娇漏打卡'}]
export function getDatasetAll() {
    return axiosInstance.request({
        method: 'GET',
        url: '/dataset'
    })
}

// resp: 增加一条数据
export function postDataset(uuid:string, instruction: string, output: string) {
    return axiosInstance.request({
        method: 'POST',
        url: '/dataset',
        data: {
            uuid:uuid,
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