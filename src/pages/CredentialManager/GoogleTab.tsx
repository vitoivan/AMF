/* eslint-disable @typescript-eslint/unbound-method */
import { useState } from "react";
import { useGlobalContext } from "../../context/context";
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
import { GoogleCredentials } from "./useCredentialManager";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

export function GoogleCredTab() {
	const {
		addGoogleCredential,
		globalCredentials,
		deleteCredential,
		editCredential,
	} = useGlobalContext();
	const [isOpenCreate, setIsOpenCreate] = useState(false);
	const [credNameCreate, setCredNameCreate] = useState("");
	const [credClientIdCreate, setCredClientIdCreate] = useState("");

	const [isOpenEdit, setIsOpenEdit] = useState(false);
	const [credNameEdit, setCredNameEdit] = useState("");
	const [credClientIdEdit, setCredClientIdEdit] = useState("");
	const [credEditId, setCredEditId] = useState("");

	const closeModalCreate = () => {
		setIsOpenCreate(false);
		setCredNameCreate("");
		setCredClientIdCreate("");
	};

	const closeModalEdit = () => {
		setIsOpenEdit(false);
		setCredNameEdit("");
		setCredClientIdEdit("");
	};

	const handleEditCredential = (cred: GoogleCredentials) => {
		setIsOpenEdit(true);
		setCredNameEdit(cred.name);
		setCredClientIdEdit(cred.clientId);
		setCredEditId(cred.id);
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
						setIsOpenCreate(true);
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
				isOpen={isOpenCreate}
				onClose={() => {
					closeModalCreate();
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
									value={credNameCreate}
									onChange={(e) =>
										setCredNameCreate(e.target.value)
									}
								/>
							</InputGroup>
							<InputGroup>
								<InputLeftAddon>clientId</InputLeftAddon>
								<Input
									value={credClientIdCreate}
									onChange={(e) =>
										setCredClientIdCreate(e.target.value)
									}
								/>
							</InputGroup>

							<Button
								ml="auto"
								display="block"
								colorScheme="teal"
								onClick={() => {
									addGoogleCredential({
										name: credNameCreate,
										clientId: credClientIdCreate,
									});
									closeModalCreate();
								}}
							>
								Add
							</Button>
						</Stack>
					</ModalBody>
				</ModalContent>
			</Modal>

			<Modal
				isOpen={isOpenEdit}
				onClose={() => {
					closeModalEdit();
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
								<InputLeftAddon>credential name</InputLeftAddon>
								<Input
									value={credNameEdit}
									onChange={(e) =>
										setCredNameEdit(e.target.value)
									}
								/>
							</InputGroup>
							<InputGroup>
								<InputLeftAddon>clientId</InputLeftAddon>
								<Input
									value={credClientIdEdit}
									onChange={(e) =>
										setCredClientIdEdit(e.target.value)
									}
								/>
							</InputGroup>

							<Button
								ml="auto"
								display="block"
								colorScheme="teal"
								onClick={() => {
									editCredential("google", credEditId, {
										clientId: credClientIdEdit,
										name: credNameEdit,
										id: credEditId,
									} as GoogleCredentials);
									closeModalEdit();
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
