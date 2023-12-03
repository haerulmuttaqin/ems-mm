import Layout from "@Layout";
import React, {useEffect, useState} from "react";
import {meterGroupService} from "@Services/meterGroupService";
import {Box, Center, Progress, SimpleGrid, Spinner, useColorModeValue} from '@chakra-ui/react'
import {useRecoilState} from "recoil";
import {groupPositionState, meterPositionState} from "@State";
import {useRouter} from "next/router";
import {timeout} from "../../../app/utils/utils";
import BoxMeters from "../../components/box-meters";
import BoxPieChart from "../../components/box-piechart";
import BoxMeterItem from "../../components/box-meter-item";
import appConfig from "app-config/app-config.json"

const intervalSize = appConfig?.pageTimeout + 1000

export default function Dashboard() {
    const router = useRouter()
    let [position, setPosition] = useRecoilState(groupPositionState) as any
    let [meterPosition, setMeterPosition] = useRecoilState(meterPositionState) as any
    const [meterGroup, setMeterGroup] = useState() as any
    const [meters, setMeters] = useState() as any
    const [meterItem, setMeterItem] = useState() as any
    const [headerData, setHeaderData] = useState({
        title: <Spinner size='sm'/>,
        desc: "Loading..."
    }) as any
    const [componentGroup, setComponentGroup] = useState(meterGroup) as any
    const [componentMeters, setComponentMeters] = useState(meters) as any
    const [componentMeterItem, setComponentMeterItem] = useState(meterItem) as any

    useEffect(() => {
        meterGroupService.fetchMeterGroup().then(res => {
                setMeterGroup(meterGroupService?.meterGroupValue)
            }
        )
        setupIntervalGroup(position)
    }, [])

    const setupIntervalGroup = (position) => {
        const meterGroup = meterGroupService?.meterGroupValue?.[position - 1]
        meterGroupService.fetchMeterByGroup(meterGroup?.metergroupid).then(async res => {
            setMeters(res)
            setComponentGroup(
                <BoxPieChart data={{data: res, group: meterGroup}}></BoxPieChart>
            )
            setComponentMeters(
                <BoxMeters data={{data: res, group: meterGroup}}></BoxMeters>
            )
            setHeaderData({
                title: meterGroup?.metergroupname,
                desc: `Meter Group ID ${meterGroup?.metergroupid}`
            })

            setPosition(position++)

            await timeout(intervalSize / 2);

            setComponentMeterItem(null)
            setComponentGroup(null)
            setComponentMeterItem(
                <BoxMeterItem data={{data: res, group: meterGroup}} setHeaderData={setHeaderData}></BoxMeterItem>
            )

            await timeout(intervalSize * res?.data?.length);

            if (position > meterGroupService?.meterGroupValue.length) {
                await setupIntervalGroup(1)
                // await router.push('/')
            } else {
                await setupIntervalGroup(position)
            }
        })
    }
    return (
        <Layout data={headerData}>
            <Box px={4}>
                {
                    componentGroup || componentMeterItem ? null
                        :
                        <Center h={'80vh'}>
                            <Box w={230} m='auto'>
                                <Progress colorScheme={useColorModeValue('main', 'gray')} size='xs'
                                          bg={useColorModeValue('gray.300', 'gray.600')}
                                          isIndeterminate
                                          borderRadius={10}/>
                            </Box>
                        </Center>
                }
                {
                    componentGroup ?

                        <SimpleGrid columns={{md: 2, base: 1}} spacing={4}>
                            {
                                componentGroup
                            }
                            {
                                componentMeters
                            }
                        </SimpleGrid>
                        :
                        componentMeterItem
                }
            </Box>
        </Layout>
    )
}

