module.exports = ({ env }) => ({
  // ...
  upload: {
    config: {
      provider: "cloudinary",
      providerOptions: {
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      },
      actionOptions: {
        upload: {
          config: {
            breakpoints: {
              large: 1000,
            },
          },
        },
        uploadStream: {
          //   folder: "logos",
        },
        delete: {},
      },
    },
  },
  // ...
});
