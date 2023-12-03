import * as echarts from 'echarts'

export let optionPie = {
    title: {
        text: 'Referer of a Meter Group' as any,
        subtext: 'Watt in (meter group name)',
        left: 'center'
    },
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
        data: [],
        bottom: 0
    },
    series: [
        {
            name: 'Watt',
            type: 'pie',
            radius: ['32%', '45%'],
            labelLine: {
                length: 40,
            },
            label: {
                formatter: '{a|{b}}{abg|}\n{hr|}\n  {b|{c} } {per|{d}%} ',
                borderColor: '#bbbbbb',
                borderWidth: 1,
                borderRadius: 5,
                rich: {
                    a: {
                        lineHeight: 18,
                        align: 'center',
                        fontWeight: 'bold',
                    },
                    hr: {
                        borderColor: '#dbdcde',
                        width: '100%',
                        borderWidth: 1,
                        height: 0,
                        fontWeight: 'bold',
                    },
                    b: {
                        fontSize: 12,
                        fontWeight: 'bold',
                        lineHeight: 27,
                    },
                    per: {
                        color: '#fff',
                        backgroundColor: '#4C5058',
                        padding: [3, 6],
                        borderRadius: 3
                    }

                }
            },
            data: [] as any
        }
    ]
};


const colorPalette = [
    '#4992ff',
    '#7cffb2',
    '#fddd60',
    '#ff6e76',
    '#58d9f9',
    '#05c091',
    '#ff8a45',
    '#8d48e3',
    '#dd79ff'
];
const contrastColor = '#B9B8CE';
// const backgroundColor = '#1a202c';
const backgroundColor = 'transparent';
const axisCommon = function () {
    return {
        axisLine: {
            lineStyle: {
                color: contrastColor
            }
        },
        splitLine: {
            lineStyle: {
                color: '#2c2c36'
            }
        },
        splitArea: {
            areaStyle: {
                color: ['rgba(255,255,255,0.02)', 'rgba(255,255,255,0.05)']
            }
        },
        minorSplitLine: {
            lineStyle: {
                color: '#20203B'
            }
        }
    };
};
const darkTheme = {
    darkMode: true,
    color: colorPalette,
    backgroundColor: backgroundColor,
    axisPointer: {
        lineStyle: {
            color: '#817f91'
        },
        crossStyle: {
            color: '#817f91'
        },
        label: {
            // TODO Contrast of label backgorundColor
            color: '#fff'
        }
    },
    legend: {
        textStyle: {
            color: contrastColor
        }
    },
    textStyle: {
        color: contrastColor
    },
    title: {
        textStyle: {
            color: '#EEF1FA'
        },
        subtextStyle: {
            color: '#B9B8CE'
        }
    },
    toolbox: {
        iconStyle: {
            borderColor: contrastColor
        }
    },
    endLabel: {backgroundColor: '#333e50'},
    dataZoom: {
        borderColor: '#71708A',
        textStyle: {
            color: contrastColor
        },
        brushStyle: {
            color: 'rgba(135,163,206,0.3)'
        },
        handleStyle: {
            color: '#353450',
            borderColor: '#C5CBE3'
        },
        moveHandleStyle: {
            color: '#B0B6C3',
            opacity: 0.3
        },
        fillerColor: 'rgba(135,163,206,0.2)',
        emphasis: {
            handleStyle: {
                borderColor: '#91B7F2',
                color: '#4D587D'
            },
            moveHandleStyle: {
                color: '#636D9A',
                opacity: 0.7
            }
        },
        dataBackground: {
            lineStyle: {
                color: '#71708A',
                width: 1
            },
            areaStyle: {
                color: '#71708A'
            }
        },
        selectedDataBackground: {
            lineStyle: {
                color: '#87A3CE'
            },
            areaStyle: {
                color: '#87A3CE'
            }
        }
    },
    visualMap: {
        textStyle: {
            color: contrastColor
        }
    },
    timeline: {
        lineStyle: {
            color: contrastColor
        },
        label: {
            color: contrastColor
        },
        controlStyle: {
            color: contrastColor,
            borderColor: contrastColor
        }
    },
    calendar: {
        itemStyle: {
            color: backgroundColor
        },
        dayLabel: {
            color: contrastColor
        },
        monthLabel: {
            color: contrastColor
        },
        yearLabel: {
            color: contrastColor
        }
    },
    timeAxis: axisCommon(),
    logAxis: axisCommon(),
    valueAxis: axisCommon(),
    categoryAxis: axisCommon(),

    line: {
        symbol: 'circle'
    },
    graph: {
        color: colorPalette
    },
    gauge: {
        title: {
            color: contrastColor
        }
    },
    candlestick: {
        itemStyle: {
            color: '#FD1050',
            color0: '#0CF49B',
            borderColor: '#FD1050',
            borderColor0: '#0CF49B'
        }
    }
} as any;
darkTheme.categoryAxis.splitLine.show = false;
echarts.registerTheme('mydark', darkTheme);
const lightTheme = {
    endLabel: {backgroundColor: '#d9dce3'},
}
echarts.registerTheme('mylight', lightTheme);