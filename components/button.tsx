import React from "react";
import {
	Text,
	StyleSheet,
	Pressable,
	type PressableProps,
	type ViewStyle,
	type StyleProp,
	ActivityIndicator,
} from "react-native";

type ButtonProps = PressableProps & {
	title: string;
	style?: StyleProp<ViewStyle>;
	loading?: boolean;
};

const Button = ({ title, style, loading, ...props }: ButtonProps) => {
	return (
		<Pressable
			style={({ pressed }) =>
				[
					styles.button,
					pressed && styles.buttonPressed,
					loading && styles.buttonLoading,
					style,
				] as StyleProp<ViewStyle>
			}
			disabled={loading}
			{...props}
		>
			{loading ? (
				<ActivityIndicator color="#ffffff" />
			) : (
				<Text style={styles.text}>{title}</Text>
			)}
		</Pressable>
	);
};

const styles = StyleSheet.create({
	button: {
		backgroundColor: "#493182",
		paddingVertical: 16,
		borderRadius: 8,
		alignItems: "center",
		justifyContent: "center",
		width: "100%",
	},
	buttonPressed: {
		backgroundColor: "#33225C",
	},
	buttonLoading: {
		backgroundColor: "#7A6BA3", // Lighter version of the primary color
	},
	text: {
		color: "#ffffff",
		fontSize: 16,
		fontWeight: "600",
	},
});

export default Button;
