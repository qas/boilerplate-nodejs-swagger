// tslint:disable-next-line:no-var-requires
const pkginfo = require('../../package.json');

/**
 * @swagger
 * /v1/health:
 *   get:
 *     tags:
 *       - Public
 *     summary: Show API information.
 *     operationId: showApiInfo
 *     responses:
 *       200:
 *         description: Describe general API information
 */
const healthController = (ctx) => {
  // BUSINESS LOGIC
  const data = {
    name: pkginfo.name,
    version: pkginfo.version,
    description: pkginfo.description,
    author: pkginfo.author,
  };

  ctx.res.ok(data, 'Hello, API!');
};

export {healthController};
