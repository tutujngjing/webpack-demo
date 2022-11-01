module.exports = function syncLoader(content, map, meta){
    debugger
    console.log('syncLoader',meta )
    const d = `/** var a = 100; a++*/`
    this.callback(null, d + content, map, {syncLoader: true});
}