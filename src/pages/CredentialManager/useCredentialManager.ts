/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
export type FirebaseCredentials = {
	id: string;
	name: string;
	apiKey: string;
	authDomain: string;
	projectId: string;
	tenantId?: string;
};

export type FacebookCredentials = {
	id: string;
	name: string;
	appId: string;
};

export type GoogleCredentials = {
	id: string;
	name: string;
	clientId: string;
};

export type AppleCredentials = {
	id: string;
	name: string;
	clientId: string;
	scopes: string
	redirectURL: string
}

export type Credentials = {
	apple: AppleCredentials[];
	facebook: FacebookCredentials[];
	google: GoogleCredentials[];
	firebase: FirebaseCredentials[];
};

export function useCredentialManager() {
	const initialCredAsObj: Credentials = {
		apple: [],
		facebook: [],
		firebase: [],
		google: [],
	};

	const initialCred = JSON.parse(
		localStorage.getItem("@cred-manager") ||
			JSON.stringify(initialCredAsObj)
	) as Credentials;
	const [credentials, setCredentials] = useState<Credentials>(initialCred);

	useEffect(() => {
		localStorage.setItem("@cred-manager", JSON.stringify(credentials));
	}, [credentials]);

	function addFacebookCredential(
		credential: Omit<FacebookCredentials, "id">
	): void {
		setCredentials({
			...credentials,
			facebook: [...credentials.facebook, { ...credential, id: uuid() }],
		});
	}

	function addGoogleCredential(
		credential: Omit<GoogleCredentials, "id">
	): void {
		setCredentials({
			...credentials,
			google: [...credentials.google, { ...credential, id: uuid() }],
		});
	}

	function addAppleCredential(credential: Omit<AppleCredentials, "id">): void {
		setCredentials({
			...credentials,
			apple: [...credentials.apple, { ...credential, id: uuid() }],
		});
	}

	function addFirebaseCredential(credential: FirebaseCredentials): void {
		setCredentials({
			...credentials,
			firebase: [...credentials.firebase, { ...credential, id: uuid() }],
		});
	}


	function deleteCred(provider: keyof Credentials, id: string) {
		setCredentials({
			...credentials,
			//@ts-ignore
			[provider]: credentials[provider].filter((cred) => cred.id !== id),
		});
	}

	function reset(): void {
		setCredentials({
			apple: [],
			facebook: [],
			firebase: [],
			google: [],
		});
	}

	function importCredentials(jsonCreds: string): void {
		if (!jsonCreds || jsonCreds === "") {
			console.error("No credentials to import");
			return;
		}
		try {
			const creds = JSON.parse(jsonCreds) as Credentials;
			if (!creds.apple) {
				console.error("Credentials import error: No apple credentials");
				return;
			}
			if (!creds.facebook) {
				console.error(
					"Credentials import error: No facebook credentials"
				);
				return;
			}

			if (!creds.firebase) {
				console.error(
					"Credentials import error: No firebase credentials"
				);
				return;
			}

			if (!creds.google) {
				console.error(
					"Credentials import error: No google credentials"
				);
				return;
			}

			const appleCreds = creds.apple.map((cred) => ({
				...cred,
				id: uuid(),
			}));

			const facebookCreds = creds.facebook.map((cred) => ({
				...cred,
				id: uuid(),
			}));

			const firebaseCreds = creds.firebase.map((cred) => ({
				...cred,
				id: uuid(),
			}));

			const googleCreds = creds.google.map((cred) => ({
				...cred,
				id: uuid(),
			}));

			setCredentials({
				apple: [...credentials.apple, ...appleCreds],
				facebook: [...credentials.facebook, ...facebookCreds],
				firebase: [...credentials.firebase, ...firebaseCreds],
				google: [...credentials.google, ...googleCreds],
			});
		} catch (e) {
			console.error("Credentials import error: ", (e as Error).message);
		}
	}

	function exportCredentials(): string {
		return JSON.stringify(credentials, null, 2);
	}

	function editCredential(
		provider: keyof Credentials,
		id: string,
		credential: any
	) {
		if (!credentials[provider]) {
			console.error(`No credentials for provider ${provider}`);
			return;
		}

		if (provider === "apple") {
			const newCred = credential;
			const appleCreds = credentials.apple.map((cred) =>
				cred.id === id
					? { ...newCred, ...credential, id: cred.id }
					: cred
			);
			setCredentials({
				...credentials,
				apple: appleCreds,
			});
			return;
		}
		if (provider === "facebook") {
			const newCred = credential as FacebookCredentials;
			if (!newCred.appId) {
				console.error("No appId");
				return;
			}

			const facebookCreds = credentials.facebook.map((cred) =>
				cred.id === id
					? { ...newCred, ...credential, id: cred.id }
					: cred
			);
			setCredentials({
				...credentials,
				facebook: facebookCreds,
			});
			return;
		}

		if (provider === "firebase") {
			const newCred = credential as FirebaseCredentials;
			if (!newCred.apiKey) {
				console.error("No apiKey");
				return;
			}

			if (!newCred.authDomain) {
				console.error("No authDomain");
				return;
			}

			const firebaseCreds = credentials.firebase.map((cred) =>
				cred.id === id
					? { ...newCred, ...credential, id: cred.id }
					: cred
			);
			setCredentials({
				...credentials,
				firebase: firebaseCreds,
			});
			return;
		}

		if (provider === "google") {
			const newCred = credential as GoogleCredentials;
			if (!newCred.clientId) {
				console.error("No clientId");
				return;
			}

			const googleCreds = credentials.google.map((cred) =>
				cred.id === id
					? { ...newCred, ...credential, id: cred.id }
					: cred
			);
			setCredentials({
				...credentials,
				google: googleCreds,
			});
			return;
		}
	}

	return {
		credentials,
		resetCredentials: reset,
		addAppleCredential,
		addFacebookCredential,
		addFirebaseCredential,
		deleteCred,
		addGoogleCredential,
		importCredentials,
		exportCredentials,
		editCredential,
	};
}
