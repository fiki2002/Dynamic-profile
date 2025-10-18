const http = require('http');
const catServerApi = require('./catFactService.js');

const PORT = process.env.PORT || 3000;

const USER_INFO = {
        email: 'adepitanoluwatosin202@gmail.com',
        name: 'Adepitan Oluwatosin',
        stack: 'Node.js'
};

const server = http.createServer(async (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

        if (req.method === 'OPTIONS') {
                res.writeHead(200);
                res.end();
                return;
        }

        if (req.method === 'GET' && req.url === '/me') {
                console.log(`[${new Date().toISOString()}] GET /me - Fetching cat fact...`);

                try {
                        const catFact = await catServerApi.getCatFact();

                        const response = {
                                status: "success",
                                user: {
                                        email: USER_INFO.email,
                                        name: USER_INFO.name,
                                        stack: USER_INFO.stack
                                },
                                timestamp: new Date().toISOString(),
                                fact: catFact
                        };

                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify(response));
                } catch (err) {
                        console.error(err);
                        res.writeHead(500, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify(
                                {
                                        "status": "error",
                                        "message": "Failed to fetch cat fact"
                                }
                        ));
                }
                return;
        }

        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
                "status": "error",
                error: 'Not Found'
        }));
});

server.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
        console.log(`Access the endpoint at: http://localhost:${PORT}/me`);
});

function shutdown() {
        console.log('Shutting down server gracefully...');
        server.close(() => {
                console.log('Server closed');
                process.exit(0);
        });

        setTimeout(() => {
                console.error('Forcing shutdown...');
                process.exit(1);
        }, 5000);
}

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);