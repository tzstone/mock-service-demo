module.exports = {
  '/api/admin': {
    method: 'GET',
    mock: false,
    data: {
      'list|1-10': [{
        'id|+1': 1
      }]
    }
  }
}