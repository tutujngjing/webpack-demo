module.exports = function asyncLoader (content, map, meta){
    debugger
    console.log('asyncLoader')
    var callback = this.async();
    setTimeout(() => {
        callback(null,content , map, {asyncLoader: true});
    },1000)
}