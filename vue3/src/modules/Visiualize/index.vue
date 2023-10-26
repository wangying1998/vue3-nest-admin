<template>
    <Layout
        ref="layout"
        class="fl-item"
        :data="data"
        :drag-element-list="dragElementList"
        @update:data="updateData"
    ></Layout>
</template>

<script>
import Layout from '@/components/Layout/Layout.vue';
import { nextTick, onMounted, reactive, ref } from 'vue';
export default {
    components: {
        Layout
    },
    setup() {
        let data = ref([]);
        // data.value = [
            // {
            //     x: 0,
            //     y: 0,
            //     w: 4,
            //     h: 6,
            //     i: '0',
            //     type: 'line',
            //     chartHeight: 170
            // },
            // {
            //     x: 4,
            //     y: 0,
            //     w: 4,
            //     h: 6,
            //     i: '1',
            //     type: 'bar',
            //     chartHeight: 170
            // },
            // {
            //     x: 8,
            //     y: 0,
            //     w: 4,
            //     h: 6,
            //     i: '2',
            //     type: 'pie',
            //     chartHeight: 170
            // },
        // ];

        let dragElementList = ref([]);
        dragElementList.value = [
            {
                label: '柱状图',
                type: 'bar',
                icon: '#icon-fenzu',
                chartHeight: 170
            },
            {
                label: '趋势图',
                type: 'line',
                icon: '#icon-zhexiantu',
                chartHeight: 170
            },
            {
                label: '饼状图',
                type: 'pie',
                icon: '#icon-huanxingtu-',
                chartHeight: 170
            },
        ];

        const updateData = function(result) {
            data.value = result;
        };

        return {
            data,
            dragElementList,

            updateData,
        };
    },
};
</script>