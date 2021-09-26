module.exports = {
	chainWebpack: (config) => {
		config.module
			.rule('vue')
			.use('vue-loader')
			.tap((options) => {
				options.compilerOptions = {
					...options.compilerOptions,
					isCustomElement: (tag) => tag === 'df-messenger',
				};
				return options;
			});
	},
	pluginOptions: {
		i18n: {
			locale: 'en',
			fallbackLocale: 'en',
			localeDir: 'locales',
			enableLegacy: true,
			runtimeOnly: false,
			compositionOnly: false,
			fullInstall: true,
		},
	},
};
