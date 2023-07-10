import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
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
