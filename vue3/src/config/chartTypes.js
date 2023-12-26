const TypeList = [
    {
        label: '柱状图',
        type: 'bar',
        icon: 'icon-zhuzhuangtu',
    },
    {
        label: '水平柱状图',
        type: 'xbar',
        icon: 'icon-tiaoxingtu',
    },
    {
        label: '趋势图',
        type: 'line',
        icon: 'icon-zhexiantu',
    },
    {
        label: '环形图',
        type: 'pie',
        icon: 'icon-huanxingtu',
    },
    {
        label: '饼状图',
        type: 'pie',
        icon: 'icon-bingzhuangtu',
    },
    {
        label: '数据表',
        type: 'tabel',
        icon: 'icon-shujubiao',
    },
    {
        label: '列表',
        type: 'list',
        icon: 'icon-liebiao',
    },
];

const DefaultOption = {
    chartHeight: 200,
    theme: 'default',
    titleOptions: {
        title: '趋势图',
        showTitle: true,
        fontSize: 14,
        titleColor: '#121212',
    },
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

export {
    TypeList,
    DefaultOption
};