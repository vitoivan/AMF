export class FacebookSDK {
	static async login(): Promise<fb.StatusResponse> {
		return new Promise((resolve) => {
			FB.login(function (response) {
				resolve(response);
			});
		});
	}

	static async init(appId: string, apiVersion = "v11.0"): Promise<void> {
		return new Promise((resolve) => {
			FB.init({
				appId: appId,
				cookie: true,
				xfbml: true,
				version: apiVersion,
			});
			resolve();
		});
	}

	static async getLoginStatus(): Promise<fb.StatusResponse> {
		return new Promise((resolve) => {
			FB.getLoginStatus(function (response) {
				resolve(response);
			});
		});
	}

	static async logout(): Promise<fb.StatusResponse> {
		return new Promise((resolve) => {
			FB.logout(function (response) {
				resolve(response);
			});
		});
	}
}
