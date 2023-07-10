/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { FirebaseApp, FirebaseOptions, initializeApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";

export class FirebaseClient {
	static tenantId?: string = undefined;
	static credentials?: FirebaseOptions = undefined;
	static app?: FirebaseApp = undefined;
	static auth?: Auth = undefined;

	static init(credentials: FirebaseOptions, tenantId?: string) {
		FirebaseClient.credentials = credentials;
		FirebaseClient.app = initializeApp(credentials);
		console.log(FirebaseClient.app);
		FirebaseClient.auth = getAuth(FirebaseClient.app);
		FirebaseClient.setTenant(tenantId);
	}

	static getApp() {
		if (!FirebaseClient.app) {
			if (!FirebaseClient.credentials)
				throw new Error("Firebase credentials not set");
			FirebaseClient.app = initializeApp(FirebaseClient.credentials);
		}
		return FirebaseClient.app;
	}

	static getAuth() {
		if (!FirebaseClient.auth) {
			FirebaseClient.auth = getAuth(FirebaseClient.getApp());
		}
		return FirebaseClient.auth;
	}

	static setTenant(tenantId?: string) {
		if (!tenantId) return;
		FirebaseClient.tenantId = tenantId;
		if (FirebaseClient.auth) {
			FirebaseClient.auth.tenantId = tenantId;
		}
	}
}
