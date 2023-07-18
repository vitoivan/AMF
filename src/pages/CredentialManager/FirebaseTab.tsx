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
import { FirebaseCredentials } from "./useCredentialManager";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

export function FirebaseCredTab() {
	const {
		addFirebaseCredential,
		globalCredentials,
		deleteCredential,
		editCredential,
	} = useGlobalContext();
	const [isOpenCreate, setIsOpenCreate] = useState(false);
	const [credNameCreate, setCredNameCreate] = useState("");
	const [credApiKeyCreate, setCredApiKeyCreate] = useState("");
	const [credAuthDomainCreate, setCredAuthDomainCreate] = useState("");
	const [credProjectIdCreate, setCredProjectIdCreate] = useState("");
	const [credTenantIdCreate, setCredTenantIdCreate] = useState("");

	const [isOpenEdit, setIsOpenEdit] = useState(false);
	const [credNameEdit, setCredNameEdit] = useState("");
	const [credApiKeyEdit, setCredApiKeyEdit] = useState("");
	const [credAuthDomainEdit, setCredAuthDomainEdit] = useState("");
	const [credProjectIdEdit, setCredProjectIdEdit] = useState("");
	const [credTenantIdEdit, setCredTenantIdEdit] = useState<
		string | undefined
	>("");
	const [editCredId, setEditCredId] = useState("");

	const closeModalCreate = () => {
		setIsOpenCreate(false);
		setCredNameCreate("");
		setCredApiKeyCreate("");
		setCredAuthDomainCreate("");
		setCredProjectIdCreate("");
		setCredTenantIdCreate("");
		setCredAuthDomainCreate("");
	};

	const closeModalEdit = () => {
		setIsOpenEdit(false);
		setCredNameEdit("");
		setCredApiKeyEdit("");
		setCredAuthDomainEdit("");
		setCredProjectIdEdit("");
		setCredTenantIdEdit("");
	};

	const handleEditCredential = (cred: FirebaseCredentials) => {
		setIsOpenEdit(true);
		setEditCredId(cred.id);
		setCredNameEdit(cred.name);
		setCredApiKeyEdit(cred.apiKey);
		setCredAuthDomainEdit(cred.authDomain);
		setCredProjectIdEdit(cred.projectId);
		setCredTenantIdEdit(cred.tenantId);
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
						setIsOpenCreate(true);
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
								<InputLeftAddon>apiKey</InputLeftAddon>
								<Input
									value={credApiKeyCreate}
									onChange={(e) =>
										setCredApiKeyCreate(e.target.value)
									}
								/>
							</InputGroup>
							<InputGroup>
								<InputLeftAddon>auth domain</InputLeftAddon>
								<Input
									value={credAuthDomainCreate}
									onChange={(e) =>
										setCredAuthDomainCreate(e.target.value)
									}
								/>
							</InputGroup>
							<InputGroup>
								<InputLeftAddon>projectId</InputLeftAddon>
								<Input
									value={credProjectIdCreate}
									onChange={(e) =>
										setCredProjectIdCreate(e.target.value)
									}
								/>
							</InputGroup>
							<InputGroup>
								<InputLeftAddon>tenantId</InputLeftAddon>
								<Input
									value={credTenantIdCreate}
									onChange={(e) =>
										setCredTenantIdCreate(e.target.value)
									}
								/>
							</InputGroup>

							<Button
								ml="auto"
								display="block"
								colorScheme="teal"
								onClick={() => {
									addFirebaseCredential({
										name: credNameCreate,
										apiKey: credApiKeyCreate,
										authDomain: credAuthDomainCreate,
										projectId: credProjectIdCreate,
										tenantId: credTenantIdCreate,
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
								<InputLeftAddon>apiKey</InputLeftAddon>
								<Input
									value={credApiKeyEdit}
									onChange={(e) =>
										setCredApiKeyEdit(e.target.value)
									}
								/>
							</InputGroup>
							<InputGroup>
								<InputLeftAddon>auth domain</InputLeftAddon>
								<Input
									value={credAuthDomainEdit}
									onChange={(e) =>
										setCredAuthDomainEdit(e.target.value)
									}
								/>
							</InputGroup>
							<InputGroup>
								<InputLeftAddon>projectId</InputLeftAddon>
								<Input
									value={credProjectIdEdit}
									onChange={(e) =>
										setCredProjectIdEdit(e.target.value)
									}
								/>
							</InputGroup>
							<InputGroup>
								<InputLeftAddon>tenantId</InputLeftAddon>
								<Input
									value={credTenantIdEdit || ""}
									onChange={(e) =>
										setCredTenantIdEdit(e.target.value)
									}
								/>
							</InputGroup>

							<Button
								ml="auto"
								display="block"
								colorScheme="teal"
								onClick={() => {
									editCredential("firebase", editCredId, {
										apiKey: credApiKeyEdit,
										authDomain: credAuthDomainEdit,
										name: credNameEdit,
										projectId: credProjectIdEdit,
										tenantId: credTenantIdEdit,
									} as FirebaseCredentials);
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
