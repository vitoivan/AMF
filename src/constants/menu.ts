export type Menu = {
	title: string;
	path?: string;
	type: "section" | "link";
	children?: Menu[];
};

// if type == link, then patch is required

export const menu: Menu[] = [
	{
		title: "Firebase Login",
		path: "/firebase-login",
		type: "link",
	},
	{
		title: "SDK Login",
		type: "section",
		children: [
			{
				title: "Facebook",
				path: "/sdk-login/facebook",
				type: "link",
			},
			{
				title: "Google",
				path: "/sdk-login/google",
				type: "link",
			},
			{
				title: "Apple",
				path: "/sdk-login/apple",
				type: "link",
			},
		],
	},
	{
		title: "Gerenciador de Credenciais",
		path: "/credential-manager",
		type: "link",
	},
];
