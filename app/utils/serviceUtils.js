import {refService} from '@Services/refService'

Array.prototype.orderBy = function (selector, desc = false) {
    return [...this].sort((a, b) => {
        a = selector(a);
        b = selector(b);

        if (a == b) return 0;
        return (desc ? a > b : a < b) ? -1 : 1;
    });
};

function order(a, b) {
    return a > b ? -1 : (a < b ? 1 : 0);
}

export const initHeader = (type, callback) => {
    const data = localStorage.getItem(type)
    if (data === "null" || data == null) {
        refService.getRefGenericByTypeCode(type).then(ref => {
            const options = []
            ref.data.map(item => {
                options.push({
                    Header: item.refName,
                    accessor: item.refValueStr1,
                    width: Number(item.refValueInt1),
                    sortOrder: Number(item.refValueInt2),
                    type: item.refValueStr2,
                })
            })
            callback(options.sort(function (a, b) { return parseInt(a.sortOrder) - parseInt(b.sortOrder) }));
        })
    }
}

export const initRef = (type, callback) => {
    const data = localStorage.getItem(type)
    if (data == null || data === "null") {
        refService.getRefGenericByTypeCode(type).then(ref => {
            const options = []
            ref.data.map(item => {
                options.push(item)
            })
            callback(options.sort(function (a, b) { return parseInt(a.sortOrder) - parseInt(b.sortOrder) }));
        })
    }
}

export const initOptions = (type, callback) => {
    refService.getRefGenericByTypeCode(type).then(ref => {
        const options = []
        ref.data.map(item => {
            options.push({
                value: item.refSid,
                label: item.refName
            })
        })
        callback(options)
    })
}

export const initOptionsFilter = (type, callback) => {
    refService.getRefGenericByTypeCode(type).then(ref => {
        const options = []
        ref.data.map(item => {
            options.push({
                value: item.refSid,
                label: item.refName
            })
        })
        callback(options)
    })
}

export const initOptionsDyn = (type, callback, params) => {
    refService.getRefGenericByTypeCode(type).then(ref => {
        const options = []
        ref.data.map(item => {
            options.push({
                value: item.refSid,
                label: item.refName
            })
        })
        callback([...params, { type: options }])
    })
}