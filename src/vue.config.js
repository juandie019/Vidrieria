const { default: hellowWorld } = require("./background");

module.exports = {
    pluginOptions: {
      electronBuilder: {
        nodeIntegration:true,
        //nodeModulesPath:['./node_modules']
      }
    },
    helloWorld
  }
