const NodeCache = require("node-cache");

const myCache = new NodeCache()

const setValue = (key, val) => {
    myCache.set(key, val)
}

const getValue = (key) => {
    let value = myCache.get(key)
    if (value == undefined) {
        return null
    } else {
        return value
    }
}


module.exports = {
    setValue,
    getValue
}