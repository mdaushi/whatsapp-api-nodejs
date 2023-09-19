const astraBot = require("./astrabot")

const chatbotsProvide = async (m) => {
    await astraBot(m)
}

module.exports = chatbotsProvide