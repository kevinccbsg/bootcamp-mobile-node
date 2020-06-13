
/**
 * @typedef {object} Error
 * @property {boolean} success
 * @property {string} error
 */

/**
 * @typedef {object} RegisterUser
 * @property {string} name.required - user name
 * @property {string} email.required - user email - email
 * @property {string} password.required - user password - password
 */

/**
 * @typedef {object} UserResponse
 * @property {string} name.required - user name
 * @property {string} email.required - user email - email
 */

/**
 * @typedef {object} RegisterUserResponse
 * @property {boolean} success
 * @property {UserResponse} user
 */

/**
 * @typedef {object} LoginUserResponse
 * @property {boolean} success
 * @property {string} token
 */

/**
 * @typedef {object} LoginUser
 * @property {string} email.required -  user email - email
 * @property {string} password.required -  user password - password
 */

/**
 * @typedef {object} Advertisement
 * @property {string} nombre.required - advertisement name
 * @property {boolean} venta - advertisement isSell status
 * @property {number} precio - advertisement price
 * @property {string} foto - advertisement photo URL - uri
 * @property {array<Tag>} tags - advertisement tags
 */

/**
 * @typedef {object} Tag
 * @property {string} type.required - Tag type
 */
