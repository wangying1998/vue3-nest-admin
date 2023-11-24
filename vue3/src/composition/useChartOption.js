import { DefaultColors } from '@/config/chartColors';
/**
 * 表格配置
 */
export default function useChartOption() {
    let defaultOptions = {
        color: DefaultColors,
    };

    const generateChartConfig = function (chartOption) {
        let type = chartOption.type;
        let customOption = {};
        if (type === 'line') {
            customOption = formatLine(chartOption);
        } else if (type === 'bar') {
            customOption = formatBar(chartOption);
        } else if (type === 'xbar') {
            customOption = formatBar(chartOption);
        } else if (type === 'pie') {
            customOption = formatPie(chartOption);
        }

        return Object.assign(defaultOptions, customOption);
    };

    /**
     * 生成 折线图 通用配置
     * @param {Object} config
     * @param {Array} config.axis 横/纵坐标列表
     * @param {Object} config.series 表格数值
     */
    const formatLine = function (config) {
        /**
         * config: {
         *      type: 'line',
         *      axis: [],
         *      series: [
         *          {
         *              data: []
         *          }
         *      ]
         * }
         */
        let option = {
            tooltip: {
                trigger: 'axis',
            },
            xAxis: {
                type: 'category',
                data: config.axis,
            },
            yAxis: {
                type: 'value',
                splitLine: {
                    show: false,
                },
            },
            grid: {
                left: 0,
                right: 0,
                top: '30px',
                bottom: 0,
                containLabel: true,
            },
            series: []
        };

        config.series.forEach((item) => {
            option.series.push({
                data: item.data,
                type: 'line',
                showSymbol: false,
                symbolSize: 5,
                smooth: true,
            });
        });

        return option;
    };
    /**
     * 生成 横/纵柱状图 通用配置
     * @param {Object} config
     * @param {Array} config.axis 横/纵坐标列表
     * @param {Object} config.series 表格数值
     */
    const formatBar = function (config) {
        /**
         * config: {
         *      type: 'bar/xbar',
         *      axis: [],
         *      series: [
         *          {
         *              data: []
         *          }
         *      ]
         * }
         */
        let verticalBar = config.type === 'bar';
        let option = {
            tooltip: {
                trigger: 'axis',
            },
            xAxis: {
                type: verticalBar ? 'category' : 'value',
                data: config.axis,
                splitLine: {
                    show: false,
                },
                // axisLine: {
                //     show: false,
                // },
                // axisTick: {
                //     show: false,
                // },
            },
            yAxis: {
                type: verticalBar ? 'value' : 'category',
                splitLine: {
                    show: false,
                },
                axisLine: {
                    show: false,
                },
                axisTick: {
                    show: false,
                },
            },
            label: verticalBar
                ? {}
                : {
                      show: true,
                      position: 'right',
                      distance: 10,
                      color: '#121212',
                      backgroundColor: 'transparent',
                  },
            grid: {
                left: 0,
                right: 0,
                top: '30px',
                bottom: 0,
                containLabel: true,
            },
            series: []
        };

        config.series.forEach((item) => {
            option.series.push({
                data: item.data,
                type: 'bar',
                barMaxWidth: '20px',
                itemStyle: verticalBar
                    ? {}
                    : {
                          borderRadius: 20,
                      },
            });
        });

        return option;
    };
    /**
     * 生成 环形图 通用配置
     * @param {Object} config
     * @param {Array} config.axis 坐标列表
     * @param {Object} config.series 表格数值
     */
    const formatPie = function (config) {
        /**
         * config: {
         *      type: 'pie',
         *      axis: [],
         *      series: [
         *          {
         *              data: []
         *          }
         *      ]
         * }
         */

        let pieData = [];
        config.axis.forEach((item, index) => {
            pieData.push({
                name: item,
                value: config.series[0].data[index]
            })
        })

        let option = {
            tooltip: {
                trigger: 'item'
            },
            legend: {
                type: 'scroll',
                orient: 'vertical',
                top: '0',
                right: '0',
                itemWidth: 6,
                itemHeight: 6,
                pageIconSize: 11,
                pageButtonItemGap: 0,
                textStyle: {
                    color: '#121212',
                    fontSize: 13,
                },
            },
            series: []
        };

        config.series.forEach((item) => {
            option.series.push({
                data: pieData,
                type: 'pie',
                radius: ['60%', '80%'],
                avoidLabelOverlap: false,
                label: {
                    show: false,
                    position: 'center',
                    color: '#121212',
                    backgroundColor: 'transparent',
                },
                emphasis: {
                    label: {
                        show: true,
                        formatter: '{b}\n\n{c}',
                    }
                },
                labelLine: {
                    show: false
                },
            });
        });

        return option;
    };

    return {
        generateChartConfig,
    };
}
