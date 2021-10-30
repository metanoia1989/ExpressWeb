const express = require('express')
const expressJSDocSwagger = require('express-jsdoc-swagger')

const options = {
    info: {
        version: '1.0.0',
        title: 'OPENAPI 文档生成示例',
        license: {
            name: 'GPLv3',
        },
    },
    security: {
        BasicAuth: {
            type: 'http',
            scheme: 'basic',
        }
    },
    baseDir: __dirname,
    filesPattern: './**/*.js',
    swaggerUIPath: '/api-docs',
    exposeSwaggerUI: true,
    exposeApiDocs: false,
    apiDocsPath: '/v3/api-docs',
    notRequiredAsNullable: false,
    swaggerUiOptions: {},
    multiple: true,
}

const app = express();
const PORT = 3000;

expressJSDocSwagger(app)(options);

/**
 * A song type
 * @typedef {object} Song
 * @property {string} title.required - The title
 * @property {string} artist - The artist
 * @property {number} year - The year - double
 */

/**
 * GET /api/v1
 * @summary This is the summary of the endpoint
 * @return {object} 200 - success response
 */
app.get('/api/v1', (req, res) => res.json({
    success: true,
}))

/**
 * GET /api/v1/albums
 * @summary This is the summary of the endpoint
 * @tags album
 * @return {array<Song>} 200 - success response - application/json
 * @example response - 200 - success response example
 * [
 *   {
 *     "title": "Bury the light",
 *     "artist": "Casey Edwards ft. Victor Borba",
 *     "year": 2020
 *   }
 * ]
 */
app.get('/api/v1/albums', (req, res) => (
    res.json([{
        title: 'abum 1',
    }])
));

/**
* GET /api/v1/album
* @summary This is the summary of the endpoint
* @security BasicAuth
* @tags album
* @param {string} name.query.required - name param description
* @return {object} 200 - success response - application/json
* @return {object} 400 - Bad request response
*/
app.get('/api/v1/album', (req, res) => (
    res.json({
        title: 'abum 1',
    })
));

  /**
   * GET /api/v1/authors
   * @summary This is the summary or description of the endpoint
   * @param {string} name.query.required - name param description - enum:type1,type2
   * @param {array<string>} license.query - name param description
   * @return {object} 200 - success response - application/json
   */
   app.get('/api/v1/authors',  (req, res) => (
    res.json([{
      title: 'album 1',
    }])
  ));

app.listen(PORT, () => console.log(`Example app listening at http://localhost:${PORT}`))