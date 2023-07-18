import { Box, Text } from "@chakra-ui/react";
import { PageWrapper } from "../../components/PageWrapper/PageWrapper";
import { FirebaseLoginSDKComponent } from "../../components/Firebase/Firebase";

function Title() {
	return (
		<Text fontSize="4xl" textAlign="center" mt={5}>
			Login usando o SDK do firebase
		</Text>
	);
}

export function FirebaseLogin() {
	return (
		<Box>
			<PageWrapper>
				<Title />
				<FirebaseLoginSDKComponent />
			</PageWrapper>
		</Box>
	);
}
