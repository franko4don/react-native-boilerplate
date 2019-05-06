
const platform = 'local';

let settings = {};

if (platform == 'local') {
    settings = {
        api_url: 'your url',
        country_url: "https://restcountries.eu/rest/v2/",
        state_url: "http://locationsng-api.herokuapp.com/api/v1/states",
        lga_url: "http://locationsng-api.herokuapp.com/api/v1/states",
        base_url: '',
        app_name: 'App name',
        subject: 'App name',
        firebase: {
                apiKey: "AIzaSyDUop2sO4fa4aL7SFIOh0TbNE-HFJw2hTg",
                authDomain: "hulker-a7a24.firebaseapp.com",
                databaseURL: "https://hulker-a7a24.firebaseio.com",
                projectId: "hulker-a7a24",
                storageBucket: "hulker-a7a24.appspot.com",
                messagingSenderId: "271802644297"
              }
    }
} else {
    settings = {
        api_url: 'your url',
        country_url: "https://restcountries.eu/rest/v2/",
        state_url: "http://locationsng-api.herokuapp.com/api/v1/states",
        lga_url: "http://locationsng-api.herokuapp.com/api/v1/states",
        base_url: '',
        app_name: 'App name',
        subject: 'App name',
        firebase: {
                apiKey: "AIzaSyDUop2sO4fa4aL7SFIOh0TbNE-HFJw2hTg",
                authDomain: "hulker-a7a24.firebaseapp.com",
                databaseURL: "https://hulker-a7a24.firebaseio.com",
                projectId: "hulker-a7a24",
                storageBucket: "hulker-a7a24.appspot.com",
                messagingSenderId: "271802644297"
              }
    }
}



export default settings;