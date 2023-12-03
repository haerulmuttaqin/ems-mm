import React, {useEffect, useRef} from "react";
import {optionPie} from "../../app/utils/optionPie";
import {Box, useColorModeValue} from "@chakra-ui/react";
import ReactECharts from "echarts-for-react";
import variablePieChart from "app-config/variable-piechart.json"
import configChart from "app-config/option-chart.json"

const BoxPieChart = (data) => {
    const {data: chartData} = data?.data?.data
    const groupData = data?.data?.group
    const eChartsRef = useRef() as any
    useEffect(() => {
        if (eChartsRef && eChartsRef.current) {
            optionPie.series[0].data = []
            optionPie.title.text = `${configChart.filter((it) => it.key == 'chart-0')?.[0].title}`
            optionPie.title.subtext = `${variablePieChart.key} (${groupData?.metergroupid}) with ${groupData?.num_member} members`
            chartData.forEach(item => {
                optionPie.series[0].data.push({value: item?.[`${variablePieChart.key}`] ?? 0, name: item?.id})
            })
            eChartsRef.current?.getEchartsInstance().setOption(optionPie);
            setTimeout(() => {
                eChartsRef.current?.getEchartsInstance().resize();
            }, 500);
        }
    }, [chartData])
    return (
        <Box
            h={'88vh'}
            // borderRadius={'lg'}
            p={4}
            // bg={useColorModeValue('white', 'gray.800')}
            backdropFilter="auto" backdropBlur="4px"
            className={'gradient-border'}
            boxShadow={'sm'}
            // borderWidth={1}
            borderColor={useColorModeValue('gray.200', 'gray.700')}
        >
            <ReactECharts
                option={optionPie}
                ref={eChartsRef}
                style={{minHeight: "80vh", width: "100%"}}
                notMerge={true}
                lazyUpdate={true}
                // className='echarts-for-echarts'
                theme={useColorModeValue("", "mydark")}
            />
        </Box>
    )
}
export default BoxPieChart