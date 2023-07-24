module.exports = {
    routes: [
        {
            method: "POST",
            path: "/venue/netlify-json",
            handler: "venue.processNetlifyJSON",
            config: {
                policies: [],
                middlewares: [],
            },
        },
    ]
}