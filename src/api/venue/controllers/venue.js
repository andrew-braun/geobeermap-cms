"use strict";

/**
 *  venue controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

// module.exports = createCoreController('api::venue.venue');

const uid = "api::venue.venue";

module.exports = createCoreController(uid, ({ strapi }) => {
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
      const { id, slug } = ctx.request.params;

      if (ctx.query.populate === "*") {
        const entities = await strapi.db.query("api::venue.venue").findMany({
          select: ["*"],
          where: { slug: slug },
          populate: components,
        });

        const sanitizedEntity = await this.sanitizeOutput(entities[0], ctx);

        return this.transformResponse(sanitizedEntity);
      }

      const entities = await strapi.db.query("api::venue.venue").findMany({
        select: ["*"],
        where: { slug: slug },
      });

      return entities[0];
    },
  };
});
