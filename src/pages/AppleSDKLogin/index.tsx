/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Box, Text } from "@chakra-ui/react";
import { PageWrapper } from "../../components/PageWrapper/PageWrapper";

function Title() {
	return (
		<Text fontSize="3xl" textAlign="center" mt={5}>
			Login usando o SDK da Apple
		</Text>
	);
}

export function AppleSDKLoginComponent() {
	return (
		<Box>
			<PageWrapper>
				<Title />
			</PageWrapper>
		</Box>
	);
}
