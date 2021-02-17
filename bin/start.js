const app = require('../app');
const setup = require('../config/conn');



(async () => {
    await setup();
})();

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log('Listening on port: ' + PORT);
});