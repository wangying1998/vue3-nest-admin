<template>
    <div class="fl-bet-cen">
        <div class="chart-title">{{ title }}</div>
        <el-icon color="var(--bg-color)" class="cursor"
            ><MoreFilled
        /></el-icon>
    </div>
</template>

<script>
export default {
    props: {
        title: ''
    },
    setup (props) {
        

        return {
            props
        }
    }
}
</script>

<style lang="scss" scoped>
.chart-title {
        &::before {
            content: "";
            display: inline-block;
            width: 8px;
            height: 8px;
            margin-right: 5px;
            border-radius: 3px;
            background-color: var(--bg-color);
        }
    }
</style>