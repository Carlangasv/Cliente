let url = "http://127.0.0.1:8000/api/v1/"

if(process.env.NODE_ENV=="production"){
    url = process.env.NODE_URL
}else{
    url = "http://127.0.0.1:8000/api/v1/"
}

const config = {
    url_api: url
}

module.exports = config;