const handleProdutStock = (stockValue, type) => {
    let stocks = 0
    stockValue?.forEach(stock => {
        if (stock['typeTransValue']?.refValueInt1 == type) {
            stocks += stock['qty']
        }
    });
    return stocks
}

const handleProdutStockGroup = (stockValue, type) => {
    let stocks = 0
    stockValue?.forEach(stockParent => {
        console.log(stockParent)
        stockParent?.forEach(stock => {
            if (stock['typeTransValue']?.refValueInt1 == type) {
                stocks += stock['qty']
            }
        });
    })
    return stocks
}

module.exports = {
    handleProdutStock, handleProdutStockGroup
}