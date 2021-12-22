module.exports = {
    'roots': [
        'src',
    ],
    'globals': {
        'ts-jest': {
            'tsConfig': 'tsconfig.qa.json',
        },
    },
    'testEnvironment': './node_modules/jest-environment-jsdom/build/index.js',
    'setupFilesAfterEnv': [
        'jest-extended',
        '<rootDir>/setup.js',
    ],
    'transform': {
        '^.+\\.tsx?$': 'ts-jest',
    },
    'testRegex': '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
    'testPathIgnorePatterns': [
        '/node_modules/',
        '(/__tests__/__testcases__/.*|(\\.|/)(case|helpers))\\.tsx?$',
        '/__tests_switched_off__/',
    ],
    'moduleFileExtensions': [
        'ts',
        'tsx',
        'js',
        'jsx',
        'json',
        'node',
    ],
    'moduleNameMapper': {
        '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
        '^@root/(.*)': '<rootDir>/src/$1',
        '^@core/(.*)': '<rootDir>/src/core/$1',
        '^@modules/(.*)': '<rootDir>/src/modules/$1',
        '^@type/(.*)': '<rootDir>/src/type/$1',
    },
    'collectCoverage': true,
    'collectCoverageFrom': [
        'src/modules/**/*.{ts,tsx}',
    ],
    'coverageDirectory': './coverage',
    'coveragePathIgnorePatterns': [
        './node_modules/',
        './__testcases__',
        './coverage',
    ],
    'coverageReporters': [
        'json',
        'html',
    ],
}
