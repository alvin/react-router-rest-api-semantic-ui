# React Router, REST API, Semantic UI
### w/ PUG/JADE and sessionStorage fetch() wrapping api cache

## architecture

- Webpack & React Router
- Semantic UI v2.4 (hybrid of semantic-ui-react components and direct html/classes for non-js elements)
- direct REST api with using fetch() and localStorage caching (modules/api.js)
- Bonus Points: pug preprocessing for better render() lovin'

## dev setup

Modify the API_URL in package.json or pass in an ENV var each time running the "start" script.  To avoid CORS requirements, we run a reverse proxy within webpack devServer which you may need to configure if your API endpoints are not /api/* and/or /o/* 

`npm install`

`npm run start`


### modules/api.js

Stores GET requests in localStorage cache by default.  Pass a false boolean (not string) as an optional 4th param to disable caching for a particular request.  This could be improved with expiry logic.

```
cacheConfig = true | false

const data = await api('GET', '/api/something', { some: "data" }, cacheConfig)

```

### custom semantic ui 

To make changes to the theme
`cd semantic && gulp`

## Credits

Based on https://github.com/Kornil/simple-react-app with some things removed, others added.