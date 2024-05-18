<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue';
import { getDataset } from './api/dataset';
import { postDataset } from './api/dataset';


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
let require = ref<number>

const data: Data = reactive({
    id: 10,
    instruction: '',
    input: '',
    output: '',
    userData: []
});

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


const getResult = () => {
    getDataset(data.id).then(res => {
        console.log(res);
        if (res.status == 200) {
            console.log(res.data)
        } else {
            console.log(`获取id为${data.id}失败！`)
        }
    })
}

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
        console.log('向后端发送请求挂载后')
        console.log(res)
        dataset = res.data
        num.value++
        return dataset
    })
})

</script>

<template>
    <h1>这里是rkwork <br>现在的工作内容是要将数据集制作的前端给做出来！</h1>

    <h1></h1>{{ dataset }}
    <hr>
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
            <li>{{ data.output }}</li><button @click="handleClick">点击按钮</button>

        </div>
        <ul v-for="value in data.userData">
            <li>{{ value }}</li>
        </ul>
    </div>
    <div>
        请输入您想查询的数据集ID：<input type="text" v-model="data.id">

    </div>


    <div class="rk-st-dialogue" style="background-color: black;    height: 100px;width: 100%;">
        <span style="color: rgb(171, 227, 56);">Human: </span><span style="color: rgb(245, 171, 53);">
            <用户的问题或对话内容><br>
        </span>
        <span style="color: rgb(171, 227, 56);">Assistant:</span><span style="color: rgb(245, 171, 53);">
            <模型生成的响应>
        </span>
    </div>


    <!-- 获取id为 的数据集 -->
    <div>
        <input type="text" v-model="data.id">
        {{ data.id }}
    </div>
</template>


<style scoped></style>
