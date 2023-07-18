/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Box, Stack, Text } from "@chakra-ui/react";
import { PageWrapper } from "../../components/PageWrapper/PageWrapper";
import { useEffect } from "react";
import { GoogleSDK } from "./google";
import { useGlobalContext } from "../../context/context";
import { GoogleCredentials } from "../CredentialManager/useCredentialManager";

function Title() {
	return (
		<Text fontSize="3xl" textAlign="center" mt={5}>
			Login usando o SDK do Google
		</Text>
	);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function onLogin(data: any) {
	console.log("data", data);
}

function GoogleLogin() {
	const { currentCredential } = useGlobalContext();

	useEffect(() => {
		const validateCredential = () => {
			const cred = currentCredential as GoogleCredentials;
			if (cred && cred.clientId && cred.clientId !== "") {
				return true;
			}
			return false;
		};
		if (validateCredential()) {
			const cred = currentCredential as GoogleCredentials;
			GoogleSDK.init(cred.clientId, onLogin);
			GoogleSDK.renderButton();
		} else {
			const btn = document.getElementById("google-signin");
			if (btn) {
				btn.innerHTML = "";
			}
			return;
		}
	}, [currentCredential]);

	return (
		<Stack spacing={3} mt={16}>
			<Box id="google-signin" width="fit-content" ml={4}></Box>
			{!currentCredential && (
				<Text fontWeight="bold" fontSize="md">
					O botão de login do Google não será renderizado pois não há
					credencial válida
				</Text>
			)}
		</Stack>
	);
}

export function GoogleSDKLoginComponent() {
	return (
		<Box>
			<PageWrapper>
				<Title />
				<GoogleLogin />
			</PageWrapper>
		</Box>
	);
}
