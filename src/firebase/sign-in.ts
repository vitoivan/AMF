/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { GoogleAuthProvider, FacebookAuthProvider, signInWithPopup, OAuthProvider } from "firebase/auth";
import { FirebaseClient } from "./setup";

export async function signInWithGooglePopUp() {
	const provider = new GoogleAuthProvider();
	provider.addScope("profile");
	provider.addScope("email");

	try {
		const result = await signInWithPopup(
			FirebaseClient.getAuth(),
			provider
		);

		console.log("result", result);
		const credentials = GoogleAuthProvider.credentialFromResult(result);
		console.log("credentials", credentials);
	} catch (error) {
		console.log("error", error);
	}
}

export async function signInWithFacebookPopUp() {
	const provider = new FacebookAuthProvider();
	provider.addScope("email");

	try {
		const result = await signInWithPopup(
			FirebaseClient.getAuth(),
			provider
		);

		console.log("result", result);
		const credentials = FacebookAuthProvider.credentialFromResult(result);
		console.log("credentials", credentials);
	} catch (error: any) {
		console.log({error});
		console.log(error.credential);
	}
}

export async function signInWithApplePopUp() {
	const provider = new OAuthProvider('apple.com');
	provider.addScope("email");

	try {
		const result = await signInWithPopup(
			FirebaseClient.getAuth(),
			provider
		);

		console.log("result", result);
		const credentials = OAuthProvider.credentialFromResult(result);
		console.log("credentials", credentials);
	} catch (error: any) {
		console.log({error});
		console.log(error.credential);
	}
}
