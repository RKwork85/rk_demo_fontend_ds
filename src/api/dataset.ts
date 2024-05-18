import axiosInstance from "../utils/request";

export function getDataset(){
    return axiosInstance.request({ 
        method:'GET',
        url:'/dataset/10'
    })
}

export function getDatasetAll(id:number){
    return axiosInstance.request({ 
        method:'GET',
        url:`/dataset/${id}`
    })
}

export function postDataset(instruction: string, output: string){
    return axiosInstance.request({ 
        method:'POST',
        url:'/dataset',
        data: {
                instruction: instruction,
                output: output   
        }

    })
}

export function putDataset(){
    return axiosInstance.request({ 
        method:'PUT',
        url:'/dataset/10'
    })
}


export function delDataset(){
    return axiosInstance.request({ 
        method:'DELETE',
        url:'/dataset/10'
    })
}