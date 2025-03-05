import {
	type FormValues,
	Fp,
	useFootprint,
} from "@onefootprint/footprint-react-native";
import React, { useState } from "react";
import {
	View,
	StyleSheet,
	Text,
	SafeAreaView,
	ActivityIndicator,
} from "react-native";

type Step3Props = {
	onDone: (vaultData?: FormValues) => void;
};

const Step3 = ({ onDone }: Step3Props) => {
	const fp = useFootprint();
	const [verifying, setVerifying] = useState(false);

	const verifyChallenge = async (verificationCode: string) => {
		try {
			setVerifying(true);
			const result = await fp.verify({ verificationCode });
			console.log(result);
			onDone(result.vaultData);
		} catch (error) {
			console.log(error);
			setVerifying(false);
		}
	};

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={{ flex: 1, padding: 16 }}>
				<Text style={styles.title}>Enter verification code</Text>
				<Text style={styles.subtitle}>
					We've sent a verification code to your email address. Please enter it
					below to continue.
				</Text>
				<View style={styles.otpContainer}>
					{verifying ? (
						<ActivityIndicator size="small" color="#3B366F" />
					) : (
						<Fp.Otp onComplete={verifyChallenge} style={styles.otpInput} />
					)}
				</View>
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
	otpContainer: {
		alignItems: "center",
		minHeight: 60,
		justifyContent: "center",
	},
	otpInput: {
		width: 50,
		height: 50,
		borderRadius: 8,
		borderColor: "#E5E5E5",
		borderWidth: 1,
		padding: 8,
		margin: 4,
		fontSize: 20,
		color: "#3B366F",
		backgroundColor: "#FFFFFF",
	},
});

export default Step3;
