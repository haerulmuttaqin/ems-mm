module.exports = defaultCodeFormatter = (data) => {
    let str = String(data);
    while (str.length < 4) str = "0" + str;
    return 'PJA' + str;
}