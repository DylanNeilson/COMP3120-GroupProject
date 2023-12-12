// Desc: fetches data from the IGDB api
const fetch = require("node-fetch"); //neede for Justin's fetch to work
const express = require('express');
const app = express();
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
app.use(express.json())
app.use(express.static("build"));
const fs = require('fs');
const bodyParser = require('body-parser');
const e = require("express");
var local_token = null;
const client_id = '54t9pk2wbcg6mwmc7cbu3fqxuh6pw8';
const secret_id = 'p2ygbyvys66b7vii7zna4oqof8x5iu';
const auth_link = 'https://id.twitch.tv/oauth2/token';
const token_gen = auth_link + '?client_id=' + client_id + '&client_secret=' + secret_id + '&grant_type=client_credentials';

app.use((req, res, next) => { //change this so CORS only works for our website
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

let users = [ //using this user from workshop for testing, password should just be bob
    {
        "id": 1,
        "username": "bobalooba",
        "name": "Bob Bobalooba",
        "password": "$2b$10$hWje2GoSXlXT1MA4pssDtO/6EYCzZlZyiUje6br/7w0lRppbFlmxK",
        "summary": "I like chicken nuggets",
        "gamelists": [
            {
                "id": 740,
                "status": "Planned",
                "cover": 128403
            },
            {
                "id": 1942,
                "status": "Dropped",
                "cover": 89386
            }
        ]
    }
]

const getUser = (username) => {
    return users.filter(u => u.username === username)[0]
}

app.post('/login', async (request, response) => {
    const { username, password } = request.body
    const user = getUser(username)
    if (!user) {
        console.log("incorrect user")
        return response.status(401).json({ error: "invalid username or password" })
    }
    if (await bcrypt.compare(password, user.password)) {
        console.log("Password is correct")

        const tokenuser = {
            id: user.id,
            username: user.username
        }

        const token = jwt.sign(tokenuser, "secret")

        return response.status(200).json({ token, id: user.id, username: user.username, name: user.name, gamelists: user.gamelists, summary: user.summary })
    } else
        console.log("incorrect password")
    return response.status(200).json({ message: "It wrong" })
})

app.post('/sign_up', async (request, response) => { // need to rewrite to check for duplicate user plus bad characters
    const { username, password, firstname, lastname } = request.body
    var flag = 0;
    console.log(username)
    console.log(password)
    let specialChars = /[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/;
    if (specialChars.test(username)) {
        return response.status(401).json({ error: "invalid characters in username" });
    } else {
        const user = getUser(username)
        if (user) {
            console.log("user already exists")
            return response.status(401).json({ error: "user already exists" })
        } else {
            const salt = await bcrypt.genSalt(4);
            //   const securepassword = await bcrypt.hash(password, salt, (err,hash) => {
            //         if (err) {
            //           console.error(err)
            //           flag = 1
            //           return
            //         }
            //         console.log('in hashing?')
            //         console.log(hash)
            //         encryptedpassword = hash
            //       })
            const securepassword = await bcrypt.hash(password, salt)
            if (flag == 0) {
                console.log('after hashing in if')
                console.log(securepassword)
                
                const newuser = {
                    id: Math.floor(Math.random()*10000), //until we figure out how to correctly hand out ids
                    username: username,
                    password: securepassword,
                    name: firstname + ' ' + lastname,
                    summary: '',
                    gamelists:[]
                }
                console.log("first test for password", newuser.username, newuser.password) //fixed password but now name not saving
                users.push(newuser)
                const tokenuser = {
                    id: newuser.id,
                    username: newuser.username
                }
                const token = jwt.sign(tokenuser, "secret")
                return response.status(200).json({ token, username: newuser.username, name: newuser.name, id: newuser.id }) //come back to
            } else
                return response.status(200).json({ message: "Unable to create new user" })
        }
    }
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', async (request, response) => {
    var page = await get_n_random_games(10);
    response.send(page);
})

app.get('/recent', async (request, response) => {
    var page = await get_recent_games_half_year();
    response.send(page);
})

app.get('/search/:id', async (request, response) => {
    const term = request.params.id
    let page = await search_game_by_name(term);
    console.log(page);
    console.log("search page");
    response.send(page);
})

app.get('/search', async (request, response) => {
    const name = request.query.name || '';
    const genres = Array.isArray(request.query.genre) ? request.query.genre : [request.query.genre];
    const platforms = Array.isArray(request.query.platform) ? request.query.platform : [request.query.platform];
    console.log(name);
    console.log(genres);
    console.log(platforms);
    let page = await advanced_search_game_by_name(name, genres, platforms);

    console.log(page);
    console.log("search page");

    response.send(page);
});

app.get('/user', (request, response) => {
    response.send(users)
})

app.post('/user/:id/summary', async (request, response) => {
    var new_summary = request.body.summary
    console.log("this is the request body")
    console.log(request)
    var responduser;
    for (let i = 0; i < users.length; i++) {
        if (request.params.id == users[i].id) {
            users[i].summary = new_summary
            responduser = users[i]
        }
    }
    console.log(responduser)
    response.send(responduser)
})


app.get('/user/:id', (request, response) => {
    var responduser;
    for (let i = 0; i < users.length; i++) {
        if (request.params.id == users[i].id) {
            responduser = users[i]
        }
    }
    console.log(responduser)
    response.send(responduser)
})
app.get('/gameinfo/:id', async (request, response) => {
    console.log("entered the thing")
    var seachids = request.params.id
    console.log(request.params.id)
    var seachids = request.params.id.replace(/\&/g, ",")
    console.log(seachids)
    let page = await get_game_by_id(seachids);
    console.log(page)
    response.send(page)
})

app.post('/user/:id/gamelist', async (request, response) => {
    var data = request.body
    // console.log(data)
    var user_position;
    var user_valid = 0;
    var game_found_flag = 0;
    var game_change
    console.log("entered adding game list thing")

    for (let i = 0; i < users.length; i++) {
        if (data.username == users[i].username) {
            user_position = i;
            user_valid = 1;
        }
    }
    if (user_valid == 0) {
        return response.status(401).json({ error: "user is invalid" })
    } else {
        for (let i = 0; i < users[user_position].gamelists.length; i++) {
            console.log("within loop")
            console.log(data.game_id)
            if (data.game_id == users[user_position].gamelists[i].id) {
                console.log("status before change" + users[user_position].gamelists[i].status)
                users[user_position].gamelists[i].status = data.status
                console.log("status after change" + users[user_position].gamelists[i].status)
                game_found_flag = 1;
            }
        }
        if (game_found_flag == 0) {
            const newgame = {
                id: data.game_id, //until we figure out how to correctly hand out ids
                status: data.status,
                cover: data.cover
            }
            users[user_position].gamelists.push(newgame)
        }

        console.log(data)
        return response.status(200).json({id: users[user_position].id, username: users[user_position].username, name: users[user_position].name, gamelists: users[user_position].gamelists, summary: users[user_position].summary })
    }
})

app.get('/cover/:id', async (request, response) => {
    let page = await get_cover_by_id(request.params.id);
    response.send(page)
})

var genres = [];
app.get('/genre-cache/', async (request, response) => {
    console.log("genre cache page");
    if (genres.length === 0) {
        genres = await get_genres();
    }
    response.send(genres.json());
})

var platforms = [];
app.get('/platform-cache/', async (request, response) => {
    console.log("platform cache page");
    if (platforms.length === 0) {
        platforms = await get_platforms();
    }
    response.send(platforms.json());
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

const get_token = async () => {
    const response = await fetch(token_gen, { method: 'POST' });
    const token = await response.json();
    return token;
};

async function validate_token() {
    if (local_token === null) {
        local_token = await get_token();
    }
    return local_token
}

// make an api call to the specified target IGDB api
const api_link = 'https://api.igdb.com/v4/';
const api_targets = ['games', 'covers', 'platforms', 'genres'];
const api_call = async (target, endpoints) => {
    var token_json = await validate_token();
    if (!api_targets.includes(target)) {
        console.log('invalid target');
        return;
    }
    const token = token_json.access_token;
    const headers = {
        'Client-ID': client_id,
        'Authorization': `Bearer ${token}`
    };
    const options = {
        method: 'POST',
        headers: headers,
        body: endpoints
    };
    const response = await fetch(api_link + target, options);
    const gamereturnlist = await response.json()
    console.log(gamereturnlist);
    return gamereturnlist;
};

// makes an api call to the games target
const game_call = async (endpoints) => {
    return await api_call('games', endpoints);
};

// makes an api call to the covers target
const cover_call = async (endpoints) => {
    return await api_call('covers', endpoints);
}

// make an api call to the platforms target
const platform_call = async (endpoints) => {
    return await api_call('platforms', endpoints);
}

// make an api call to the genres target
const genre_call = async (endpoints) => {
    return await api_call('genres', endpoints);
}

// create a string of endpoints to be used in the api call
function create_endpoints(fields, terms, limit = 10, offset = 0) {
    var endpoints = 'fields ' + fields + '; ' + terms + '; limit ' + limit + ';' + ' offset ' + offset + ';';
    return endpoints;
}

// default field lists
const all_fields = [];
const simple_fields = ['id', 'name'];
const display_fields = ['id', 'name', 'cover', 'version_title'];
const more_fields = ['id', 'name', 'cover', 'genres.name', 'platforms.name', 'summary'];
const cover_fields = ['id', 'url']
const platform_fields = ['checksum', 'abbreviation', 'name'];
const genre_fields = ['checksum', 'name'];

// create a string of fields to be used in the endpoints
function create_fields(field_list) {
    var fields_concat = '';
    if (field_list.length === 0) {
        return '*';
    }
    for (var i = 0; i < field_list.length; i++) {
        fields_concat += field_list[i];
        if (i != field_list.length - 1) {
            fields_concat += ', ';
        }
    }
    return fields_concat;
}

const valid_operators = ['where', 'search'];

// create a string of terms to be used in the endpoints
function create_terms(term_op, term_conds) {
    if (!valid_operators.includes(term_op)) {
        console.log('invalid operator');
        return;
    }
    var terms_concat = term_op + ' ' + term_conds;
    return terms_concat;
}

// put string in quotes
function quote_wrap(string) {
    return '"' + string + '"';
}

// put string in parentheses
function paren_wrap(string) {
    return '(' + string + ')';
}

// get a list of id and name for every game
function get_all_games() {
    var fields = create_fields(simple_fields);
    var terms = create_terms('where', 'id > 0');
    var endpoints = create_endpoints(fields, terms);
    return game_call(endpoints);
}

// get games by genre
function get_games_by_genre(genre) {
    var fields = create_fields(display_fields);
    var terms = create_terms('where', 'genres = ' + genre);
    var endpoints = create_endpoints(fields, terms);
    return game_call(endpoints);
}

// get games by id
function get_game_by_id(id) {
    var fields = create_fields(more_fields);
    var terms = create_terms('where', 'id = ' + paren_wrap(id));
    var endpoints = create_endpoints(fields, terms);
    return game_call(endpoints);
}

// get cover by id
function get_cover_by_id(id) {
    var fields = create_fields(cover_fields);
    var terms = create_terms('where', 'id = ' + paren_wrap(id));
    var endpoints = create_endpoints(fields, terms);
    return cover_call(endpoints);
}

// get cover by id and enlarge it
function get_big_cover_by_id(id) {
    console.log("big called")
    var thumbnail = get_cover_by_id(id);
    var thumb_url = thumbnail[0].url;
    big_url = thumb_url.replace('t_thumb', 't_cover_big');
    var big_cover = {
        id: id,
        url: big_url
    };
    console.log(big_cover)
    return big_cover;
}

// get a game by name
function get_game_by_name(name) {
    var fields = create_fields(more_fields);
    var terms = create_terms('where', 'name = ' + quote_wrap(name));
    var endpoints = create_endpoints(fields, terms);
    return game_call(endpoints);
}

// get a game with all fields
function get_game_by_id_full(id) {
    var fields = create_fields(more_fields);
    var terms = create_terms('where', 'id = ' + paren_wrap(id));
    var endpoints = create_endpoints(fields, terms);
    return game_call(endpoints);
}

// get a list of names and ids of games containing a given string in their name 
// with optional filters for platform and genre
async function advanced_search_game_by_name(name, platform, genre) {
    var fields = create_fields(display_fields);
    var terms = create_terms('search', quote_wrap(name));
    if (platform != null) {
        var platform_id = await get_platform_id(platform);
        terms += ' & platforms = ' + paren_wrap(platform_id);
    }
    if (genre != null) {
        var genre_id = await get_genre_id(genre);
        terms += ' & genres = ' + paren_wrap(genre_id);
    }
    var endpoints = create_endpoints(fields, terms);
    return await game_call(endpoints);
}

// get a list of names and ids of games containing a given string in their name
function search_game_by_name(name) {
    return advanced_search_game_by_name(name, null, null);
}

const seconds_in_day = 86400;
const seconds_in_week = seconds_in_day * 7;
const seconds_in_month = seconds_in_day * 30;
const seconds_in_year = seconds_in_day * 365;

// get the current epoch time from unix time and subtract the given time from it
async function set_age(time_since) {
    var current_time = Date.now();
    return current_time - time_since;
}

// get a list of names, ids and images of games released in the specified time range
async function get_recent_games(time) {
    var age = await set_age(time);
    var fields = create_fields(display_fields);
    var terms = create_terms('where', 'first_release_date > ' + age + ' & cover > 0');
    var endpoints = create_endpoints(fields, terms);
    return await game_call(endpoints);
}

// get a list of names, ids and images of games released in the last year
function get_recent_games_year() {
    return get_recent_games(seconds_in_year);
}

// get a list of names, ids and images of games released in the last six months
function get_recent_games_half_year() {
    return get_recent_games(seconds_in_year / 2);
}

// get a list of names, ids and images of games released in the last number of specified days
function get_recent_games_days(days) {
    return get_recent_games(seconds_in_day * days);
}

// get a list of names, ids and images of games released in the last number of specified weeks
function get_recent_games_weeks(weeks) {
    return get_recent_games(seconds_in_week * weeks);
}

// get a list of names, ids and images of ten games at random
async function get_n_random_games(n) {
    var fields = create_fields(display_fields);
    const ids = [];
    for (var i = 0; i < n * 2; i++) {
        ids.push(Math.floor(Math.random() * 200000));
    }
    var terms = create_terms('where', 'id = ' + paren_wrap(ids) + ' & cover > 0');
    var endpoints = create_endpoints(fields, terms, limit = n);
    return await game_call(endpoints);; //changed it to this cause even though game_call does this, it doesnt seem to like doing multiple return values, however could be because game_call is not a async
}

// get a list of genre names and ids
async function get_genres() {
    var fields = create_fields(genre_fields);
    var terms = create_terms('where', 'checksum > 0');
    var endpoints = create_endpoints(fields, terms);
    return await genre_call(endpoints);
}

// get a genre id by the name as a string
async function get_genre_id(genre_name) {
    for (var i = 0; i < genres.length; i++) {
        if (genres[i].name === genre_name) {
            return genres[i].checksum;
        }
    }
}

// get a list of games filtered by genre
async function get_games_by_genre(genre_name) {
    var fields = create_fields(display_fields);
    var genre_id = await get_genre_id(genre_name);
    var terms = create_terms('where', 'genres = ' + paren_wrap(genre_id));
    var endpoints = create_endpoints(fields, terms);
    return await game_call(endpoints);
}

// get a list of platform names and ids
async function get_platforms() {
    var fields = create_fields(platform_fields);
    var terms = create_terms('where', 'checksum > 0');
    var endpoints = create_endpoints(fields, terms);
    return await platform_call(endpoints);
}

// get a platform id by the name as a string
async function get_platform_id(platform_name) {
    for (var i = 0; i < platforms.length; i++) {
        if (platforms[i].name === platform_name) {
            return platforms[i].checksum;
        }
    }
}

// get a list of games filtered by platform
async function get_games_by_platform(platform_name) {
    var fields = create_fields(display_fields);
    var platform_id = await get_platform_id(platform_name);
    var terms = create_terms('where', 'platforms = ' + paren_wrap(platform_id));
    var endpoints = create_endpoints(fields, terms);
    return await game_call(endpoints);
}

// var all_fields_game = get_game_by_id_full(1942);
// console.log(all_fields_game);

// var named_game = get_game_by_id([1942, 740]);
// console.log(named_game);

// var searched_games = search_game_by_name('halo');
// console.log("searched_games = " + searched_games);

// var gotten_game = get_game_by_name('The Witcher 3: Wild Hunt');
// console.log("gotten_game = " + gotten_game);

// var tenrandom = get_n_random_games(10);
// console.log("tenrandom = " + tenrandom);