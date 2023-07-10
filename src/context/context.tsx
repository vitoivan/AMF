/* eslint-disable no-mixed-spaces-and-tabs */
import { FirebaseOptions } from "firebase/app";
import { ReactNode, createContext, useContext, useState } from "react";

export type GlobalContext = {
	credentials: FirebaseOptions;
	onChangeCrentials(data: Partial<FirebaseOptions>): void;
	tenantId?: string;
	setTenantId(tenantId: string): void;
	endpoint?: string;
	setEndpoint(tenantId: string): void;
	saveContext(): void;
	resetContext(): void;
};

const ctx = createContext<GlobalContext>({} as GlobalContext);

type Props = {
	children: ReactNode;
};

export const Provider = ({ children }: Props) => {
	const initialCredentials = localStorage.getItem("credentials")
		? (JSON.parse(
				localStorage.getItem("credentials") as string
		  ) as FirebaseOptions)
		: ({} as FirebaseOptions);

	const initialTenantId = localStorage.getItem("tenantId")
		? (localStorage.getItem("tenantId") as string)
		: undefined;
	const initialEndpoint = localStorage.getItem("endpoint")
		? (localStorage.getItem("endpoint") as string)
		: undefined;

	const [credentials, setCredentials] =
		useState<FirebaseOptions>(initialCredentials);

	const [tenantId, setTenantId] = useState<string | undefined>(
		initialTenantId
	);
	const [endpoint, setEndpoint] = useState<string>(initialEndpoint || "");

	const onChangeCrentials = (data: Partial<FirebaseOptions>) => {
		setCredentials({ ...credentials, ...data });
	};

	const saveContext = () => {
		localStorage.setItem("tenantId", tenantId || "");
		localStorage.setItem("endpoint", endpoint);
		localStorage.setItem("credentials", JSON.stringify(credentials));
	};

	const resetContext = () => {
		setTenantId("");
		setEndpoint("");
		setCredentials({} as FirebaseOptions);
		localStorage.removeItem("tenantId");
		localStorage.removeItem("endpoint");
		localStorage.removeItem("credentials");
	};

	return (
		<ctx.Provider
			value={{
				credentials,
				onChangeCrentials,
				saveContext,
				setTenantId,
				tenantId,
				endpoint,
				setEndpoint,
				resetContext,
			}}
		>
			{children}
		</ctx.Provider>
	);
};

export const useGlobalContext = () => useContext(ctx);
