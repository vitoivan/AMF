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

export type AppleCredentials = any;

export type Credentials = {
	facebook: FacebookCredentials[];
	google: GoogleCredentials[];
	firebase: FirebaseCredentials[];
	apple: AppleCredentials[];
};

export function useCredentialManager() {
	const initialCred = JSON.parse(
		localStorage.getItem("@cred-manager") ||
			"{ apple: [], facebook: [], firebase: [], google: [] }"
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

	function addAppleCredential(credential: AppleCredentials): void {
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
	};
}