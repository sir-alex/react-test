const aliases = (prefix = `src`) => ({
    '@root': `${prefix}`,
    '@core': `${prefix}/core`,
    '@modules': `${prefix}/modules`,
    '@types': `${prefix}/types`,
});

module.exports = aliases;
