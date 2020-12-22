module.exports = {
	env: {
		browser: true,
		es2021: true,
		jest: true,
	},
	extends: ["airbnb-base"],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaVersion: 12,
	},
	plugins: ["@typescript-eslint"],

	rules: {
		"class-methods-use-this": ["off"],
		"import/extensions": [
			"error",
			"ignorePackages",
			{
				js: "never",
				jsx: "never",
				ts: "never",
				tsx: "never",
			},
		],
		"import/no-extraneous-dependencies": ["error", { devDependencies: true }],
		"import/order": [
			"error",
			{
				groups: [
					["external", "builtin"],
					["internal", "index", "sibling", "parent"],
				],
				"newlines-between": "always",
			},
		],
		"no-shadow": "off",
		"@typescript-eslint/no-shadow": "error",
		"no-unused-vars": "off",
		"@typescript-eslint/no-unused-vars": "error",
	},
	settings: {
		"import/resolver": {
			node: {
				extensions: [".js", ".jsx", ".ts", ".tsx"],
				moduleDirectory: ["node_modules", "src/"],
			},
			node: {
				paths: ["src"],
			},
		},
	},
};
