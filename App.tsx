import { Fp, type FormValues } from "@onefootprint/footprint-react-native";
import React, { useState } from "react";
import { Alert } from "react-native";
import Step1 from "./pages/step-1";
import Step2 from "./pages/step-2";
import Step3 from "./pages/step-3";
import Step4 from "./pages/step-4";
import Step5 from "./pages/step-5";

export default function App() {
	const [state, setState] = useState<{
		step: "phone" | "email" | "otp" | "basic" | "address";
		data: { phone: string };
	}>({
		step: "phone",
		data: { phone: "" },
	});
	const [vaultData, setVaultData] = useState<FormValues>();

	return (
		<Fp.Provider
			publicKey="pb_test_V0HWDsOXmQMZWywsUAkvGp"
			redirectUrl="footprint://"
			appearance={{
				variables: {
					colorAccent: "#493182",
					buttonBorderRadius: "16px",
					buttonPrimaryBg: "#493182",
					buttonPrimaryHoverBg: "#33225C",
					inputBorderRadius: "6",
					inputBorderColor: "#493182",
				},
			}}
		>
			{state.step === "phone" && (
				<Step1
					onDone={(phone) => {
						setState((prev) => ({
							step: "email",
							data: { ...prev.data, phone },
						}));
					}}
				/>
			)}
			{state.step === "email" && (
				<Step2
					values={state.data}
					onDone={() => {
						setState((prev) => ({
							...prev,
							step: "otp",
						}));
					}}
				/>
			)}
			{state.step === "otp" && (
				<Step3
					onDone={(data) => {
						setVaultData(data);
						setState((prev) => ({
							...prev,
							step: "basic",
						}));
					}}
				/>
			)}
			{state.step === "basic" && (
				<Step4
					vaultData={vaultData}
					onDone={() => {
						setState((prev) => ({
							...prev,
							step: "address",
						}));
					}}
				/>
			)}
			{state.step === "address" && (
				<Step5
					vaultData={vaultData}
					onDone={() => {
						// Handle completion of the flow
						Alert.alert(
							"Success",
							"Your information has been submitted successfully.",
							[{ text: "OK" }],
						);
						console.log("Flow completed");
					}}
				/>
			)}
		</Fp.Provider>
	);
}
