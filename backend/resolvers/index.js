const { userResolvers } = require('./user');
const { productResolvers } = require('./product');
const { orderResolvers } = require('./order');
const { mergeResolvers } = require('@graphql-tools/merge');

// const resolverFiles = loadFilesSync(path.join(__dirname));
const resolvers = mergeResolvers([
    productResolvers,
    userResolvers,
    orderResolvers,
]);
module.exports = resolvers;
