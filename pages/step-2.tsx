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

type Step2Props = {
	onDone: () => void;
	values: { phone: string };
};

const Step2 = ({ onDone, values }: Step2Props) => {
	const fp = useFootprint();
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (formValues: FormValues) => {
		try {
			setLoading(true);
			await fp.createEmailPhoneBasedChallenge({
				email: formValues["id.email"],
				phoneNumber: values.phone,
			});
			onDone();
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={{ flex: 1, padding: 16 }}>
				<Text style={styles.title}>What is your email address?</Text>
				<Text style={styles.subtitle}>
					This could be your work email, personal email, or perhaps the one you
					use with your health insurance plan.
				</Text>
				<DismissKeyboard>
					<Fp.Form onSubmit={handleSubmit}>
						{({ handleSubmit }) => {
							return (
								<View style={styles.form}>
									<Fp.Field name="id.email">
										<>
											<Label nativeID="email">Email Address</Label>
											<Fp.Input
												aria-labelledby="email"
												as={Input}
												autoCapitalize="none"
												autoCorrect={false}
												keyboardType="email-address"
												onSubmitEditing={handleSubmit}
												returnKeyType="next"
												placeholder="Email Address"
											/>
											<Fp.FieldErrors style={styles.error} />
										</>
									</Fp.Field>
									<Button
										title="Continue"
										onPress={handleSubmit}
										loading={loading}
									/>
								</View>
							);
						}}
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

export default Step2;
