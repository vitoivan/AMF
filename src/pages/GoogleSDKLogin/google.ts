/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
export class GoogleSDK {
	static init(
		clientId: string,
		callback: (data: any) => Promise<void>
	): void {
		//@ts-ignore
		google.accounts.id.initialize({
			client_id: clientId,
			callback: callback,
			ux_mode: "popup",
		});
	}

	static renderButton(): void {
		const button = document.getElementById("google-signin");
		//@ts-ignore
		google.accounts.id.renderButton(
			button,
			{ theme: "outline", size: "large" } // customization attributes
		);
	}
}
