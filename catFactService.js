const https = require('https');


const CAT_API_URL = 'https://catfact.ninja/fact';

function getCatFact() {
    return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
            reject(new Error('Request timeout'));
        }, 5000);

        https.get(CAT_API_URL, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                clearTimeout(timeout);
                try {
                    const parsed = JSON.parse(data);

                    console.log(parsed)

                    resolve(parsed.fact);
                } catch (err) {
                    reject(new Error('Failed to parse cat fact'));
                }
            });

        }).on('error', (err) => {
            clearTimeout(timeout);
            reject(err);
        });
    });
}

module.exports = {
    getCatFact
}

