const path = require('path');
module.exports={
    entry:'./index.js',
    output:{
        path: path.resolve(__dirname, 'dist'),
        filename: 'weatherBack.bundle.js'
    },
    module:{},
    plugins:[],
    devServer:{},
    mode:'development'
}