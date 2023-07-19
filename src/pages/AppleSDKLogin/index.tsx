/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Box, Stack, Text } from "@chakra-ui/react";
import { PageWrapper } from "../../components/PageWrapper/PageWrapper";
import { AppleCredentials } from "../CredentialManager/useCredentialManager";
import { AppleSDK } from "./apple";
import { useGlobalContext } from "../../context/context";
import { useEffect } from "react";

function Title() {
	return (
		<Text fontSize="3xl" textAlign="center" mt={5}>
			Login usando o SDK da Apple
		</Text>
	);
}

export function AppleSDKLogin() {
	const { currentCredential } = useGlobalContext();

	useEffect(() => {
		const validateCredential = () => {
			const cred = currentCredential as AppleCredentials;
			if (cred && cred.clientId && cred.clientId !== "") {
				return true;
			}
			return false;
		};
		if (validateCredential()) {
			const cred = currentCredential as AppleCredentials;
			AppleSDK.init(cred.clientId, cred.scopes, cred.redirectURL);
		} else {
			const btn = document.getElementById("appleid-signin");
			if (btn) {
				btn.innerHTML = "";
			}
			return;
		}
	}, [currentCredential]);

	return (
		<Stack spacing={3} mt={16}>
			<Box onClick={() => AppleSDK.login()} id="appleid-signin" ml={4} width={"210px"} height={"40px"} data-color="black" data-border="true" data-type="sign in"></Box>
			{!currentCredential && (
				<Text fontWeight="bold" fontSize="md">
					O botão de login da Apple não será renderizado pois não há
					credencial válida
				</Text>
			)}
		</Stack>
	);
}

export function AppleSDKLoginComponent() {
	return (
		<Box>
			<PageWrapper>
				<Title />
				<AppleSDKLogin />
			</PageWrapper>
		</Box>
	);
}
