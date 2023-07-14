/* eslint-disable @typescript-eslint/unbound-method */
import { useGlobalContext } from "../context/context";

const Credentials = () => {
	const {
		credentials,
		onChangeCrentials,
		saveContext,
		setTenantId,
		tenantId,
		endpoint,
		setEndpoint,
		resetContext,
	} = useGlobalContext();

	return (
		<div className="credentials">
			<div className="input">
				<span>Api key</span>
				<input
					type="text"
					onChange={(e) =>
						onChangeCrentials({ apiKey: e.target.value })
					}
					value={credentials.apiKey || ""}
				/>
			</div>
			<div className="input">
				<span>Auth domain</span>
				<input
					type="text"
					onChange={(e) =>
						onChangeCrentials({ authDomain: e.target.value, projectId: e.target.value?.split('.')[0] })
					}
					value={credentials.authDomain || ""}
				/>
			</div>
			<div className="input">
				<span>tenantId</span>
				<input
					type="text"
					onChange={(e) => setTenantId(e.target.value)}
					value={tenantId || ""}
				/>
			</div>
			<div className="input">
				<span>endpoint</span>
				<input
					type="text"
					onChange={(e) => setEndpoint(e.target.value)}
					value={endpoint || ""}
				/>
			</div>
			<div
				style={{
					display: "flex",
					gap: "2rem",
				}}
			>
				<button
					className="save-credentials"
					onClick={() => {
						saveContext();
					}}
				>
					Save credentials
				</button>
				<button
					onClick={() => {
						resetContext();
					}}
				>
					Reset
				</button>
			</div>
		</div>
	);
};

export default Credentials;
