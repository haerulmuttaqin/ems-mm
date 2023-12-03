const { atom, selector } = require('recoil')
import appConfig from "app-config/app-config.json"

export const titleState = atom({
    key: 'title',
    default: '⚡ ' + appConfig?.short_name
})
export const userState = atom({
    key: 'user',
    default: {}
})

export const groupPositionState = atom({
    key: 'groupPositionState',
    default: 1
})

export const meterPositionState = atom({
    key: 'meterPositionState',
    default: 1
})

export const meterLiveDataState = atom({
    key: 'meterLiveDataState',
    default: {}
})
