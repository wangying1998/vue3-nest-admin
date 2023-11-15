<template>
    <div class="full-width full-height fl-item fl-sta-bet">
        <Layout
            ref="layout"
            class="fl-item"
            :data="data"
            :drag-element-list="dragElementList"
            @update:data="updateData"
            @edit:element="editHandle"
        ></Layout>
        <UpdateModule ref="updateModule"/>
    </div>
</template>

<script>
import { ref } from 'vue';
import Layout from '@/components/Layout/Layout.vue';
import chartTypes from '../../config/chartTypes';
import UpdateModule from './UpdateModule.vue';

export default {
    components: {
        Layout,
        UpdateModule,
    },
    setup() {
        let data = ref([]);
        data.value = [
            {
                x: 0,
                y: 0,
                w: 4,
                h: 6,
                i: '0',
                chartHeight: 170,
                type: 'line',
                title: '趋势图',
                options: {
                    axis: [
                        '2000-06-05',
                        '2000-06-06',
                        '2000-06-07',
                        '2000-06-08',
                        '2000-06-09',
                        '2000-06-10',
                        '2000-06-11',
                        '2000-06-12',
                        '2000-06-13',
                        '2000-06-14',
                        '2000-06-15',
                    ],
                    series: [
                        {
                            data: [116, 129, 135, 86, 73, 85, 73, 68, 92, 130, 245],
                        },
                        {
                            data: [139, 115, 111, 309, 206, 137, 128, 85, 94, 71, 106],
                        },
                        {
                            data: [84, 93, 85, 73, 83, 125, 107, 82, 44, 72, 106],
                        },
                        {
                            data: [66, 91, 92, 113, 107, 131, 111, 64, 69, 88, 77],
                        },
                    ],
                }
            },
            {
                x: 4,
                y: 0,
                w: 4,
                h: 6,
                i: '1',
                chartHeight: 170,
                type: 'bar',
                title: '柱状图',
                options: {
                    axis: [
                        "2000-06-05",
                        "2000-06-06",
                        "2000-06-07",
                        "2000-06-08",
                        "2000-06-09",
                        "2000-06-10",
                    ],
                    series: [
                        {
                            data: [116, 129, 135, 86, 73, 85],
                        },
                        {
                            data: [139, 115, 111, 109, 156, 137],
                        },
                    ],
                }
            },
            {
                x: 8,
                y: 0,
                w: 4,
                h: 6,
                i: '2',
                chartHeight: 170,
                type: 'pie',
                title: '饼图',
                options: {
                    axis: ['测试数据', 'data1', 'data2', 'data3'],
                    series: [
                        {
                            data: [95, 56, 56, 56],
                        },
                    ],
                }
            },
            {
                x: 0,
                y: 4,
                w: 4,
                h: 6,
                i: '3',
                chartHeight: 170,
                type: 'xbar',
                title: '横向柱状图',
                options: {
                    axis: [
                        "2000-06-05",
                        "2000-06-06",
                        "2000-06-07",
                        "2000-06-08",
                        "2000-06-09",
                        "2000-06-10",
                    ],
                    series: [
                        {
                            data: [116, 129, 135, 86, 73, 85],
                        },
                    ],
                }
            },
        ];

        let dragElementList = ref([]);

        dragElementList.value = chartTypes.typeList.map(item => {
            return {
                ...item,
                ...chartTypes.defaultOption
            }
        })

        const updateData = function(result) {
            data.value = result;
        };
        
        let updateModule = ref();
        const editHandle = function(data) {
            console.log(123, data)
        };
        return {
            data,
            dragElementList,
            updateModule,

            updateData,
            editHandle,
        };
    },
};
</script>