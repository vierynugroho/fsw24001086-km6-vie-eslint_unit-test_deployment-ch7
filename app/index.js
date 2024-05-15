const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const swaggerUI = require('swagger-ui-express');
const router = require('./router');
const swaggerDocument = require('../docs/swagger.json');
const { MORGAN_FORMAT } = require('../config/application');
const app = express();

require('dotenv/config');

app.use(morgan(MORGAN_FORMAT));
app.use(cors());
app.use(express.json());
app.get('/documentation.json', (req, res) => res.send(swaggerDocument));
app.use(
	'/documentation',
	swaggerUI.serve,
	swaggerUI.setup(swaggerDocument, {
		customCssUrl: 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
		customJs: ['https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.js', 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.js'],
	})
);

module.exports = router.apply(app);
