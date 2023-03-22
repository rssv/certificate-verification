const fetch = require('fetch');

fetch("http://localhost:4000/studens", {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
      'authorization': `Bearer `
    },
}).then(response=>response.json())
.then(data=>console.log(data));
