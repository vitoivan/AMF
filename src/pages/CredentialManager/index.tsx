/* eslint-disable @typescript-eslint/unbound-method */
import {
	Box,
	Button,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Stack,
	Tab,
	TabList,
	TabPanels,
	Tabs,
	Text,
	Textarea,
} from "@chakra-ui/react";
import { PageWrapper } from "../../components/PageWrapper/PageWrapper";
import { useGlobalContext } from "../../context/context";
import { useState } from "react";
import { FacebookCredTab } from "./FacebookTab";
import { FirebaseCredTab } from "./FirebaseTab";
import { GoogleCredTab } from "./GoogleTab";
import { AppleCredTab } from "./AppleTab";

function Title() {
	return (
		<Text fontSize="4xl" textAlign="center" mt={5}>
			Gerenciador de credenciais
		</Text>
	);
}

function ImportCredentials() {
	const { importCredentials } = useGlobalContext();
	const [isOpen, setIsOpen] = useState(false);
	const [credJSON, setCredJSON] = useState("");

	const closeModal = () => {
		setIsOpen(false);
		setCredJSON("");
	};

	return (
		<>
			<Button
				colorScheme="teal"
				onClick={() => setIsOpen(true)}
				w="fit-content"
			>
				Import credentials
			</Button>
			<Modal
				isOpen={isOpen}
				onClose={() => {
					closeModal();
				}}
				size="xl"
			>
				<ModalOverlay />
				<ModalContent p="1rem">
					<ModalHeader>Import credentials</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Textarea
							placeholder="put credentials JSON here"
							size="sm"
							resize="vertical"
							onChange={(e) => setCredJSON(e.target.value)}
							minH={400}
						/>
						<Stack spacing={4}>
							<Button
								ml="auto"
								mt="2rem"
								display="block"
								colorScheme="teal"
								onClick={() => {
									importCredentials(credJSON);
									closeModal();
								}}
							>
								import
							</Button>
						</Stack>
					</ModalBody>
					<ModalFooter justifyContent="center">
						<Text fontSize="sm" textAlign="center" opacity={0.5}>
							The imported credentials will be added, but the old
							ones will not be deleted
						</Text>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}

function CredManager() {
	const { resetCredentials, globalCredentials } = useGlobalContext();

	function exportCredentials() {
		const jsonCreds = JSON.stringify(globalCredentials, null, 2);
		const element = document.createElement("a");
		const file = new Blob([jsonCreds], { type: "text/plain" });
		element.href = URL.createObjectURL(file);
		element.download = "credentials.json";
		document.body.appendChild(element); // Required for this to work in FireFox
		element.click();
	}

	return (
		<Box mt="3rem">
			<Stack flexDir="row" ml="auto" w="fit-content">
				<ImportCredentials />

				<Button
					colorScheme="blue"
					onClick={() => {
						exportCredentials();
					}}
					ml="auto"
					display="block"
				>
					Export credentials
				</Button>
				<Button
					colorScheme="red"
					onClick={() => {
						resetCredentials();
					}}
					ml="auto"
					display="block"
				>
					Reset all credentials
				</Button>
			</Stack>

			<Tabs variant="enclosed">
				<TabList>
					<Tab>Apple</Tab>
					<Tab>Facebook</Tab>
					<Tab>Google</Tab>
					<Tab>Firebase</Tab>
				</TabList>
				<TabPanels>
					<AppleCredTab />
					<FacebookCredTab />
					<GoogleCredTab />
					<FirebaseCredTab />
				</TabPanels>
			</Tabs>
		</Box>
	);
}

export function CredentialManagerComponent() {
	return (
		<Box>
			<PageWrapper>
				<Title />
				<CredManager />
			</PageWrapper>
		</Box>
	);
}
