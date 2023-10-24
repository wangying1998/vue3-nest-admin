<template>
    <Layout
        ref="layout"
        class="fl-item"
        :data="data"
        @update:data="updateData"
    ></Layout>
</template>

<script>
import Layout from '@/components/Layout/Layout.vue';
import { nextTick, onMounted, ref } from 'vue';
export default {
    components: {
        Layout
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
            },
            {
                x: 4,
                y: 0,
                w: 4,
                h: 6,
                i: '1',
            },
            {
                x: 8,
                y: 0,
                w: 4,
                h: 6,
                i: '2',
            },
        ];

        const updateData = function(result) {
            data.value = result;
        };

        return {
            data,

            updateData,
        };
    },
};
</script>