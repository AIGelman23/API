const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;

app.use(cors()); // allowing to test locally and for security features
app.use(bodyParser.json()); // allows to access the request body -- need application/json Content Type within Post Man

require('dotenv').config();
const key = process.env['API_KEY'];

app.post('/api/test', (req, res) => {
	console.log(req.body);
	/*
  const req_key = req.headers["x-api-key"];
  if (req_key !== key) {
    res.statusCode = 401;
    res.send("Unauthorized");
    return;
  }
  */
	data = {
		test: 'ok'
	};
	res.statusCode = 200;
	res.set({
		'Access-Control-Allow-Headers': 'Content-Type',
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
	});
	setTimeout(() => res.send(JSON.stringify(data)), 2000);
	return;
});

app.get('/api/profile', (req, res) => {
	res.statusCode = 200;
	const data = {
		firstName: 'Jane',
		lastName: 'Doe',
		city: 'Pittsburgh',
		state: 'PA',
		phone: [ '41225511212', '4122551111' ],
		dob: '2000-01-01',
		avatarUri: 'https://gruuvly.com/images/123.png',
		about: 'Jane is a cool person who likes do cool things',
		work: 'Gruuvly',
		education: 'MIT'
	};
	res.send(JSON.stringify(data));
	return;
});

// get all posts for a given user_id
// GET http://localhost:5000/api/posts?id=123
app.get('/api/posts', (req, res) => {
	//console.log(req);
	const userId = req.query['id'];
	let posts = [];
	const user123Posts = [
		{
			id: 1,
			title: 'Post 1 Title',
			comments: [
				{
					id: 1,
					comment: 'Nice post!'
				},
				{
					id: 2,
					comment: 'You suck!!'
				}
			]
		},
		{
			id: 2,
			title: 'Post 1 Title',
			comments: []
		}
	];
	const user124Posts = [
		{
			id: 42,
			title: 'Post 42 Title',
			comments: [
				{
					id: 1,
					comment: 'Nice post!'
				},
				{
					id: 2,
					comment: 'You suck!!'
				}
			]
		},
		{
			id: 45,
			title: 'Post 45 Title',
			comments: []
		}
	];
	if ('123' === userId) {
		posts = user123Posts;
	} else if ('124' == userId) {
		posts = user124Posts;
	} else {
		res.statusCode = 500;
		res.send(
			JSON.stringify({
				error: `userId: ${userId} not found`
			})
		);
		return;
	}
	const data = { posts };
	res.statusCode = 200;
	res.send(JSON.stringify(data));
	return;
});

// get a single post by post_id
// GET http://localhost:5000/api/post?post_id=42
app.get('/api/post', (req, res) => {
	const postId = req.query['post_id'];
	let post = {};
	const post2 = {
		id: 2,
		title: 'Post 1 Title',
		comments: []
	};
	const post42 = {
		id: 42,
		title: 'Post 42 Title',
		comments: [
			{
				id: 1,
				comment: 'Nice post!'
			},
			{
				id: 2,
				comment: 'You suck!!'
			}
		]
	};
	if ('2' === postId) {
		post = post2;
	} else if ('42' == postId) {
		post = post42;
	} else {
		res.statusCode = 400;
		res.send(
			JSON.stringify({
				error: `postId: ${postId} not found`
			})
		);
		return;
	}
	const data = { post };
	res.statusCode = 200;
	res.send(JSON.stringify(data));
	return;
});

/*
Pictures,
Videos,
Likes, 
Dislikes, 
Shares (part of Activity), 
Friends (Contacts), 
Replies,
Requests, 
Mentions (Tagging), 
Location Tracking, 
*/

app.listen(port, () => {
	console.log(`API listening at http://localhost:${port}`);
});
