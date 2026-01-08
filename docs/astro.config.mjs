// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
// import starlightGitHubAlerts from 'starlight-github-alerts'
import starlightThemeObsidian from 'starlight-theme-obsidian'


const referenceModules = [
	'math',
	'ui',
	'time',
	'hooks',
	// 'typed-matrix',
	// 'functions', 
	// // 'matrix',
	// 'complex',
	// 'signal', 
	// 'stats',
	// 'calculs',
	// 'discret'
];

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'Zikojs',
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
				{
					label : 'overview',
					slug : 'overview'
				},
				{
					label : 'architecture',
					slug : 'architecture'
				},
				{
					label : 'concepts',
					slug : 'concepts'
				},
				{
					label : 'ecosystem',
					slug : 'ecosystem'
				},
				// {
				// 	label: 'overview',
				// 	autogenerate: { directory: `overview` }
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
