module.exports = {
  '/api/admin': {
    method: 'GET',
    mock: true,
    data: {
      'list|1-10': [{
        'id|+1': 1
      }]
    }
  }
}