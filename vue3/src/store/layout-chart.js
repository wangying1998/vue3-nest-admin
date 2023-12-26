// stores/chart.js
import { defineStore } from 'pinia';
import { ChartColors } from '@/config/chartColors';

export const useChartStore = defineStore('chart', {
    state: () => {
        return {
            chartData: []
        };
    },
    actions: {
        initChartData(data) {
            this.chartData = data;
            this.chartData.forEach(item => {
                // 没有颜色列表 使用主题色，有颜色列表使用原有颜色列表
                if(!item.color || !item.color.length) {
                    let themeColor = ChartColors.find(color => color.theme === item.theme);
                    item.color = [].concat(themeColor.color);
                }
            })
        },
        updateChartList(data) {
            this.chartData = [].concat(data);
        },
        updateChartItem(index, data) {
            this.chartData[index] = Object.assign({}, data);
        },
    },
});