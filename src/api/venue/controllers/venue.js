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
        const entities = await strapi.db.query(uid).findMany({
          select: ["*"],
          where: { slug: slug },
          populate: components,
        });

        const sanitizedEntity = await this.sanitizeOutput(entities[0], ctx);

        return this.transformResponse(sanitizedEntity);
      }

      const entities = await strapi.db.query(uid).findMany({
        select: ["*"],
        where: { slug: slug },
      });

      return entities[0];
    },

    async processNetlifyJSON(ctx) {
      try {
        const { data, content } = ctx.request.body;
        const { date, name, type, open, address, city, country, coordinates, openingdate, logo, beers, website, googlemaps, facebook, instagram, untappd, path, title } = data;

        const basicInfo = {
          name: name,
          slug: title,
          description: content,
        }

        const splitCoordinates = coordinates.split(",")
        const latitude = splitCoordinates[0]
        const longitude = splitCoordinates[1]

        const locationInfo = {
          location: [

            {
              location_id: title,
              latitude,
              longitude,
              street_address: address,
              city: {
                connect: [1]
              },
              country: {
                connect: [1]
              }
            }
          ]
        }

        const socialInfo = {
          social_links: {
            facebook: facebook ?? null,
            instagram: instagram ?? null,
            untappd: untappd ?? null,
            website: website ?? null,
            google_maps: googlemaps ?? null,
          }
        }

        const businessInfo = {
          business_information: {
            type,
            currently_operating: open,
          }
        }

        const venue = await strapi.entityService.create(uid, {
          data: {
            ...basicInfo,
            ...locationInfo,
            ...socialInfo,
            ...businessInfo
          }
        })

        // console.log(venue)

      }
      catch (error) {
        console.error(error?.message)
        console.error(error?.details)
        // console.error(error)
      }
    }
  }
})
