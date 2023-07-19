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
import { AppleCredentials } from "./useCredentialManager";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

export function AppleCredTab() {
	const {
		addAppleCredential,
		globalCredentials,
		deleteCredential,
		editCredential,
	} = useGlobalContext();
	const [isOpenCreate, setIsOpenCreate] = useState(false);
	const [credNameCreate, setCredNameCreate] = useState("");
	const [credClientIdCreate, setCredClientIdCreate] = useState("");
	const [credScopesCreate, setCredScopesCreate] = useState("");
	const [credRedirectUrlCreate, setCredRedirectUrlCreate] = useState("");

	const [isOpenEdit, setIsOpenEdit] = useState(false);
	const [credNameEdit, setCredNameEdit] = useState("");
	const [credClientIdEdit, setCredClientIdEdit] = useState("");
	const [credScopesEdit, setCredScopesEdit] = useState("");
	const [credRedirectUrlEdit, setCredRedirectUrlEdit] = useState("");
	const [credEditId, setCredEditId] = useState("");

	const closeModalCreate = () => {
		setIsOpenCreate(false);
		setCredNameCreate("");
		setCredClientIdCreate("");
		setCredScopesCreate("");
		setCredRedirectUrlCreate("");
	};

	const closeModalEdit = () => {
		setIsOpenEdit(false);
		setCredNameEdit("");
		setCredClientIdEdit("");
		setCredScopesEdit("");
		setCredRedirectUrlEdit("");
	};

	const handleEditCredential = (cred: AppleCredentials) => {
		setIsOpenEdit(true);
		setCredNameEdit(cred.name);
		setCredClientIdEdit(cred.clientId);
		setCredScopesEdit(cred.scopes);
		setCredRedirectUrlEdit(cred.redirectURL);
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
				<Text fontWeight="bold">Apple credentials</Text>
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
				{globalCredentials.apple.map((cred) => (
					<ListItem
						key={cred.id.toString() + cred.clientId + cred.name}
						mt="1rem"
					>
						<Stack flexDir="row" alignItems="center" spacing={3}>
							<Button
								colorScheme="red"
								onClick={() => {
									deleteCredential("apple", cred.id);
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
					<ModalHeader>Add Apple credential</ModalHeader>
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

							<InputGroup>
								<InputLeftAddon>scopes</InputLeftAddon>
								<Input
									value={credScopesCreate}
									onChange={(e) =>
										setCredScopesCreate(e.target.value)
									}
								/>
							</InputGroup>

							<InputGroup>
								<InputLeftAddon>redirect URL</InputLeftAddon>
								<Input
									value={credRedirectUrlCreate}
									onChange={(e) =>
										setCredRedirectUrlCreate(e.target.value)
									}
								/>
							</InputGroup>

							<Button
								ml="auto"
								display="block"
								colorScheme="teal"
								onClick={() => {
									addAppleCredential({
										name: credNameCreate,
										clientId: credClientIdCreate,
										scopes: credScopesCreate,
										redirectURL: credRedirectUrlCreate
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

							<InputGroup>
								<InputLeftAddon>scopes</InputLeftAddon>
								<Input
									value={credScopesEdit}
									onChange={(e) =>
										setCredScopesEdit(e.target.value)
									}
								/>
							</InputGroup>

							<InputGroup>
								<InputLeftAddon>redirect URL</InputLeftAddon>
								<Input
									value={credRedirectUrlEdit}
									onChange={(e) =>
										setCredRedirectUrlEdit(e.target.value)
									}
								/>
							</InputGroup>

							<Button
								ml="auto"
								display="block"
								colorScheme="teal"
								onClick={() => {
									editCredential("apple", credEditId, {
										clientId: credClientIdEdit,
										name: credNameEdit,
										id: credEditId,
										scopes: credScopesEdit,
										redirectURL: credRedirectUrlEdit
									} as AppleCredentials);
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
