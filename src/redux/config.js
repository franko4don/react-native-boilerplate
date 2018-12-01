
const platform = 'local';

let settings = {};

if (platform == 'local') {
    settings = {
        api_url: 'http://api.gclout.com:3000/',
        country_url: "https://restcountries.eu/rest/v2/",
        state_url: "http://locationsng-api.herokuapp.com/api/v1/states",
        lga_url: "http://locationsng-api.herokuapp.com/api/v1/states",
        base_url: '',
        app_name: 'Gclout',
        subject: 'Gclout'
    }
} else {
    settings = {
        api_url: 'http://api.gclout.com:3000/',
        country_url: "https://restcountries.eu/rest/v2/",
        state_url: "http://locationsng-api.herokuapp.com/api/v1/states",
        lga_url: "http://locationsng-api.herokuapp.com/api/v1/states",
        base_url: '',
        app_name: 'Gclout',
        subject: 'Gclout'
    }
}



export default settings;