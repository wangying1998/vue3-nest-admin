import { ref } from 'vue';
/**
 * 计算layout布局 从外部拖拽后的位置
 */
export default function useCalcLayout() {
    // 新增元素的默认尺寸
    let defaultSize = {
        w: 4,
        h: 6
    };

    // 容器宽度
    let containerWidth = ref(0);
    // 每个元素间距
    let margin = [10, 10];
    // 列的数量
    let colNum = 12;
    // 行高
    let rowHeight = 30;
    // 最大行数
    let maxRows = 100;
    // 内部元素宽度
    let innerW = defaultSize.w;
    // 内部元素高度
    let innerH = defaultSize.h;
    

    // 是否允许拖拽
    let isDraggable = ref(true);
    // 是否可以调整大小
    let isResizable = ref(true);
    // 是否镜像
    let isMirrored = ref(false);
    // 是否垂直压缩
    let verticalCompact = ref(false);
    // 标识是否使用CSS属性 transition-property: transform;
    let useCssTransforms = ref(false);

    /**
     * 计算每一列所占宽度
     */
    function calcColWidth() {
        let colWidth = (containerWidth.value - margin[0] * (colNum + 1)) / colNum;
        return colWidth;
    }
    
    /**
     * 计算相对位置
     * @param {*} top 鼠标当前所处位置 距离 容器顶部的像素值
     * @param {*} left 鼠标当前所处位置 距离 容器左边的像素值
     * @returns 由距离换算出的 layout 的 单元格占位
     */
    function calcXY(top, left) {
        let colWidth = calcColWidth();
        // left = colWidth * x + margin * (x + 1)
        // l = cx + m(x+1)
        // l = cx + mx + m
        // l - m = cx + mx
        // l - m = x(c + m)
        // (l - m) / (c + m) = x
        // x = (left - margin) / (coldWidth + margin)

        let x = Math.round((left - margin[0]) / (colWidth + margin[0]));
        // Capping
        let y = Math.round((top - margin[1]) / (rowHeight + margin[1]));
        
        x = Math.max(Math.min(x, colNum - innerW), 0);
        y = Math.max(Math.min(y, maxRows - innerH), 0);
        
        // console.log(x, y)

        return {
            x: x,
            y: y
        };
    }


    return {
        containerWidth,
        margin,
        colNum,
        rowHeight,
        maxRows,
        innerW,
        innerH,

        isDraggable,
        isResizable,
        isMirrored,
        verticalCompact,
        useCssTransforms,

        defaultSize,

        calcXY
    }
}

