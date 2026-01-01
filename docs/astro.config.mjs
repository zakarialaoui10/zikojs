// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
// import starlightGitHubAlerts from 'starlight-github-alerts'
import starlightThemeObsidian from 'starlight-theme-obsidian'


const referenceModules = [
	'typed-matrix',
	'functions', 
	// 'matrix',
	'complex',
	'signal', 
	'stats',
	'calculs',
	'discret'
];

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'NumZ',
			plugins: [
				starlightThemeObsidian({
					graph: false
				})
				// starlightGitHubAlerts(),
			],
			customCss: [
				'./src/styles/custom.css',
			],
			social: [
				{ 
					icon: 'github', 
					label: 'GitHub', 
					href: 'https://github.com/zakarialaoui10/numz.git' 
				}],
			sidebar: [
				// {
				// 	label: 'Guides',
				// 	items: [
				// 		{ label: 'Example Guide', slug: 'guides/example' },
				// 	],
				// },
				// {
				// 	label : 'philosophy',
				// 	slug : 'philosophy'
				// },
				// {
				// 	label : 'about',
				// 	slug : 'about'
				// },
				{
					label : 'reference',
					items : referenceModules.map(label => ({
						label,
						collapsed: true,
						autogenerate: { directory: `reference/${label}` },
					})),
				},
			],
		}),
	],
});
