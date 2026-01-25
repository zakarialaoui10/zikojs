// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
// import ziko from "ziko-wrapper/astro"
// import starlightGitHubAlerts from 'starlight-github-alerts'
import starlightThemeObsidian from 'starlight-theme-obsidian'
// import mermaid from "astro-mermaid";
// import astroD2 from 'astro-d2'


const CoreReference = [
	'ui',
	'math',
	'router',
	'time',
	'hooks',
	'events',
];

// https://astro.build/config
export default defineConfig({
	integrations: [
		// ziko(),
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
					label : 'Overview',
					slug : 'overview'
				},
				// {
				// 	label : 'Architecture',
				// 	slug : 'architecture'
				// },
				{
					label : 'Concepts',
					slug : 'concepts'
				},
				{
					label : 'Ecosystem',
					slug : 'ecosystem'
				},
				{
					label : 'Core',
					items : [
						{
							label : 'overview',
							slug : 'core/overview'
						},
						{
							label : 'reference',
							items : CoreReference.map(label => ({
								label,
								collapsed: true,
								autogenerate: { directory: `core/reference/${label}` },
							})),
						},
					]
				},
				{
					label : 'Wrapper',
					autogenerate : { directory : `wrapper/`}
				},
				{
					label : 'Server',
					autogenerate : { directory : `server/`}
				}
				// {
				// 	label : 'Reference',
				// 	items : CoreReference.map(label => ({
				// 		label,
				// 		collapsed: true,
				// 		autogenerate: { directory: `reference/${label}` },
				// 	})),
				// },
				
			],
		}),
		// astroD2({}),
	],
});
