const path = require('path');
const rootPath = __dirname;

module.exports = {
    rootPath,
    uploadPath: path.join(rootPath, 'public/uploads'),
    mongo: {
        db: 'mongodb://localhost/music'
    },
    facebook:{
        appId: '5674587392603120',
        appSecret: process.env.FACEBOOK_APP_SECRET,
    }
};