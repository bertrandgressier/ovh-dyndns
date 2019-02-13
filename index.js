const axios = require("axios");

const GET_IP_URL = "http://ifconfig.co/ip";

const TIME_INTERVAL = 1000 * 60 * 5;

const get = async (url, config ={}) => {
    try {
      const response = await axios.get(url, config);
      return response.data;
    } catch (error) {
      console.error(error.response.statusText);
    }
  };

const getovhApi = async (username, password, hostname, ip ) => {

    const url = `http://www.ovh.com/nic/update?system=dyndns&hostname=${hostname}&myip=${ip}`;
    return get(url, {
        auth: {
            username,
            password
        }
    });
}

const getIP = async () => get(GET_IP_URL);

let ipSave = '';

const ovhDynDNS = async (username, password, domains) => {

    const ip = await getIP();
    console.log(ip);

    if (ip != ipSave){
        console.log(`New IP: ${ip}`);
        ipSave=ip;
        domains.forEach(async (domain) => {
            const result = await getovhApi(username, password, domain, ip);
            console.log(`${domain}: ${result}`);
        });
    }
  
}

console.log('OVH DynDNS Started');

const domainsEnv = process.env.DOMAINS;

const username = process.env.USER;
const password = process.env.PASSWORD;
const domains = domainsEnv.split(/,| /);

ovhDynDNS(username, password, domains);
setInterval(ovhDynDNS, TIME_INTERVAL); 
