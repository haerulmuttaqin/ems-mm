function asciiToString(s) {
    let i = s.length % 3;
    let parts = i ? [s.substr(0, i)] : [];
    for (; i < s.length; i += 3) {
        parts.push(s.substr(i, 3).substring(1));
    }
    return parts;
}

module.exports = asciiToString