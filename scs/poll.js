const {
  adams
} = require("../Eliakim/tech");
const axios = require("axios");
const Genius = require("genius-lyrics");
const Client = new Genius.Client("jKTbbU-6X2B9yWWl-KOm7Mh3_Z6hQsgE4mmvwV3P3Qe7oNa9-hsrLxQV5l5FiAZO");

// Define the command with aliases
eliakim({
  nomCom: "lyrics",
  aliases: ["mistari", "lyric"],
  reaction: '📜',
  categorie: "search"
}, async (dest, zk, params) => {
  const { repondre: sendResponse, arg: commandArgs, ms } = params;
  const text = commandArgs.join(" ").trim();

  if (!text) {
    return sendResponse("Please provide a song name.");
  }

  // Function to get lyrics data from APIs
  const getLyricsData = async (url) => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching data from API:', error);
      return null;
    }
  };

  // List of APIs to try
  const apis = [
    `https://api.dreaded.site/api/lyrics?title=${encodeURIComponent(text)}`,
    `https://some-random-api.com/others/lyrics?title=${encodeURIComponent(text)}`,
    `https://api.davidcyriltech.my.id/lyrics?title=${encodeURIComponent(text)}`
  ];

  let lyricsData;
  for (const api of apis) {
    lyricsData = await getLyricsData(api);
    if (lyricsData && lyricsData.result && lyricsData.result.lyrics) break;
  }

  // Check if lyrics data was found
  if (!lyricsData || !lyricsData.result || !lyricsData.result.lyrics) {
    return sendResponse(`Failed to retrieve lyrics. Please try again.`);
  }

  const { title, artist, thumb, lyrics } = lyricsData.result;
  const imageUrl = thumb || "https://files.catbox.moe/novrnn.jpg";

  const caption = `
╭──────────━⊷
║ *Bot Name:* ELIAKIM MD
║ *Title:* ${title}
║ *Artist:* ${artist}
╰──────────━⊷\n\n
${lyrics}`;

  try {
    // Fetch the image
    const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const imageBuffer = Buffer.from(imageResponse.data, 'binary');

    // Send the message with the image and lyrics
    await zk.sendMessage(
      dest,
      {
        image: imageBuffer,
        caption: caption
      },
      { quoted: ms }
    );

  } catch (error) {
    console.error('Error fetching or sending image:', error);
    // Fallback to sending just the text if image fetch fails
    await sendResponse(caption);
  }
});
eliakim({
  'nomCom': 'poll',
  'reaction': '💠',
  'categorie': "General"
}, async (_0x30c4fc, _0x12f9f4, _0x257571) => {
  const {
    repondre: _0x394782,
    arg: _0x3aacc5,
    ms: _0x50fea5
  } = _0x257571;
  const _0x24dbc4 = _0x3aacc5.join(" ");
  let [_0x48d7c3, _0x3c6856] = _0x24dbc4.split('/');
  if (_0x24dbc4.split('/') < 0x2) {
    return _0x394782("Incorrect format.\nExample: poll what is 1+1/2, 3, 4");
  }
  let _0x28e247 = [];
  for (let _0x44e06d of _0x3c6856.split(',')) {
    _0x28e247.push(_0x44e06d);
  }
  await _0x12f9f4.sendMessage(_0x30c4fc, {
    'poll': {
      'name': _0x48d7c3,
      'values': _0x28e247
    }
  });
});

eliakim({
  'nomCom': 'fact',
  'reaction': '👌',
  'categorie': 'User'
}, async (_0x3c85fa, _0xe0dd81, _0x20339c) => {
  const {
    repondre: _0x12e23a,
    arg: _0xec0687,
    ms: _0x5d5368
  } = _0x20339c;
  const _0x5754a8 = await fetch("https://nekos.life/api/v2/fact");
  const _0x21e127 = await _0x5754a8.json();
  _0x12e23a(" *ELIAKIM MD FACT MESSAGE* \n*💠* " + _0x21e127.fact + "\n\n\n\n\n*©Ibrahim Adams*\n\n╔═════◇\n║◇ *BMW MD*\n╚════════════════════>  ");
});
eliakim({
  'nomCom': "quote",
  'reaction': '🗿',
  'categorie': 'User'
}, async (_0x139e97, _0xb6d444, _0x53dc51) => {
  const {
    repondre: _0x3bef2d,
    arg: _0x135e01,
    ms: _0x4a891b
  } = _0x53dc51;
  const _0x2784cf = await fetch('https://favqs.com/api/qotd');
  const _0x1f25fb = await _0x2784cf.json();
  const _0x2b238b = "\nELIAKIM MD QUITE MESSAGE \n◇ _" + _0x1f25fb.quote.body + "_\n\n\n◇ *AUTHOR:* " + _0x1f25fb.quote.author + "\n\n\n\n\n◇ *©Ibrahim Adams**\n\n\n╔═════◇\n║◇ *BMW MD*\n╚════════════════════> ";
  _0x3bef2d(_0x2b238b);
});
eliakim({
  'nomCom': 'define',
  'reaction': '😁',
  'categorie': "Search"
}, async (_0x2d6773, _0x1778cf, _0x5bcf7e) => {
  const {
    repondre: _0x3c6e3b,
    arg: _0x3997ea,
    ms: _0x10a9bb
  } = _0x5bcf7e;
  if (!_0x3997ea || _0x3997ea.length === 0x0) {
    return _0x3c6e3b("provide a term");
  }
  const _0x243eb3 = _0x3997ea.join(" ");
  try {
    let {
      data: _0x31830d
    } = await axios.get("http://api.urbandictionary.com/v0/define?term=" + _0x243eb3);
    var _0x259634 = "\n Word: " + _0x243eb3 + "\n Definition: " + _0x31830d.list[0x0].definition.replace(/\[/g, '').replace(/\]/g, '') + "\n Example: " + _0x31830d.list[0x0].example.replace(/\[/g, '').replace(/\]/g, '');
    return _0x3c6e3b(_0x259634);
  } catch {
    return _0x3c6e3b("No result for " + _0x243eb3);
  }
});
