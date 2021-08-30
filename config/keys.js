dbPassword ='mongodb+srv://user:'+encodeURIComponent('user')+'@cluster0-btgru.mongodb.net/test?retryWrites=true&w=majority';
module.exports = {
    mongoURI: dbPassword
};
