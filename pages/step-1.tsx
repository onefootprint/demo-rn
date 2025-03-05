import { type FormValues, Fp } from "@onefootprint/footprint-react-native";
import React from "react";
import { View, StyleSheet, Text, SafeAreaView } from "react-native";
import Input from "../components/input";
import DismissKeyboard from "../components/dismiss-keyboard";
import Button from "../components/button";
import Label from "../components/label";

type Step1Props = {
	onDone: (phone: string) => void;
};

const Step1 = ({ onDone }: Step1Props) => {
	const handleCreateChallenge = (formValues: FormValues) => {
		const phone = formValues["id.phone_number"];
		if (!phone) return;
		onDone(phone);
	};

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={{ flex: 1, padding: 16 }}>
				<Text style={styles.title}>Let's get started</Text>
				<DismissKeyboard>
					<Fp.Form onSubmit={handleCreateChallenge}>
						{({ handleSubmit }) => {
							return (
								<View style={styles.form}>
									<Fp.Field name="id.phone_number">
										<>
											<Label nativeID="phone">Phone</Label>
											<Fp.Input
												aria-labelledby="phone"
												as={Input}
												autoCapitalize="none"
												autoCorrect={false}
												keyboardType="phone-pad"
												onSubmitEditing={handleSubmit}
												returnKeyType="next"
												placeholder="+1 234 567 890"
											/>
											<Fp.FieldErrors style={styles.error} />
										</>
									</Fp.Field>
									<Button title="Continue" onPress={handleSubmit} />
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
		fontWeight: "500",
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

export default Step1;
