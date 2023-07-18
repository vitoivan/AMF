/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Box, Button, Stack, Text } from "@chakra-ui/react";
import { PageWrapper } from "../../components/PageWrapper/PageWrapper";
import { FacebookSDK } from "./facebook";
import { useGlobalContext } from "../../context/context";
import { FacebookCredentials } from "../CredentialManager/useCredentialManager";

function Title() {
	return (
		<Text fontSize="3xl" textAlign="center" mt={5}>
			Login usando o SDK do Facebook
		</Text>
	);
}

function FacebookLogin() {
	const { currentCredential } = useGlobalContext();

	const credentialIsValid = () => {
		const cred = currentCredential as FacebookCredentials;
		if (cred && cred.appId && cred.appId !== "") {
			return true;
		}
		return false;
	};

	async function login() {
		if (credentialIsValid()) {
			const cred = currentCredential as FacebookCredentials;
			if (await isConnected()) {
				await FacebookSDK.logout();
			}
			await FacebookSDK.init(cred.appId);
			const loginResponse = await FacebookSDK.login();
			console.log("loginResponse", loginResponse);
		} else {
			console.error("App ID ou credencial invalida");
		}
	}

	async function isConnected() {
		const fbLoginStatus = await FacebookSDK.getLoginStatus();
		console.log("fbLoginStatus", fbLoginStatus);
		if (fbLoginStatus.status === "connected") {
			return true;
		}
		return false;
	}

	return (
		<Stack spacing={3} mt={16}>
			<Button onClick={() => login()} width="fit-content">
				Login com facebook dialog
			</Button>
		</Stack>
	);
}

export function FacebookSDKLoginComponent() {
	return (
		<Box>
			<PageWrapper>
				<Title />
				<FacebookLogin />
			</PageWrapper>
		</Box>
	);
}
