<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue';
import { getDataset,postDataset,getDatasetAll,getDatasetById, delDataset, putDataset } from './api/dataset';




let dataset = ref<string>('')
var num = ref(0)

var instruction = ref(null) // 用于存储 id 的响应式引用  
var input = ref(null) // 用于存储 name 的响应式引用  
var output = ref(null) // 用于存储 name 的响应式引用

interface Data {
    id: number
    instruction: string
    input: string
    output: string
    userData: string[]
    //   userData: Array<string | number>;
}

const data: Data = reactive({
    id: 10,
    instruction: '',
    input: '',
    output: '',
    userData: []
})
const upgradeData: Data = reactive({
    id: 10,
    instruction: '',
    input: '',
    output: '',
    userData: []
})
const allData = reactive([])


const getResult = () => {
    getDatasetById(data.id).then(res => {
        console.log(res);
        if (res.status == 200) {
            console.log(res.data)

            dataset = res.data        // 返回来的数据
            instruction = dataset.instruction;
            input = dataset.input;
            output = dataset.output;  //解构
            console.log(instruction, input, output )
            console.log("来自第10条数据")

            let data_item = `{"instruction": "${instruction}", "input": "${input}","output": "${output}"}`  //组装
            console.log(data_item)
            data.userData.unshift(data_item);
                                     

        } else {
            console.log(`获取id为${data.id}失败！`)
        }
    })
}
const delResult = () => {
    delDataset(data.id).then(res => {
        console.log(res);
        if (res.status == 200) {

            let id = res.data        // 返回来的数据
            console.log(id.data)

            // 根据id列表找到 与数据库中的id相匹配的结果 
            // data.userData.unshift(data_item); 删除数据中的id
        } else {
            console.log(`获取id为${data.id}失败！`)
        }
    })
}
const upgradeResult = () => {
    putDataset(upgradeData.id,upgradeData.instruction,upgradeData.output).then(res => {
        console.log(res);
        if (res.status == 200) {

            let data = res.data        // 返回来的数据
            console.log('oldDataset' ,data.oldDataset)
            console.log('newDataset' , data.newDataset)

            // 根据id列表找到 与数据库中的id相匹配的结果 
            // data.userData.unshift(data_item); 更新数据中的id 的那条数据
        } else {
            console.log(`更新id为${data.id}失败！`)
        }
    })
}

const postResult = () => {
    postDataset(data.instruction, data.output).then(res => {
        console.log(res);
        if (res.status == 200) {

            let data_item = `{"instruction": "${data.instruction}", "input": "${data.input}","output": "${data.output}"}`
            data.userData.unshift(data_item);
            console.log(data_item)
            clearInput();

        } else {
            console.log('发送数据失败！');
        }
    });
};




const send = () => {
    getDataset().then(res => {
        console.log('向后端发送请求我是按钮')
        console.log(res)
        dataset = res.data
        instruction = dataset.instruction;
        input = dataset.input;
        output = dataset.output;

        num.value++
    })
}

const clearInput = () => {
    data.instruction = '';
    data.output = '';
};

const handleClick = () => {
    postResult();
};


onMounted(() => {
    getDataset().then(res => {
        console.log('向后端发送请求挂载后：单条数据请求')
        console.log('返回的单条数据格式',res)
        dataset = res.data
        num.value++
        return dataset
    })
    getDatasetAll().then(res => {
        console.log('向后端发送请求挂载后：所有数据请求')
        console.log('返回的所有数据格式',res)

        // allData = res.data.data
        // console.log('allData内容：', allData)
        // console.log('alldata的类型是： ',typeof (allData))
        // let name = 'rkwork'
        // allData.unshift(name)
        // return allData

        const newData: any[] = res.data.data;
        allData.push(...newData);
    })
})

</script>

<template>
    <h1>这里是rkwork <br>现在的工作内容是要将数据集制作的前端给做出来！</h1>

    <h1></h1>{{ dataset }}<hr>
    
    {{ num }}
    <button @click="send"> 发送事件</button>
    <hr>
    <div style="color: white;font-size: large; font-family: fantasy; background-color: blue;font-weight: bold;">
        { "instruction": "{{ instruction }}", "input": "{{ input }}","output": "{{ output }}"{{ num }} }
    </div>
    <div class="senddata">
        输入：<input type="text" v-model="data.instruction"><br>
        输出：<input type="text" v-model="data.output">
        <div>
            <li>{{ data.instruction }}</li>
            <li>{{ data.output }}</li><button @click="handleClick">增加数据按钮</button>

        </div>
        <!-- 增加单条数据显示出来 -->
        <ul v-for="value in data.userData">
            <li>{{ value }}</li>
        </ul>
        <!-- 所有的数据显示出来 -->
        <ul>
        <li v-for="(value, index) in allData">
            {{ index }}:id{{ value[0] }}: {{ value[1] }}
        </li>
        </ul>
    </div>
    <!-- 获取id为 的数据集 -->
    <div>
        请输入您想查询的数据集ID：<input type="text" v-model="data.id"><button @click="getResult"> 获取 </button> 
    </div>
    <!--删除id为 的数据集-->
    <div>
        请输入您想删除的数据集ID：<input type="text" v-model="data.id"><button @click="delResult"> 删除 </button> 
    </div>


    <div class="rk-st-dialogue" style="background-color: black;    height: 100px;width: 100%;">
        <span style="color: rgb(171, 227, 56);">Human: </span><span style="color: rgb(245, 171, 53);">
            <用户的问题或对话内容><br>
        </span>
        <span style="color: rgb(171, 227, 56);">Assistant:</span><span style="color: rgb(245, 171, 53);">
            <模型生成的响应>
        </span>
    </div>
    <!-- 更新数据集 -->
    <div>
            请输入您想更新的数据集ID：<input type="text" v-model="upgradeData.id"> 输入 <input type="text" v-model="upgradeData.instruction"> 输出<input type="text" v-model="upgradeData.output">
                    
            <button @click="upgradeResult"> 更新 </button> 
    </div>
    <!-- 拿到所有的数据 渲染到页面上 每一条数据的样式待修改-->
    <div>
        
    </div>

</template>


<style scoped></style>
