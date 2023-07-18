/* eslint-disable @typescript-eslint/unbound-method */
import { useState } from "react";
import { useGlobalContext } from "../../context/context";
import { FacebookCredentials } from "./useCredentialManager";
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
	ModalHeader,
	ModalOverlay,
	Stack,
	TabPanel,
	Text,
} from "@chakra-ui/react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

export function FacebookCredTab() {
	const {
		addFacebookCredential,
		globalCredentials,
		deleteCredential,
		editCredential,
	} = useGlobalContext();
	const [isOpenCreateCred, setIsOpenCreateCred] = useState(false);
	const [appIdValueCreateCred, setAppIdValueCreateCred] = useState("");
	const [credNameCreateCred, setCredNameCreateCred] = useState("");
	const [isOpenEditCred, setIsOpenEditCred] = useState(false);
	const [appIdValueEditCred, setAppIdValueEditCred] = useState("");
	const [credNameEditCred, setCredNameEditCred] = useState("");
	const [editCredId, setEditCredId] = useState("");

	const closeCreateCred = () => {
		setIsOpenCreateCred(false);
		setAppIdValueCreateCred("");
		setCredNameCreateCred("");
	};
	const closeEditCred = () => {
		setIsOpenEditCred(false);
		setAppIdValueEditCred("");
		setCredNameEditCred("");
	};

	const handleEditCredential = (cred: FacebookCredentials) => {
		setIsOpenEditCred(true);
		setAppIdValueEditCred(cred.appId);
		setCredNameEditCred(cred.name);
		setEditCredId(cred.id);
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
						setIsOpenCreateCred(true);
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
								<AiFillDelete />
							</Button>
							<Text>{cred.name}</Text>
							<Button
								colorScheme="blue"
								onClick={() => {
									handleEditCredential(cred);
								}}
							>
								<AiFillEdit />
							</Button>
						</Stack>
					</ListItem>
				))}
			</List>

			<Modal
				isOpen={isOpenCreateCred}
				onClose={() => {
					closeCreateCred();
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
									value={appIdValueCreateCred}
									onChange={(e) =>
										setAppIdValueCreateCred(e.target.value)
									}
								/>
							</InputGroup>
							<InputGroup>
								<InputLeftAddon>credential name</InputLeftAddon>
								<Input
									value={credNameCreateCred}
									onChange={(e) =>
										setCredNameCreateCred(e.target.value)
									}
								/>
							</InputGroup>

							<Button
								ml="auto"
								display="block"
								colorScheme="teal"
								onClick={() => {
									addFacebookCredential({
										appId: appIdValueCreateCred,
										name: credNameCreateCred,
									});
									closeCreateCred();
								}}
							>
								Add
							</Button>
						</Stack>
					</ModalBody>
				</ModalContent>
			</Modal>

			<Modal
				isOpen={isOpenEditCred}
				onClose={() => {
					closeEditCred();
				}}
				size="xl"
			>
				<ModalOverlay />
				<ModalContent p="1rem">
					<ModalHeader>Edit credential</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Stack spacing={4}>
							<InputGroup>
								<InputLeftAddon>appId</InputLeftAddon>
								<Input
									value={appIdValueEditCred}
									onChange={(e) =>
										setAppIdValueEditCred(e.target.value)
									}
								/>
							</InputGroup>
							<InputGroup>
								<InputLeftAddon>credential name</InputLeftAddon>
								<Input
									value={credNameEditCred}
									onChange={(e) =>
										setCredNameEditCred(e.target.value)
									}
								/>
							</InputGroup>

							<Button
								ml="auto"
								display="block"
								colorScheme="teal"
								onClick={() => {
									editCredential("facebook", editCredId, {
										appId: appIdValueEditCred,
										name: credNameEditCred,
									});
									closeEditCred();
								}}
							>
								Save
							</Button>
						</Stack>
					</ModalBody>
				</ModalContent>
			</Modal>
		</TabPanel>
	);
}
