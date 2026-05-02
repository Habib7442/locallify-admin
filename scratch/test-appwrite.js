const https = require('https');

function test() {
    const url = "https://fra.cloud.appwrite.io/v1/health";
    https.get(url, (res) => {
        console.log("Status:", res.statusCode);
        let data = '';
        res.on('data', (chunk) => { data += chunk; });
        res.on('end', () => {
            console.log("Response:", data);
        });
    }).on('error', (err) => {
        console.error("Error:", err.message);
    });
}

test();
