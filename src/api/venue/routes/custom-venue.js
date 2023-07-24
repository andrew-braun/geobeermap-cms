module.exports = {
    routes: [
        {
            // This route can probably be deleted later (test)
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