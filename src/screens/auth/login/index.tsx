import { useState, useRef, useCallback } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  useColorScheme,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import BottomSheet, {
  BottomSheetView,
  BottomSheetBackdrop,
  useBottomSheetSpringConfigs,
} from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useToast } from "react-native-toast-notifications";
import { Colors } from "../../../constants/Colors";
import responsive from "../../../helpers/responsive";
import GoogleIcon from "../../../../assets/icons/GOOGLE";
import useAuthStore from "../../../store/auth-store";
import FormTextInput from "../../../components/input-elements/form-text-input";
import Button from "../../../components/buttons/basic-button";

const LoginScreen:React.FC  = () => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const [isFarmer, setIsFarmer] = useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [form, setForm] = useState({email: "", password: ""})
  const { login, isLoading, error } = useAuthStore();
	const toast = useToast();
	const snapPoints = ["60%", "70%"];

	const renderBackdrop = useCallback(
		(props: any) => (
			<BottomSheetBackdrop
				{...props}
				disappearsOnIndex={-1}
				appearsOnIndex={0}
				opacity={0.1}
			/>
		),
		[]
	);

	const animationConfigs = useBottomSheetSpringConfigs({
		damping: 80,
		overshootClamping: true,
		restDisplacementThreshold: 0.1,
		restSpeedThreshold: 0.1,
		stiffness: 1500,
	});

	const handleDismissKeyboard = useCallback(() => {
		Keyboard.dismiss();
	}, []);

	const handleLogin = async () => {
		try {
			await login(form.email, form.password);
			toast.show("Login successful", {
				type: "success",
				animationType: "zoom-in",
			});
			// router.push("/(tabs)");
			// Add any post-login navigation here
			if (error) {
				toast.show(error || "Login failed", {
					type: "danger",
					animationType: "zoom-in",
				});
				return;
			}
		} catch (error: any) {
			toast.show(error.message || "Login failed", {
				type: "danger",
				animationType: "zoom-in",
			});
		}
	};

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<TouchableWithoutFeedback onPress={handleDismissKeyboard}>
				<View
					style={{ flex: 1, backgroundColor: colors.background }}
					// onStartShouldSetResponder={handleDismissKeyboard}
					onTouchStart={handleDismissKeyboard}
				>
					{/* Hero Section */}
					<View style={styles.heroContainer}>
						<Image
							source={require("../../../../assets/images/farmer-man.jpg")}
							style={styles.heroImage}
						/>
						<View
							style={[
								styles.heroOverlay,
								{ backgroundColor: colors.primary + "40" },
							]}
						/>
						<View style={styles.heroContent}>
							<Text style={[styles.heroTitle, { color: colors.surface }]}>
								{isFarmer
									? "🌱 Welcome Ansah Farmer!"
									: "👋 Welcome to Ansah Farms!"}
							</Text>
							<Text
								style={[styles.heroSubtitle, { color: colors.surface + "CC" }]}
							>
								{isFarmer
									? "Manage your farm operations and connect with buyers"
									: "Shop fresh produce directly from Ansah Farmers"}
							</Text>
						</View>
					</View>

					<BottomSheet
						ref={bottomSheetRef}
						index={0}
						snapPoints={snapPoints}
						backdropComponent={renderBackdrop}
						animationConfigs={animationConfigs}
						handleIndicatorStyle={{
							backgroundColor: colors.text + "80",
							width: 40,
							height: 4,
						}}
						backgroundStyle={{
							backgroundColor: colors.surface,
							borderTopLeftRadius: 32,
							borderTopRightRadius: 32,
						}}
					>
						<BottomSheetView style={styles.bottomSheetContent}>
							{/* Form Inputs */}
							<FormTextInput
								onChangeText={(text) =>
									setForm((p) => ({
										...p,
										email: text,
									}))
								}
								label="Email Address"
								placeholder="Enter your email"
								keyboardType="email-address"
								autoCapitalize="none"
								iconLeft={
									<MaterialIcons
										name="email"
										size={20}
										color={colors.text + "80"}
									/>
								}
								style={{ marginBottom: 20 }}
							/>

							<FormTextInput
								onChangeText={(text) =>
									setForm((p) => ({
										...p,
										password: text,
									}))
								}
								label="Password"
								placeholder="Enter your password"
								secure
								iconLeft={
									<MaterialIcons
										name="lock"
										size={20}
										color={colors.text + "80"}
									/>
								}
								style={{ marginBottom: 28 }}
							/>

							<Button
								size="lg"
								variant="primary"
								onPress={handleLogin}
								style={{ marginBottom: 24 }}
								loading={isLoading}
							>
								Sign In
							</Button>

							{/* Divider */}
							<View style={styles.dividerContainer}>
								<View
									style={[
										styles.dividerLine,
										{ backgroundColor: colors.text + "20" },
									]}
								/>
								<Text
									style={[styles.dividerText, { color: colors.text + "80" }]}
								>
									Or continue with
								</Text>
								<View
									style={[
										styles.dividerLine,
										{ backgroundColor: colors.text + "20" },
									]}
								/>
							</View>

							{/* Social Login */}
							<Button
								variant="outline"
								size="lg"
								iconLeft={<GoogleIcon />}
								style={{ marginTop: 20 }}
								onPress={() => {}}
							>
								Continue with Google
							</Button>

							{/* Registration Link */}
							<View style={styles.registerContainer}>
								<Text style={{ color: colors.text + "CC" }}>New here? </Text>
								<Pressable /*onPress={() => router.push("/auth/sign-up")}*/>
									<Text
										style={{
											color: colors.accent,
											fontWeight: "600",
											textDecorationLine: "underline",
										}}
									>
										Create Account
									</Text>
								</Pressable>
							</View>
						</BottomSheetView>
					</BottomSheet>
				</View>
			</TouchableWithoutFeedback>
		</GestureHandlerRootView>
	);
};

const styles = StyleSheet.create({
  heroContainer: {
    height: "45%",
    position: "relative",
  },
  heroImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.8,
  },
  heroContent: {
    position: "absolute",
    top: responsive.Dh(5),
    paddingHorizontal: 24,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: "700",
    lineHeight: 38,
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 16,
    lineHeight: 22,
    maxWidth: "80%",
  },
  bottomSheetContent: {
    padding: 24,
    flex: 1,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    fontSize: 14,
    paddingHorizontal: 12,
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 32,
    paddingHorizontal: 12,
  },
  userTypeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
    paddingVertical: 8,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  userTypeLabel: {
    fontSize: 16,
    fontWeight: "500",
  },
  expandButton: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
});

export default LoginScreen;