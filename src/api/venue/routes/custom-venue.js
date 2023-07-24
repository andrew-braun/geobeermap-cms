module.exports = {
    routes: [
        {
            // This route can probably be deleted later
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