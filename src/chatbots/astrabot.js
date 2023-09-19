const axios = require('axios')

const isInputApproval = (m) => {
    if(m.message.extendedTextMessage?.contextInfo?.quotedMessage)
    {
        return true;
    }

    return false;
}

const isBotActive = () => {
    return process.env.WATIFIER_ASTRABOT ?? false
}

const astraBot = async (m) => {
    if(!isBotActive) return 

    if(!isInputApproval(m)) return

    const remoteJid = m.key.remoteJid
    const inputText = m.message.extendedTextMessage.text
    const ctxReply = m.message.extendedTextMessage.contextInfo.quotedMessage?.conversation
    if(ctxReply){
        const uuid = ctxReply.match(/#ASTRA(\d+)/i)[1]
        const urlClient = process.env.URL_CLIENT_ASTRABOT || ""
        await axios.post(urlClient, {
            remoteJid,
            inputText,
            uuid
        }).catch(() => {})

    }

}

module.exports = astraBot