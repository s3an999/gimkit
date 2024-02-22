const axios = require('axios')
const ws = require('ws')

class Gimkit{
    constructor(pin){
        this.pin = pin
        this.infoURI = 'https://www.gimkit.com/api/matchmaker/find-info-from-code'
    }
    async getSession(){
        if(!this.pin) return 0
        const payload = {
            code:this.pin.toString()
        }
        const res = await axios.post(this.infoURI, payload)
        const details = {
            id:await res.data.roomId,
            serverUrl:await res.data.serverUrl,
            session: await res.data.session
        }
        setInterval(async e => {
            console.log(await res.data)
        })
        return details
    };


    
    async connectSocket(d,name, url){
        const details = d
      
        const sessionId = await this.join(name)
        const URI = url.subString(5)
        let socketURI = `wss${URI}/aMO2Bl6dW/${details.roomId}?sessionId=${sessionId}`
        const socket = new ws(socketURI)
    
    }
    async join(name){
        const roomID = await this.getSession().roomId;

        const payload = {
            "roomId": roomID,
            "name": name,
            "clientType": "Gimkit Web ⁤‍⁢⁡‌⁡⁤‍⁢⁡⁢⁡⁤‌⁢‍⁢‍‌‌⁢‍⁣‍‌‍‌⁡⁤⁢‌‍⁣⁡‌‍⁢‍⁢⁡‍‍⁢‌‍⁢⁡‌‍⁢‌‌‍‌⁣‌‌‌‌⁤‍‍‍⁡‍‍⁡⁢‌⁣⁤‍‍⁡⁤‍⁡‌‍⁢‌⁡‍⁢‍⁡‌⁢‍‌‌⁢‍‍⁡⁢⁡⁢⁡⁤‍⁡‌‍⁢‍⁡‍‌⁢⁡⁢⁡‍⁣⁢‌‍‍‌⁤⁢‌‍⁡‍⁡‍⁡⁢⁡‌⁡‍⁣⁢⁣‍⁤‍⁢‌‍⁡‍⁡‌⁡⁤‍‌⁤‌‍‌⁡‌‌⁡⁢‍‍⁤⁡⁤‍⁢‍‌⁡⁤‍⁣‌⁡‍‌‍‍‌⁢⁡‌⁣‌‍⁢⁡‍‍⁤⁢⁣‌‍⁢⁣⁢⁣‍‌‌‍‌⁡⁢⁡‌‍‍‍⁢⁣⁣⁢⁡‍‌‌‍‌‍⁤⁢‍⁡‍⁣‌‌‌‍‌‍‌⁢‍‌⁡⁢⁡‍⁡‍⁢⁡⁤⁡‍⁢‍⁡⁢‌‌‍⁢⁣⁢⁣‍‍‍⁢‍‍⁡‍⁣‍⁣⁤‌‍‍‌‍‍⁣‍‍‌⁡‌‍⁢‌⁡Client V3.1"
        }

        const res = await axios.post('https://www.gimkit.com/api/matchmaker/join',payload);
        const serverURL = res.data.serverUrl;

        this.connectSocket(await res.data, name, serverUrl)
    }
    s
}


(async()=>{
    const kit = new Gimkit('29287');
    console.clear()

})()
