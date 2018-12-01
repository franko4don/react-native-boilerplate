import moment from 'moment';

const getSingleError = (field = '', superErrors) => {
    if (superErrors.hasOwnProperty('errors')) {
        const errors = superErrors.errors;
        if (errors.hasOwnProperty(field)) {
            return errors[field][0];
        } else {
            return '';
        }
    }
    return '';
}

const isEmpty = (obj) => {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

const isObjectEmpty = (obj) => {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

const cleanUrl = (sentence) => {
    return sentence.replace(/ /g, "-").replace(/\//g, "-");
}

const encode = (value) => {
    let start = "";
    let end = "";
    let multiplier = 6;
    let alpha = "ABCDEFGHIJKLMNOPQRSTUPWXYZabcdefghijklmanopqrstuvwxyz0123456789";

    for (let i = 0; i < multiplier; i++) {
        let rand = parseInt(Math.random() * alpha.length - 1);
        start += alpha.substring(rand, rand + 1);
    }

    for (let i = 0; i < multiplier; i++) {
        let rand = parseInt(Math.random() * alpha.length - 1);
        end += alpha.substring(rand, rand + 1);
    }

    return start + value + end;
}



const decode = (value) => {
    let multiplier = 6;
    return value.substring(multiplier, value.length - multiplier);
}


const formatJoinedDate = (date) => {
    return moment(date).format("D MMMM, YYYY");
}

const formatCommentDate = (date) => {
    return moment(date).format("HH:mm A");
}

const humanizeTime = (date) => {
    let time = moment(date);
    return time.fromNow();
}

const getWeek = (date) => {
    var startOfWeek = moment(date).startOf('isoWeek');
    var endOfWeek = moment(date).endOf('isoWeek');

    var days = [];
    var day = startOfWeek;

    while (day <= endOfWeek) {
        days.push(day.toDate());
        day = day.clone().add(1, 'd');
    }
    return days;
}

const getDay = (date) => {
    return moment(date).format('D');
}

const getMonthWord = (date) => {
    return moment(date).format('MMMM');
}

const getProgramTime = (date) => {
    return moment(date).format("HH:mm");
}

const getDayWord = (date) => {
    let weekWord = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let index = moment(date).format('e');
    return weekWord[index];
}

const getDayWordFull = (date) => {
    let weekWord = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let index = moment(date).format('e');
    return weekWord[index];
}

const calculateOpacity = (percentage) => {
    let maxColorValue = 255;
    let opacity = percentage * maxColorValue / 100.0;
    let value = (parseInt(opacity)).toString(16)
    return value;
}

const filterPost = (uuid, posts) => {
    let activePost = {};
    for (let i in posts) {
        if (posts[i].post.uuid == uuid) {
            activePost = posts[i].post;
        }
    }
    return activePost;
}

const searchFriends = (query, friends) => {
    query = query.toLowerCase();
    let expression = `.*${query}.*`;
    let regex = new RegExp(expression, 'g');
    friends = friends.filter(friend => friend.firstName != null);
    let result = friends.filter(friend => {
        return friend.lastName.toLowerCase().match(regex) || friend.firstName.toLowerCase().match(regex) ;
    }
    );
    
    return result;
}

const hasLikes = (uuid, likes) => {

    for (let i in likes) {
        if (likes[i].user == uuid) {
            return true;
        }
    }
    return false;
}

export {
    filterPost, calculateOpacity, hasLikes,
    isObjectEmpty, searchFriends
};