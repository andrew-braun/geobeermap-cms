"use strict";

/**
 *  venue controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

// module.exports = createCoreController('api::venue.venue');

const uid = "api::venue.venue";

module.exports = createCoreController(uid, () => {
  const components = {
    location: {
      populate: {
        city: {
          fields: ["name", "slug", "locale"],
        },
        neighborhood: {
          fields: ["name", "slug", "locale"],
        },
      },
    },
    business_information: {
      populate: {
        logo: {
          fields: ["name", "alternativeText", "width", "height", "url"],
        },
      },
    },
    social_links: true,
  };

  return {
    async find(ctx) {
      // overwrite default populate=* functionality
      if (ctx.query.populate === "*") {
        const entity = await strapi.entityService.findMany(uid, {
          ...ctx.query,
          populate: components,
        });
        const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

        return this.transformResponse(sanitizedEntity);
      }
      // maintain default functionality for all other request
      return super.find(ctx);
    },
    async findOne(ctx) {
      const { id } = ctx.request.params;

      if (ctx.query.populate === "*") {
        const entity = await strapi.entityService.findOne(uid, id, {
          ...ctx.query,
          populate: components,
        });
        const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

        return this.transformResponse(sanitizedEntity);
      }

      return super.findOne(ctx);
    },
  };
});
