

class T {
  static getTransactionList (ctx) {
    ctx.body = {
      err: 0,
      msg: 'success',
      data: {
        total: 3,
        items: [
          {
            order_no: '1',
            timestamp: Date.now(),
            username: 'admin',
            price: '99',
            status: 'success'
          },
          {
            order_no: '1',
            timestamp: Date.now(),
            username: 'admin',
            price: '99',
            status: 'success'
          },
          {
            order_no: '1',
            timestamp: Date.now(),
            username: 'admin',
            price: '99',
            status: 'success'
          }
        ]
      }
    }
  }
}

module.exports = T