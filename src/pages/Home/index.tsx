import { Box, Text } from "@chakra-ui/react";
import { PageWrapper } from "../../components/PageWrapper/PageWrapper";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Title() {
	return (
		<Text fontSize="4xl" textAlign="center" mt={5}>
			AMF
		</Text>
	);
}

export function Home() {
	// redirect to /firebase-login using react-router-dom
	const nav = useNavigate();
	useEffect(() => {
		nav("/firebase-login");
	}, [nav]);

	return (
		<Box>
			<PageWrapper>
				<Title />
			</PageWrapper>
		</Box>
	);
}
