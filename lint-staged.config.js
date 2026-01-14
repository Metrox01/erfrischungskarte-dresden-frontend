module.exports = {
	// Run ESLint on changes to JavaScript/TypeScript files
	'(pages|src|testss)/**/*.(ts)?(x)': (filenames) => [
		`eslint --fix ${filenames.map(f => `"${f}"`).join(' ')}`,
		`scripts/tsc-lint.sh ${filenames.map(f => `"${f}"`).join(' ')}`,
		`jest --bail --findRelatedTests ${filenames.map(f => `"${f}"`).join(' ')}`,
	],
}
