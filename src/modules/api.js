import fetch from 'unfetch'
import formatParams from './format-params'

const REST_API_DEBUG =  true  
const API_ENDPOINT = "http://localhost:3000"

function handleError(response) {
  if (!response.statusText || (response.status >= 200 && response.status < 300) ) {
    return response
  } else {
    if (response && response.status == 401) { 
      if (!location.href.match("/login$")) location.href = `/login`;
    }
    else {
      const errorMsg = (response.parsed && typeof(response.parsed) == 'object' && response.parsed.Message) ? response.parsed.Message : response.statusText
      console.log("error message", errorMsg)
      var error = new Error(errorMsg)      
      throw error
    }
  }
}

function parseJSON(response) {
  console.log('response', response)

  try {
    return response.text()
      .then((data) => {

          if (response.status >= 200 && response.status < 300) {
            return data ? JSON.parse(data) : {}
          } else {
            response.parsed = {error: response.status }
            return response
          }

      })
  } catch(err) {
    return response
  }


}

const browserDoesCache = () => {
  return typeof(sessionStorage) !== 'undefined' && !navigator.userAgent.match('Trident')
}
export default (method, action, data, cacheConfig) => {
  if (typeof(XMLHttpRequest) == 'undefined') {
    return (new Promise((resolve) => { resolve({}) }))
  } else {
    
    var headers = {
      'Accept': 'application/json',
    };
    const token = sessionStorage.getItem("access_token")
    if (token) headers['Authorization'] = `Bearer ${token}`
    console.log('token found', headers)
      
    var body = {}

    // setup multipart upload POST data if we have a file
    if (typeof(data) != 'undefined' && data.file0 && method == 'POST') {
      body = new FormData();
      Object.keys(data).forEach((key) => {
        if (data[key] && !Array.isArray(data[key])) body.append(key, data[key])
        else body.append(key, JSON.stringify(data[key]))
      })
      console.log('FormData', body);

    } else {  // normal url encoded POST
      headers[ 'Content-Type' ]= 'application/x-www-form-urlencoded; charset=UTF-8'
      if (data && method == 'POST') body = formatParams(data);
      if (data && method == 'GET') action += `?${formatParams(data)}`;
    }


    if (REST_API_DEBUG) {
      console.log(formatParams(data), headers);
    }

    const requestUrl = `${API_ENDPOINT}${action}`;
    const requestBody = (method != 'GET' && data && Object.keys(data).length ? body : null)
    const requestSignature = btoa(requestUrl + requestBody)
    var responseData;

    const cacheEnabled = () => {
      return browserDoesCache() && (method == "GET" ) && cacheConfig !== false
    }

    // check cache first for GET requests
    if (cacheEnabled()) {
      if (sessionStorage.getItem(requestSignature)) {

        //console.log(`${method} ${action} found in cache.`, )
        const data = sessionStorage.getItem(requestSignature);

        responseData = new Promise((resolve, reject) => {
          const parsedData = JSON.parse(data).cachedResponse
          console.log(`${method} ${action} found in cache.`, parsedData)

          resolve(parsedData)
        });

      }
    }

    if (!responseData) {
      var requestOptions = {
          headers: headers,
          method: method,
          credentials: 'include'
      }
      if (requestBody) requestOptions.body = requestBody

      responseData = fetch(requestUrl, requestOptions)
      .then(parseJSON)
      .then(handleError)
      .then((data) => {
        if (REST_API_DEBUG)
          console.log(action, data)
          if (cacheEnabled() && data) sessionStorage.setItem(requestSignature, JSON.stringify({accessed: new Date(), cachedResponse: data}));

        return data
      })
      /*
      .catch((error) => {
       console.log('request failed for ' + action, error)

      })
      */
    }

    return responseData

  }
}