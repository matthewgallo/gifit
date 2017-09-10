import bodyParser from 'body-parser';
import compression from 'compression';
import express from 'express';
import fs from 'fs';
import multer from 'multer';
import path from 'path';
import session from 'express-session';
import morgan from 'morgan';
import request from 'request';

const port = process.env.PORT || 8080;
const app = express();

app.enable('trust proxy');
app.use(compression());
app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());

let keys;
if (fs.existsSync('./keys.json')) {
  keys = require('./keys.json');
} else {
  keys = JSON.parse(process.env.VCAP_SERVICES)['user-provided'][0].credentials;
}

app.use(morgan('dev'));

app.use((req, res, next) => {
  if (req.secure || req.headers.host === `localhost:${port}`) {
    next();
  } else {
    res.redirect(`https://${req.headers.host}${req.url}`);
  }
});


app.get('/gifs/search/:query', (req, res) => {
	console.log(req.params.query);
  request(
    {
      url: `https://api.giphy.com/v1/gifs/search?q=${req.params.query}&api_key=${keys.giphy}`,
      headers: {
        'user-agent': 'node.js',
      },
      json: true,
    },
    (err, response, body) => {
      if (!err && response.statusCode === 200) {
        res.send({
					success: true,
          body,
        });
      } else {
        res.send({
          success: false,
        });
      }
    }
  );
});

app.get('/gifs/trending', (req, res) => {
	request(
		{
			url: `https://api.giphy.com/v1/gifs/trending?api_key=${keys.giphy}`,
      headers: {
        'user-agent': 'node.js',
      },
      json: true,
		},
		(err, response, body) => {
			if (!err && response.statusCode === 200) {
				res.send({
					success: true,
					body,
				});
			} else {
				res.send({
					success: false,
				});
			}
		}
	);
});

app.get('/gifs/random', (req, res) => {
	request(
		{
			url: `https://api.giphy.com/v1/gifs/random?api_key=${keys.giphy}`,
			headers: {
				'user-agent': 'node.js',
			},
			json: true,
		},
		(err, response, body) => {
			if (!err && response.statusCode === 200) {
				res.send({
					success: true,
					body,
				});
			} else {
				res.send({
					success: false,
				});
			}
		}
	);
});


app.use(express.static('./build'));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

app.listen(port, error => {
  if (error) {
    return;
  }
  console.log(`Server is live at http://localhost:${port}`);
});
