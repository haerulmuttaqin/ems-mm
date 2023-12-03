String.isNullOrEmpty = function (value) {
    return !(typeof value === "string" && value.length > 0);
}

export const getFieldVale = (item) => {
    return item !== null || item !== null ? `${item.refName}` : '—'
}

const formatRupiah = (money) => {
    return new Intl.NumberFormat('id-ID',
        {style: 'currency', currency: 'IDR', minimumFractionDigits: 0}
    ).format(money);
}

export const rupiahFormat = (data) => {
    return data !== null && data !== '' && data !== 0.00 ? `${formatRupiah(data)}` : '—'
}

export const padDigits = (val) => {
    return numberWithCommas(val);
}

function numberWithCommas(x) {
    if (x != null) {
        return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") || ''
    }
    return x
}

export function getBrowserFullscreenElementProp() {
    if (typeof document.fullscreenElement !== "undefined") {
        return "fullscreenElement"
    } else if (typeof document.mozFullScreenElement !== "undefined") {
        return "mozFullScreenElement"
    } else if (typeof document.msFullscreenElement !== "undefined") {
        return "msFullscreenElement"
    } else if (typeof document.webkitFullscreenElement !== "undefined") {
        return "webkitFullscreenElement"
    } else {
        throw new Error("fullscreenElement is not supported by this browser")
    }
}

export function timeout(delay) {
    return new Promise(res => setTimeout(res, delay));
}