/* eslint-disable @typescript-eslint/no-floating-promises */
import { Button, Stack, Text } from "@chakra-ui/react";
import {
	signInWithApplePopUp,
	signInWithFacebookPopUp,
	signInWithGooglePopUp,
} from "../../firebase/sign-in";
import { useGlobalContext } from "../../context/context";
import { FirebaseClient } from "../../firebase/setup";
import {
	AiFillGoogleCircle,
	AiFillFacebook,
	AiFillApple,
} from "react-icons/ai";
import { FirebaseCredentials } from "../../pages/CredentialManager/useCredentialManager";
import { useMemo } from "react";

export function FirebaseLoginSDKComponent() {
	const { currentCredential } = useGlobalContext();

	const credential = currentCredential as FirebaseCredentials;

	const credentialIsValid = useMemo(() => {
		if (credential && credential.apiKey && credential.authDomain) {
			return true;
		}
		return false;
	}, [credential]);

	const handleGoogleLogin = async () => {
		if (credentialIsValid) {
			FirebaseClient.init(
				{
					apiKey: credential.apiKey,
					authDomain: credential.authDomain,
					...(credential.projectId
						? { projectId: credential.projectId }
						: {}),
				},
				credential.tenantId
			);
			await signInWithGooglePopUp();
		} else {
			console.error("App ID ou credencial invalida");
		}
	};

	const handleFacebookLogin = async () => {
		if (credentialIsValid) {
			FirebaseClient.init(
				{
					apiKey: credential.apiKey,
					authDomain: credential.authDomain,
					...(credential.projectId
						? { projectId: credential.projectId }
						: {}),
				},
				credential.tenantId
			);
			await signInWithFacebookPopUp();
		} else {
			console.error("App ID ou credencial invalida");
		}
	};

	const handleAppleLogin = async () => {
		if (credentialIsValid) {
			FirebaseClient.init(
				{
					apiKey: credential.apiKey,
					authDomain: credential.authDomain,
					...(credential.projectId
						? { projectId: credential.projectId }
						: {}),
				},
				credential.tenantId
			);
			await signInWithApplePopUp();
		} else {
			console.error("App ID ou credencial invalida");
		}
	};

	return (
		<Stack spacing={4} flexDir="row" mt={16}>
			<Button
				colorScheme="teal"
				w="fit-content"
				onClick={() => {
					handleGoogleLogin();
				}}
			>
				<Text
					fontSize="md"
					display="flex"
					alignItems="center"
					justifyContent="center"
					gap={2}
				>
					<AiFillGoogleCircle />
					Google
				</Text>
			</Button>
			<Button
				colorScheme="teal"
				w="fit-content"
				onClick={() => {
					handleFacebookLogin();
				}}
			>
				<Text
					fontSize="md"
					display="flex"
					alignItems="center"
					justifyContent="center"
					gap={2}
				>
					<AiFillFacebook />
					Facebook
				</Text>
			</Button>
			<Button
				colorScheme="teal"
				w="fit-content"
				onClick={() => {
					handleAppleLogin();
				}}
			>
				<Text
					fontSize="md"
					display="flex"
					alignItems="center"
					justifyContent="center"
					gap={2}
				>
					<AiFillApple />
					Apple
				</Text>
			</Button>
		</Stack>
	);
}
