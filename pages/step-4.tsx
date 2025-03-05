import {
	type FormValues,
	Fp,
	useFootprint,
} from "@onefootprint/footprint-react-native";
import React, { useState } from "react";
import { View, StyleSheet, Text, SafeAreaView } from "react-native";
import Input from "../components/input";
import DismissKeyboard from "../components/dismiss-keyboard";
import Button from "../components/button";
import Label from "../components/label";

type Step4Props = {
	onDone: () => void;
	vaultData?: FormValues;
};

const Step4 = ({ onDone, vaultData }: Step4Props) => {
	const fp = useFootprint();
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (formValues: FormValues) => {
		try {
			setLoading(true);
			await fp.vault(formValues);
			const requirements = await fp.getRequirements();
			console.log("remaining requirements", requirements);
			onDone();
		} catch (error) {
			console.log("vaulting error", error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={{ flex: 1, padding: 16 }}>
				<Text style={styles.title}>Basic Information</Text>
				<Text style={styles.subtitle}>
					Please provide your basic information to continue.
				</Text>
				<DismissKeyboard>
					<Fp.Form
						onSubmit={handleSubmit}
						defaultValues={{
							"id.first_name": vaultData?.["id.first_name"],
							"id.last_name": vaultData?.["id.last_name"],
							"id.dob": vaultData?.["id.dob"],
							"id.ssn9": vaultData?.["id.ssn9"],
						}}
					>
						{({ handleSubmit }) => (
							<View style={styles.form}>
								<Fp.Field name="id.first_name">
									<>
										<Label nativeID="firstName">First Name</Label>
										<Fp.Input
											aria-labelledby="firstName"
											as={Input}
											autoCapitalize="words"
											autoCorrect={false}
											returnKeyType="next"
											placeholder="First Name"
										/>
										<Fp.FieldErrors style={styles.error} />
									</>
								</Fp.Field>

								<Fp.Field name="id.last_name">
									<>
										<Label nativeID="lastName">Last Name</Label>
										<Fp.Input
											aria-labelledby="lastName"
											as={Input}
											autoCapitalize="words"
											autoCorrect={false}
											returnKeyType="next"
											placeholder="Last Name"
										/>
										<Fp.FieldErrors style={styles.error} />
									</>
								</Fp.Field>

								<Fp.Field name="id.dob">
									<>
										<Label nativeID="dob">Date of Birth</Label>
										<Fp.Input
											aria-labelledby="dob"
											as={Input}
											autoCapitalize="none"
											autoCorrect={false}
											returnKeyType="next"
											placeholder="MM/DD/YYYY"
										/>
										<Fp.FieldErrors style={styles.error} />
									</>
								</Fp.Field>

								<Fp.Field name="id.ssn9">
									<>
										<Label nativeID="ssn9">Full SSN</Label>
										<Fp.Input
											aria-labelledby="ssn9"
											as={Input}
											autoCapitalize="none"
											autoCorrect={false}
											keyboardType="number-pad"
											returnKeyType="done"
											placeholder="Full SSN"
										/>
										<Fp.FieldErrors style={styles.error} />
									</>
								</Fp.Field>

								<Button
									title="Submit"
									onPress={handleSubmit}
									loading={loading}
								/>
							</View>
						)}
					</Fp.Form>
				</DismissKeyboard>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	title: {
		color: "#3B366F",
		fontSize: 24,
		fontWeight: "600",
		marginBottom: 12,
	},
	subtitle: {
		color: "#666666",
		fontSize: 16,
		lineHeight: 24,
		marginBottom: 32,
	},
	form: {
		gap: 16,
	},
	error: {
		color: "#F4764D",
		marginTop: 8,
	},
});

export default Step4;
