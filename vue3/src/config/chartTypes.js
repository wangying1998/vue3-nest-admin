const typeList = [
    {
        label: '柱状图',
        type: 'bar',
        icon: 'icon-zhuzhuangtu-',
    },
    {
        label: '趋势图',
        type: 'line',
        icon: 'icon-zhexiantu-',
    },
    {
        label: '饼状图',
        type: 'pie',
        icon: 'icon-huanxingtu-',
    },
    {
        label: '横向柱状图',
        type: 'xbar',
        icon: 'icon-huanxingtu-',
    },
];

const defaultOption = {
    chartHeight: 170,
    title: '',
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
        ],
    }
};

export default {
    typeList,
    defaultOption
};