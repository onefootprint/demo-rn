import { TouchableWithoutFeedback, Keyboard } from "react-native";

const DismissKeyboard = ({ children }: { children: React.ReactNode }) => {
	return (
		<TouchableWithoutFeedback
			onPress={Keyboard.dismiss}
			style={{ flex: 1, backgroundColor: "red" }}
		>
			{children}
		</TouchableWithoutFeedback>
	);
};

export default DismissKeyboard;
