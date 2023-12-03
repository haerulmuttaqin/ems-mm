export const optionBar = {
    title: {
        text: 'Trend Hourly',
        subtext: 'Power meter data',
        left: 'center'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    legend: {
        show: true,
        bottom: 'bottom'
    },
    grid: {
        left: '0%',
        right: '2%',
        bottom: '9%',
        containLabel: true
    },
    xAxis: [
        {
            type: 'category',
            data: [] as any,
            axisTick: {
                alignWithLabel: true
            }
        },
    ],
    yAxis: [
        {
            type: 'value',
        }
    ],
    series: [] as any
};