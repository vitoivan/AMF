/* eslint-disable @typescript-eslint/unbound-method */
import {
	Box,
	Button,
	Input,
	InputGroup,
	InputLeftAddon,
	List,
	ListItem,
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
	TabPanel,
	TabPanels,
	Tabs,
	Text,
	Textarea,
} from "@chakra-ui/react";
import { PageWrapper } from "../../components/PageWrapper/PageWrapper";
import { useGlobalContext } from "../../context/context";
import { useState } from "react";

function Title() {
	return (
		<Text fontSize="4xl" textAlign="center" mt={5}>
			Gerenciador de credenciais
		</Text>
	);
}

function GoogleCredTab() {
	const { addGoogleCredential, globalCredentials, deleteCredential } =
		useGlobalContext();
	const [isOpen, setIsOpen] = useState(false);
	const [credName, setCredName] = useState("");
	const [credClientId, setCredClientId] = useState("");

	const closeModal = () => {
		setIsOpen(false);
		setCredName("");
		setCredClientId("");
	};

	return (
		<TabPanel>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					gap: "4rem",
				}}
			>
				<Text fontWeight="bold">Google credentials</Text>
				<Button
					colorScheme="teal"
					onClick={() => {
						setIsOpen(true);
					}}
				>
					+
				</Button>
			</Box>

			<List>
				{globalCredentials.google.map((cred) => (
					<ListItem
						key={cred.id.toString() + cred.clientId + cred.name}
						mt="1rem"
					>
						<Stack flexDir="row" alignItems="center" spacing={3}>
							<Button
								colorScheme="red"
								onClick={() => {
									deleteCredential("google", cred.id);
								}}
							>
								-
							</Button>
							<Text>{cred.name}</Text>
						</Stack>
					</ListItem>
				))}
			</List>

			<Modal
				isOpen={isOpen}
				onClose={() => {
					closeModal();
				}}
				size="xl"
			>
				<ModalOverlay />
				<ModalContent p="1rem">
					<ModalHeader>Add facebook credential</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Stack spacing={4}>
							<InputGroup>
								<InputLeftAddon>credential name</InputLeftAddon>
								<Input
									value={credName}
									onChange={(e) =>
										setCredName(e.target.value)
									}
								/>
							</InputGroup>
							<InputGroup>
								<InputLeftAddon>clientId</InputLeftAddon>
								<Input
									value={credClientId}
									onChange={(e) =>
										setCredClientId(e.target.value)
									}
								/>
							</InputGroup>

							<Button
								ml="auto"
								display="block"
								colorScheme="teal"
								onClick={() => {
									addGoogleCredential({
										name: credName,
										clientId: credClientId,
									});
									closeModal();
								}}
							>
								Add
							</Button>
						</Stack>
					</ModalBody>
				</ModalContent>
			</Modal>
		</TabPanel>
	);
}

