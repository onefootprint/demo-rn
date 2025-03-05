import { Text, StyleSheet, type TextProps } from "react-native";

type LabelProps = TextProps & {
	children: React.ReactNode;
};

const Label = ({ children, ...props }: LabelProps) => {
	return (
		<Text style={styles.label} {...props}>
			{children}
		</Text>
	);
};

const styles = StyleSheet.create({
	label: {
		color: "#3B366F",
		fontSize: 16,
		fontWeight: "400",
		marginBottom: 12,
	},
});

export default Label;
