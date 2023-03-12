const { mergeTypeDefs } = require('@graphql-tools/merge');
const { loadFilesSync } = require('@graphql-tools/load-files');

const typesArray = loadFilesSync(`${__dirname}/**/*.graphql`);
const typeDefs = mergeTypeDefs(typesArray);

module.exports = typeDefs;
