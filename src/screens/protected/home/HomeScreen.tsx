
import { Feather, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    Image,
    TouchableOpacity,
} from "react-native";
import { baseUrl } from "../../../config/api";
import WeatherWidget from "../../../components/weather/weather-widget";
import { Colors } from "../../../constants/Colors";
import WeatherAdvisory from "../../../components/weather/weather-advisory";
import useAuthStore from "../../../store/auth-store";
import ClientHomePage from "./client/ClientHomePage";
import { useQuery } from "@tanstack/react-query";

// Sample farming tips data
const farmingTips = [
	{
		id: "1",
		title: "Crop Rotation Techniques",
		description: "Learn how rotating crops can improve soil health and yield",
		category: "Soil Management",
	},
	{
		id: "2",
		title: "Organic Pest Control",
		description: "Natural methods to protect your crops without chemicals",
		category: "Pest Control",
	},
	{
		id: "3",
		title: "Drip Irrigation Setup",
		description: "Efficient water usage for your farm",
		category: "Irrigation",
	},
];

export default function FarmerDashboard() {
	const { user, isAuthenticated } = useAuthStore((state) => state);

	const navigation = useNavigation() as any;
	const [produceCount, setProduceCount] = useState<number>(0);

	const handleSubmit = (formData: any) => {
		console.log("Form submitted:", formData);
		// Here you would typically send the data to your backend
	};

	if (!isAuthenticated || !user) {
		// You can return a loading state or redirect to login
		return (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<Text>Please log in</Text>
			</View>
		);
	}

	if (user?.type === "client") {
		return <ClientHomePage />;
	}

	useEffect(() => {
		if (!user?.id) return;
		const fetchProduct = async () => {
			const response = await axios.get(
				`${baseUrl}/api/products/farmer/${user?.id}`
			);

			if (response.data.data) {
				console.log(response?.data?.data);
				setProduceCount(response?.data?.data?.length);
			}
		};
		fetchProduct();
	}, [user?.id]);

	const {
		data: orders,
		isLoading,
		isError,
		error,
	} = useQuery({
		queryKey: ["farmerOrders", user?.id],
		queryFn: async () => {
			const response = await axios.get(
				`${baseUrl}/api/orders/farmer-orders/${user?.id}`
			);
			return response.data.data;
		},
		enabled: !!user?.id,
	});

	return (
		<View style={{ flex: 1, position: "relative" }}>
			<ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
				{/* Weather Section */}
				<WeatherWidget location={user?.location} />

				{/* Stats Grid */}
				<View style={styles.statsGrid}>
					{/* <TouchableOpacity style={[styles.statCard, styles.statCardPrimary]}>
                        <MaterialIcons name="grass" size={28} color="white" />
                        <Text style={styles.statNumber}>5</Text>
                        <Text style={styles.statLabel}>Active Crops</Text>
                    </TouchableOpacity> */}
					<TouchableOpacity
						onPress={() => {
							navigation.navigate("dynamicNavigator", {
								screen: "farmer-orders",
								// params: { id: product._id }
							});
						}}
						style={[styles.statCard, styles.statCardSecondary]}
					>
						<Feather name="check-circle" size={28} color="white" />
						<Text style={styles.statNumber}>{orders?.length}</Text>
						<Text style={styles.statLabel}>Orders</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => {
							navigation.navigate("dynamicNavigator", {
								screen: "farmer-produce",
							});
						}}
						style={[styles.statCard, { backgroundColor: Colors.light.text }]}
					>
						<FontAwesome name="leaf" size={28} color="white" />
						<Text style={styles.statNumber}>{produceCount}</Text>
						<Text style={styles.statLabel}>Produce</Text>
					</TouchableOpacity>
				</View>

				{/* Farming Tips */}
				<View style={styles.section}>
					<View style={styles.sectionHeader}>
						<Text style={styles.sectionTitle}>Latest Guidance</Text>
						<TouchableOpacity
							// onPress={() => router.push("/(tabs)/explore")}
							style={styles.seeAllButton}
						>
							<Text style={styles.seeAllText}>View All</Text>
							<Feather
								name="arrow-right"
								size={16}
								color={Colors.light.primary}
							/>
						</TouchableOpacity>
					</View>

					{farmingTips.map((tip) => (
						<TouchableOpacity key={tip.id} style={styles.tipCard}>
							<LinearGradient
								colors={["#FFFFFF", "#F8F8F8"]}
								style={styles.tipGradient}
							>
								<View style={styles.tipContent}>
									<View style={styles.tipHeader}>
										<Text style={styles.tipCategory}>{tip.category}</Text>
										<View
											style={[
												styles.categoryIndicator,
												{ backgroundColor: Colors.light.secondary + "20" },
											]}
										>
											<Feather
												name="book-open"
												size={16}
												color={Colors.light.secondary}
											/>
										</View>
									</View>
									<Text style={styles.tipTitle}>{tip.title}</Text>
									<Text style={styles.tipDescription}>{tip.description}</Text>
								</View>
								<TouchableOpacity style={styles.tipButton}>
									<Feather
										name="chevron-right"
										size={24}
										color={Colors.light.text}
									/>
								</TouchableOpacity>
							</LinearGradient>
						</TouchableOpacity>
					))}
				</View>

				<WeatherAdvisory />
			</ScrollView>
			<TouchableOpacity
				onPress={() => {
					navigation.navigate("dynamicNavigator", {
						screen: "sell",
					});
				}}
				style={styles.sellButtonContainer}
			>
				<MaterialIcons
					name="add-circle"
					size={60}
					color={Colors.light.primary}
				/>
				<Text>Sell</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light.background,
        paddingHorizontal: 16,
        position: "relative",
    },
    weatherContainer: {
        borderRadius: 20,
        marginVertical: 16,
        overflow: "hidden",
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    statsGrid: {
        flexDirection: "row",
        gap: 16,
        marginBottom: 24,
        flexWrap: "wrap",
    },
    sellButtonContainer: {
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
        bottom: 20,
        right: 20,
        zIndex: 50,
    },
    statCard: {
        flex: 1,
        borderRadius: 16,
        padding: 20,
        alignItems: "center",
        justifyContent: "center",
        aspectRatio: 1,
    },
    statCardPrimary: {
        backgroundColor: Colors.light.primary,
    },
    statCardSecondary: {
        backgroundColor: Colors.light.secondary,
    },
    statNumber: {
        fontSize: 28,
        fontWeight: "700",
        color: "white",
        marginVertical: 8,
    },
    statLabel: {
        fontSize: 14,
        color: "white",
        textAlign: "center",
        opacity: 0.9,
    },
    section: {
        marginBottom: 24,
    },
    sectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: "700",
        color: Colors.light.text,
        letterSpacing: 0.5,
    },
    seeAllButton: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },
    seeAllText: {
        color: Colors.light.primary,
        fontSize: 14,
        fontWeight: "500",
    },
    tipCard: {
        borderRadius: 16,
        marginBottom: 12,
        overflow: "hidden",
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    tipGradient: {
        padding: 16,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    tipHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12,
    },
    tipContent: {
        flex: 1,
    },
    categoryIndicator: {
        padding: 6,
        borderRadius: 8,
    },
    tipTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: Colors.light.text,
        marginBottom: 8,
    },
    tipDescription: {
        fontSize: 14,
        color: Colors.light.text,
        opacity: 0.8,
        lineHeight: 20,
    },
    tipCategory: {
        fontSize: 12,
        fontWeight: "500",
        color: Colors.light.secondary,
    },
    tipButton: {
        padding: 8,
    },
    advisoryCard: {
        borderRadius: 16,
        padding: 20,
        flexDirection: "row",
        alignItems: "center",
        gap: 16,
        marginBottom: 24,
    },
    advisoryTextContainer: {
        flex: 1,
    },
    advisoryTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "white",
        marginBottom: 8,
    },
    advisoryText: {
        fontSize: 14,
        color: "white",
        opacity: 0.9,
        lineHeight: 20,
    },
    accessDeniedText: {
        fontSize: 18,
        color: Colors.status.error,
        textAlign: "center",
        marginTop: 40,
        padding: 20,
    },
});
