export const optionChart = {
    title: {
        text: 'Trend real-time',
        subtext: 'Power meter data (live)',
        left: 'center'
    },
    grid: {
        left: 60,
        top: 60,
        right: 80,
        bottom: 70
    },
    legend: {
        show: true,
        bottom: 'bottom'
    },
    tooltip: {
        trigger: 'axis',
        formatter: function (params) {
            params = params[0];
            let date = new Date(params.name);
            return (
                date.getDate() +
                '/' +
                (date.getMonth() + 1) +
                '/' +
                date.getFullYear() +
                ' : ' +
                params.value[1]
            );
        },
        axisPointer: {
            animation: false
        }
    },
    xAxis: {
        data: [],
        type: 'category',
        boundaryGap: true,
        splitLine: {
            show: false
        }
    },
    yAxis: {
        type: 'value',
        boundaryGap: [0, '100%'],
        splitLine: {
            show: true
        }
    },
    series: [] as any
};

// {
//     name: 'Watt',
//     type: 'line',
//     showSymbol: true,
//     showAllSymbol: true,
//     endLabel: {
//     show: true,
//         formatter: `{a|{a}}\n{hr|}\n  {b|{@[1]}} w  `,
//         borderColor: '#bbbbbb',
//         borderWidth: 1,
//         borderRadius: 5,
//         rich: {
//         a: {
//             lineHeight: 18,
//                 align: 'center',
//                 fontWeight: 'bold',
//         },
//         hr: {
//             borderColor: '#dbdcde',
//                 width: '100%',
//                 borderWidth: 1,
//                 height: 0,
//                 fontWeight: 'bold',
//         },
//         b: {
//             fontSize: 12,
//                 fontWeight: 'bold',
//                 lineHeight: 27,
//                 formatter: function (params) {
//                 return padDigits(params[1].value)
//             }
//         },
//         per: {
//             color: '#fff',
//                 backgroundColor: '#4C5058',
//                 padding: [3, 6],
//                 borderRadius: 3
//         }
//
//     }
// },
//     data: []
// }