// npm i nodemon -g
// nodemon
// npm init
// npm i date-fns
// npm install
// npm i nodemon --save--dev || npm i node -D
// npm run dev
// npm run start
// npm i uuid
// npm i uuid@version
// npm update
// npm rm nodemon -g

// console.log('testing!');

const { format } = require('date-fns');
const { v4: uuid } = require('uuid');

console.log(format(new Date(), 'yyyyMMdd\tHH:mm:ss'));

console.log(uuid());

console.log()