function FirebaseCredTab() {
	const { addFirebaseCredential, globalCredentials, deleteCredential } =
		useGlobalContext();
	const [isOpen, setIsOpen] = useState(false);
	const [credName, setCredName] = useState("");
	const [credApiKey, setCredApiKey] = useState("");
	const [credAuthDomain, setCredAuthDomain] = useState("");
	const [credProjectId, setCredProjectId] = useState("");
	const [credTenantId, setCredTenantId] = useState("");

	const closeModal = () => {
		setIsOpen(false);
		setCredName("");
		setCredApiKey("");
		setCredAuthDomain("");
		setCredProjectId("");
		setCredTenantId("");
		setCredAuthDomain("");
	};

	return (
		<TabPanel>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					gap: "4rem",
				}}
			>
				<Text fontWeight="bold">Firebase credentials</Text>
				<Button
					colorScheme="teal"
					onClick={() => {
						setIsOpen(true);
					}}
				>
					+
				</Button>
			</Box>

			<List>
				{globalCredentials.firebase.map((cred) => (
					<ListItem
						key={cred.id.toString() + cred.apiKey + cred.name}
						mt="1rem"
					>
						<Stack flexDir="row" alignItems="center" spacing={3}>
							<Button
								colorScheme="red"
								onClick={() => {
									deleteCredential("firebase", cred.id);
								}}
							>
								-
							</Button>
							<Text>{cred.name}</Text>
						</Stack>
					</ListItem>
				))}
			</List>

			<Modal
				isOpen={isOpen}
				onClose={() => {
					closeModal();
				}}
				size="xl"
			>
				<ModalOverlay />
				<ModalContent p="1rem">
					<ModalHeader>Add facebook credential</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Stack spacing={4}>
							<InputGroup>
								<InputLeftAddon>credential name</InputLeftAddon>
								<Input
									value={credName}
									onChange={(e) =>
										setCredName(e.target.value)
									}
								/>
							</InputGroup>
							<InputGroup>
								<InputLeftAddon>apiKey</InputLeftAddon>
								<Input
									value={credApiKey}
									onChange={(e) =>
										setCredApiKey(e.target.value)
									}
								/>
							</InputGroup>
							<InputGroup>
								<InputLeftAddon>auth domain</InputLeftAddon>
								<Input
									value={credAuthDomain}
									onChange={(e) =>
										setCredAuthDomain(e.target.value)
									}
								/>
							</InputGroup>
							<InputGroup>
								<InputLeftAddon>projectId</InputLeftAddon>
								<Input
									value={credProjectId}
									onChange={(e) =>
										setCredProjectId(e.target.value)
									}
								/>
							</InputGroup>
							<InputGroup>
								<InputLeftAddon>tenantId</InputLeftAddon>
								<Input
									value={credTenantId}
									onChange={(e) =>
										setCredTenantId(e.target.value)
									}
								/>
							</InputGroup>

							<Button
								ml="auto"
								display="block"
								colorScheme="teal"
								onClick={() => {
									addFirebaseCredential({
										name: credName,
										apiKey: credApiKey,
										authDomain: credAuthDomain,
										projectId: credProjectId,
										tenantId: credTenantId,
									});
									closeModal();
								}}
							>
								Add
							</Button>
						</Stack>
					</ModalBody>
				</ModalContent>
			</Modal>
		</TabPanel>
	);
}

function FacebookCredTab() {
	const { addFacebookCredential, globalCredentials, deleteCredential } =
		useGlobalContext();
	const [isOpen, setIsOpen] = useState(false);
	const [appIdValue, setAppIdValue] = useState("");
	const [credName, setCredName] = useState("");

	const closeModal = () => {
		setIsOpen(false);
		setAppIdValue("");
		setCredName("");
	};

	return (
		<TabPanel>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					gap: "4rem",
				}}
			>
				<Text fontWeight="bold">Facebook credentials</Text>
				<Button
					colorScheme="teal"
					onClick={() => {
						setIsOpen(true);
					}}
				>
					+
				</Button>
			</Box>
			<List>
				{globalCredentials.facebook.map((cred) => (
					<ListItem
						key={cred.id.toString() + cred.appId + cred.name}
						mt="1rem"
					>
						<Stack flexDir="row" alignItems="center" spacing={3}>
							<Button
								colorScheme="red"
								onClick={() => {
									deleteCredential("facebook", cred.id);
								}}
							>
								-
							</Button>
							<Text>{cred.name}</Text>
						</Stack>
					</ListItem>
				))}
			</List>

			<Modal
				isOpen={isOpen}
				onClose={() => {
					closeModal();
				}}
				size="xl"
			>
				<ModalOverlay />
				<ModalContent p="1rem">
					<ModalHeader>Add facebook credential</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Stack spacing={4}>
							<InputGroup>
								<InputLeftAddon>appId</InputLeftAddon>
								<Input
									value={appIdValue}
									onChange={(e) =>
										setAppIdValue(e.target.value)
									}
								/>
							</InputGroup>
							<InputGroup>
								<InputLeftAddon>credential name</InputLeftAddon>
								<Input
									value={credName}
									onChange={(e) =>
										setCredName(e.target.value)
									}
								/>
							</InputGroup>

							<Button
								ml="auto"
								display="block"
								colorScheme="teal"
								onClick={() => {
									addFacebookCredential({
										appId: appIdValue,
										name: credName,
									});
									closeModal();
								}}
							>
								Add
							</Button>
						</Stack>
					</ModalBody>
				</ModalContent>
			</Modal>
		</TabPanel>
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
					<Tab>Facebook</Tab>
					<Tab>Google</Tab>
					<Tab>Firebase</Tab>
				</TabList>
				<TabPanels>
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
