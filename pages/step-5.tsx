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

type Step5Props = {
	onDone: () => void;
	vaultData?: FormValues;
};

const Step5 = ({ onDone, vaultData }: Step5Props) => {
	const fp = useFootprint();
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (formValues: FormValues) => {
		try {
			setLoading(true);
			await fp.vault(formValues);
			console.log("vaulted");
			await fp.handoff({ onComplete: onDone });
		} catch (error) {
			console.log("vaulting error", error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={{ flex: 1, padding: 16 }}>
				<Text style={styles.title}>Address Information</Text>
				<Text style={styles.subtitle}>
					Please provide your current residential address.
				</Text>
				<DismissKeyboard>
					<Fp.Form
						onSubmit={handleSubmit}
						defaultValues={{
							"id.address_line1": vaultData?.["id.address_line1"],
							"id.address_line2": vaultData?.["id.address_line2"],
							"id.country": "US",
							"id.city": vaultData?.["id.city"],
							"id.state": vaultData?.["id.state"],
							"id.zip": vaultData?.["id.zip"],
						}}
					>
						{({ handleSubmit }) => (
							<View style={styles.form}>
								<Fp.Field name="id.address_line1">
									<>
										<Label nativeID="addressLine1">Street Address</Label>
										<Fp.Input
											aria-labelledby="addressLine1"
											as={Input}
											autoCapitalize="words"
											autoCorrect={false}
											returnKeyType="next"
											placeholder="Street Address"
										/>
										<Fp.FieldErrors style={styles.error} />
									</>
								</Fp.Field>

								<Fp.Field name="id.address_line2">
									<>
										<Label nativeID="addressLine2">
											Apt, Suite, etc. (optional)
										</Label>
										<Fp.Input
											aria-labelledby="addressLine2"
											as={Input}
											autoCapitalize="words"
											autoCorrect={false}
											returnKeyType="next"
											placeholder="Apartment, suite, unit, etc."
										/>
										<Fp.FieldErrors style={styles.error} />
									</>
								</Fp.Field>

								<Fp.Field name="id.city">
									<>
										<Label nativeID="city">City</Label>
										<Fp.Input
											aria-labelledby="city"
											as={Input}
											autoCapitalize="words"
											autoCorrect={false}
											returnKeyType="next"
											placeholder="City"
										/>
										<Fp.FieldErrors style={styles.error} />
									</>
								</Fp.Field>

								<Fp.Field name="id.state">
									<>
										<Label nativeID="state">State</Label>
										<Fp.Input
											aria-labelledby="state"
											as={Input}
											autoCapitalize="characters"
											autoCorrect={false}
											returnKeyType="next"
											placeholder="State (e.g. CA)"
											maxLength={2}
										/>
										<Fp.FieldErrors style={styles.error} />
									</>
								</Fp.Field>

								<Fp.Field name="id.zip">
									<>
										<Label nativeID="zip">ZIP Code</Label>
										<Fp.Input
											aria-labelledby="zip"
											as={Input}
											autoCapitalize="none"
											autoCorrect={false}
											keyboardType="number-pad"
											returnKeyType="next"
											placeholder="ZIP Code"
											maxLength={5}
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

export default Step5;
