import React, { useState } from "react";
import { TextInput, type TextInputProps, StyleSheet, View } from "react-native";

type InputProps = TextInputProps & {};

const Input = React.forwardRef<TextInput, InputProps>(({ ...props }, ref) => {
	const [isFocused, setIsFocused] = useState(false);

	const handleFocus = () => {
		setIsFocused(true);
	};

	const handleBlur = () => {
		setIsFocused(false);
	};

	return (
		<View style={[styles.container, isFocused && styles.focusedContainer]}>
			<TextInput
				ref={ref}
				{...props}
				onFocus={handleFocus}
				onBlur={handleBlur}
				style={styles.input}
			/>
		</View>
	);
});

const styles = StyleSheet.create({
	container: {
		borderWidth: 1,
		borderColor: "#E0E0E0",
		borderRadius: 6,
		height: 50,
		position: "relative",
	},
	focusedContainer: {
		borderColor: "#B367F5",
		borderWidth: 2,
	},
	input: {
		padding: 12,
		height: "100%",
	},
});

export default Input;
