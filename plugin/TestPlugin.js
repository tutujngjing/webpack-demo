let fs = require("fs")
const exec = require('child_process').exec;
let count = 0

// 一个 JavaScript 类
class TestPlugin {
    // 在插件函数的 prototype 上定义一个 `apply` 方法，以 compiler 为参数。
    apply(compiler) {
        // 指定一个挂载到 webpack 自身的事件钩子。
        
        // 注册事件
        compiler.hooks.make.tapAsync('TestPlugin',(compilation, callback)=> {
            console.log('compiler==========>make');
            // console.log(compilation,"compilation=====");
            compilation.hooks.buildModule.tap('TestPlugin', (module)=> {
                // console.log('compilation==========>buildModule')
            })
            callback()
        })
        compiler.hooks.emit.tapAsync( 'TestPlugin',(compilation, callback) => {
            console.log('emit==========》');
            // console.log(compilation,"compilation======");
            // console.log(
            //     '这里表示了资源的单次构建的 `compilation` 对象：',
            //     compilation
            // );
            // // 用 webpack 提供的插件 API 处理构建过程
            // compilation.addModule(/* ... */);

            callback();
        });
    }
}

module.exports = TestPlugin

