/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
	Box,
	Button,
	Link,
	List,
	ListIcon,
	ListItem,
	Select,
	Stack,
	Text,
	useColorMode,
} from "@chakra-ui/react";
import { Link as RouterDomLink, useLocation } from "react-router-dom";
import { ReactNode, useEffect, useMemo } from "react";
import { Menu, menu } from "../../constants/menu";
import { PiDotOutlineLight } from "react-icons/pi";
import { CurrentCredential, useGlobalContext } from "../../context/context";
import { FaSun } from "react-icons/fa";
import { MdDarkMode } from "react-icons/md";

type Props = {
	children: ReactNode;
};

function SideBar({ children }: Props) {
	return (
		<Box
			sx={{
				borderRight: "1px solid #c4c4c439",
				boxShadow: "0 22px 10px rgba(0,0,0,0.1)",
				width: "400px",
				padding: "2rem",
			}}
		>
			{children}
		</Box>
	);
}

function PageContent({ children }: Props) {
	return (
		<Box
			sx={{
				padding: "2rem",
				flex: 1,
			}}
		>
			{children}
		</Box>
	);
}

export function MenuItem({
	title,
	path,
	deph = 0,
}: {
	path: string;
	title: string;
	deph?: number;
}) {
	const currentPath = useLocation().pathname;
	return (
		<ListItem ml={`${deph * 1.5}rem`} key={path}>
			<Link
				as={RouterDomLink}
				to={path}
				sx={{
					fontWeight: path === currentPath ? "bold" : "normal",
					fontSize: path === currentPath ? "1.1rem" : "1rem",
				}}
			>
				{title} {path === currentPath && " 👈"}
			</Link>
		</ListItem>
	);
}

const SideBarContent = ({
	receivedMenu,
	deph = 1,
}: {
	receivedMenu: Menu[];
	deph?: number;
}) => {
	if (!receivedMenu) return null;
	return (
		<List spacing={3}>
			{receivedMenu.map((item) => {
				if (item.type === "section") {
					return (
						<List spacing={3} key={item.title}>
							<ListItem>
								<ListIcon as={PiDotOutlineLight} />
								{item.title}
							</ListItem>

							{item.children && (
								<SideBarContent
									receivedMenu={item.children}
									deph={deph + 1}
								/>
							)}
						</List>
					);
				} else {
					return (
						<MenuItem
							path={item.path || "/"}
							title={item.title}
							deph={deph}
							key={item.title}
						/>
					);
				}
			})}
		</List>
	);
};

function Header() {
	const { currentCredential, setCurrentCredential, globalCredentials } =
		useGlobalContext();

	const { toggleColorMode, colorMode } = useColorMode();

	const path = useLocation().pathname;

	const availableCreds = useMemo(() => {
		if (path === "/sdk-login/facebook") {
			return globalCredentials.facebook;
		}
		if (path === "/sdk-login/google") {
			return globalCredentials.google;
		}
		if (path === "/sdk-login/apple") {
			return globalCredentials.apple;
		}
		if (path === "/firebase-login") {
			return globalCredentials.firebase;
		}
		return [];
	}, [path, globalCredentials]);

	useEffect(() => {
		if (!availableCreds.length) {
			setCurrentCredential(undefined);
		} else {
			setCurrentCredential(availableCreds[0] as CurrentCredential);
		}
	}, [availableCreds, setCurrentCredential]);

	function setCredential(credAsJSON: string) {
		if (!credAsJSON || credAsJSON === "") {
			setCurrentCredential(undefined);
			return;
		}
		const cred = JSON.parse(credAsJSON);
		setCurrentCredential(cred as CurrentCredential);
	}

	return (
		<Stack
			flexDir="row"
			alignItems="center"
			justifyContent="space-between"
			width="100vw"
			boxShadow="0 5px 10px rgba(0,0,0,0.1)"
			height="70px"
			padding="1rem"
		>
			<Box flexDir="row" alignItems="center" display="flex" gap="2rem">
				{!currentCredential && (
					<Text fontWeight="bold" fontSize="md">
						Credencial atual: nenhuma
					</Text>
				)}
				{currentCredential && (
					<Text fontWeight="bold" fontSize="md">
						Credencial atual: {currentCredential.name}
					</Text>
				)}
				<Select
					placeholder="Select option"
					w="fit-content"
					value={
						currentCredential
							? JSON.stringify(currentCredential)
							: ""
					}
					fontSize="md"
					onChange={(e) => setCredential(e.target.value)}
					p={0}
				>
					{availableCreds.map((cred) => {
						return (
							<option value={JSON.stringify(cred)} key={cred.id}>
								{cred.name}
							</option>
						);
					})}
				</Select>
			</Box>
			<Box>
				<Button
					onClick={() => {
						toggleColorMode();
					}}
					mr={4}
					borderRadius="100%"
				>
					{colorMode === "light" ? <MdDarkMode /> : <FaSun />}
				</Button>
			</Box>
		</Stack>
	);
}

export function PageWrapper({ children }: Props) {
	return (
		<Box height="100vh">
			<Header />
			<Box display="flex" flexDir="row" height="100%">
				<SideBar>
					<SideBarContent receivedMenu={menu} />
				</SideBar>
				<PageContent>{children}</PageContent>
			</Box>
		</Box>
	);
}
