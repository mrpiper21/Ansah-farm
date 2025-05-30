// screens/ExploreScreen.tsx
import {
	View,
	Text,
	ScrollView,
	StyleSheet,
	Image,
	TouchableOpacity,
	FlatList,
	ActivityIndicator,
	RefreshControl,
	TextInput,
} from "react-native";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Colors } from "../../../constants/Colors";
import YouTubePlayer from "../../../components/video/youtube-card";
import { baseUrl } from "../../../config/api";
import { categories } from "../../../components/mock";

// API Service Functions
const fetchResources = async (category: string = "all") => {
	const response = await axios.get(`${baseUrl}/api/resource/get`, {
		params: {
			category: category === "all" ? undefined : category,
		},
	});
	return response.data;
};

const fetchTips = async (searchQuery: string = "") => {
	const response = await axios.get(`${baseUrl}/api/resource/get`, {
		params: {
			search: searchQuery,
		},
	});
	return response.data;
};

const ExploreScreen = () => {
	const [selectedCategory, setSelectedCategory] = useState("all");
	const [searchQuery, setSearchQuery] = useState("");
	const navigation = useNavigation() as any

	// Fetch resources with TanStack Query
	const {
		data: resourcesData,
		isLoading: resourcesLoading,
		error: resourcesError,
		refetch: refetchResources,
	} = useQuery({
		queryKey: ["resources", selectedCategory],
		queryFn: () => fetchResources(selectedCategory),
	});

	// Fetch tips with TanStack Query
	const {
		data: tipsData,
		isLoading: tipsLoading,
		error: tipsError,
		refetch: refetchTips,
	} = useQuery({
		queryKey: ["tips", searchQuery],
		queryFn: () => fetchTips(searchQuery),
	});

	const handleCategoryChange = (categoryId: string) => {
		setSelectedCategory(categoryId);
	};

	const handleSearch = (text: string) => {
		setSearchQuery(text);
	};

	const getIcon = (name: string) => {
		switch (name) {
			case "compost":
				return (
					<MaterialCommunityIcons
						name="tree"
						size={24}
						color={Colors.light.primary}
					/>
				);
			case "water":
				return (
					<MaterialIcons name="water" size={24} color={Colors.light.primary} />
				);
			case "leaf":
				return (
					<MaterialCommunityIcons
						name="leaf"
						size={24}
						color={Colors.light.primary}
					/>
				);
			case "bug":
				return (
					<MaterialCommunityIcons
						name="bug"
						size={24}
						color={Colors.light.primary}
					/>
				);
			default:
				return (
					<MaterialIcons
						name="article"
						size={24}
						color={Colors.light.primary}
					/>
				);
		}
	};

	const renderResourceItem = ({ item }: { item: any }) => (
		<View style={styles.resourceCard}>
			{item.contentType === "video" ? (
				<YouTubePlayer videoId={item.videoUrl} />
			) : (
				<Image source={{ uri: item.imageUrl }} style={styles.resourceImage} />
			)}

			<View style={styles.resourceContent}>
				<View style={styles.resourceIcon}>{getIcon(item.category)}</View>
				<TouchableOpacity
					onPress={() => {
						// router.push({
						// 	pathname: "/(dynamic)/[resource]/index",
						// 	params: { resource: item?._id },
						// });
						//TODO
						// naivgation.navigate("")
						navigation.navigate('dynamicNavigator', { 
							screen: 'resource-details',
							params: { id: item._id }
						  });
					}}
					style={styles.resourceText}
				>
					<Text style={styles.resourceTitle}>{item.title}</Text>
					<Text style={styles.resourceDescription}>{item.description}</Text>
					<View style={styles.resourceFooter}>
						<View
							style={[
								styles.categoryTag,
								{ backgroundColor: Colors.light.primary + "20" },
							]}
						>
							<Text
								style={[
									styles.resourceCategory,
									{ color: Colors.light.primary },
								]}
							>
								{item.category}
							</Text>
						</View>
						<TouchableOpacity>
							<MaterialIcons
								name={item.saved ? "bookmark" : "bookmark-outline"}
								size={20}
								color={item.saved ? Colors.light.primary : Colors.light.text}
							/>
						</TouchableOpacity>
					</View>
				</TouchableOpacity>
			</View>
		</View>
	);

	const renderTipItem = ({ item }: { item: any }) => (
		<View style={styles.tipCard}>
			{item.contentType === "video" ? (
				<YouTubePlayer videoId={item.videoUrl} />
			) : (
				<Image source={{ uri: item.imageUrl }} style={styles.tipImage} />
			)}

			<TouchableOpacity
				onPress={() =>
					navigation.navigate('dynamicNavigator', { 
						screen: 'resource-details',
						params: { id: item._id }
					  })
				}
				style={styles.tipContent}
			>
				<View style={styles.tipHeader}>
					<MaterialCommunityIcons
						name="lightbulb-on-outline"
						size={20}
						color={Colors.light.accent}
					/>
					<Text style={styles.tipTitle}>{item.title}</Text>
				</View>
				<Text style={styles.tipText}>{item.content?.substring(0, 100)}...</Text>
			</TouchableOpacity>
		</View>
	);

	if (resourcesLoading && !resourcesData) {
		return (
			<View style={styles.loadingContainer}>
				<ActivityIndicator size="large" color={Colors.light.primary} />
			</View>
		);
	}

	if (resourcesError) {
		return (
			<View style={styles.errorContainer}>
				<Text style={styles.errorText}>Failed to load resources</Text>
				<TouchableOpacity
					style={styles.retryButton}
					onPress={() => refetchResources()}
				>
					<Text style={styles.retryButtonText}>Retry</Text>
				</TouchableOpacity>
			</View>
		);
	}

	return (
		<ScrollView
			style={styles.container}
			refreshControl={
				<RefreshControl
					refreshing={resourcesLoading}
					onRefresh={refetchResources}
					colors={[Colors.light.primary]}
				/>
			}
		>
			{/* Categories */}
			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={false}
				style={styles.categoriesContainer}
				contentContainerStyle={styles.categoriesContent}
			>
				{categories.map((category) => (
					<TouchableOpacity
						key={category.id}
						style={[
							styles.categoryButton,
							selectedCategory === category.id && styles.selectedCategory,
						]}
						onPress={() => handleCategoryChange(category.id)}
					>
						<Text
							style={[
								styles.categoryText,
								selectedCategory === category.id && styles.selectedCategoryText,
							]}
						>
							{category.name}
						</Text>
					</TouchableOpacity>
				))}
			</ScrollView>

			{/* Resources Section */}
			<Text style={styles.sectionTitle}>Farm Resources</Text>
			<FlatList
				data={resourcesData?.data || []}
				renderItem={renderResourceItem}
				keyExtractor={(item) => item._id}
				scrollEnabled={false}
				ListEmptyComponent={
					<Text style={styles.emptyText}>No resources found</Text>
				}
			/>

			{/* Tips Section */}
			<Text style={styles.sectionTitle}>Daily Farming Tips</Text>
			{tipsLoading ? (
				<ActivityIndicator size="small" color={Colors.light.primary} />
			) : (
				<FlatList
					data={tipsData?.data || []}
					renderItem={renderTipItem}
					keyExtractor={(item) => item._id}
					scrollEnabled={false}
					ListEmptyComponent={
						<Text style={styles.emptyText}>
							No tips found matching your search
						</Text>
					}
				/>
			)}
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.light.background,
		paddingHorizontal: 16,
		paddingTop: 16,
	},
	loadingContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	errorContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
	},
	errorText: {
		color: Colors.light.error,
		marginBottom: 20,
		fontSize: 16,
	},
	retryButton: {
		backgroundColor: Colors.light.primary,
		paddingHorizontal: 20,
		paddingVertical: 10,
		borderRadius: 8,
	},
	retryButtonText: {
		color: "#fff",
		fontWeight: "bold",
	},
	searchContainer: {
		marginBottom: 16,
	},
	searchBox: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: Colors.light.surface,
		borderRadius: 12,
		paddingHorizontal: 16,
		paddingVertical: 12,
		elevation: 2,
	},
	searchText: {
		flex: 1,
		marginLeft: 8,
		color: Colors.light.text,
		fontSize: 16,
	},
	categoriesContainer: {
		marginBottom: 20,
	},
	categoriesContent: {
		paddingHorizontal: 4,
	},
	categoryButton: {
		paddingHorizontal: 20,
		paddingVertical: 10,
		borderRadius: 20,
		backgroundColor: Colors.light.surface,
		marginRight: 10,
		elevation: 2,
	},
	selectedCategory: {
		backgroundColor: Colors.light.primary,
	},
	categoryText: {
		color: Colors.light.text,
		fontWeight: "500",
	},
	selectedCategoryText: {
		color: "#fff",
		fontWeight: "600",
	},
	sectionTitle: {
		fontSize: 20,
		fontWeight: "bold",
		color: Colors.light.text,
		marginBottom: 16,
		marginTop: 8,
	},
	resourceCard: {
		backgroundColor: Colors.light.surface,
		borderRadius: 16,
		overflow: "hidden",
		marginBottom: 16,
		elevation: 2,
	},
	resourceImage: {
		width: "100%",
		height: 180,
		resizeMode: "cover",
	},
	resourceContent: {
		padding: 16,
		flexDirection: "row",
	},
	resourceIcon: {
		marginRight: 12,
	},
	resourceText: {
		flex: 1,
	},
	resourceTitle: {
		fontSize: 18,
		fontWeight: "600",
		color: Colors.light.text,
		marginBottom: 6,
	},
	resourceDescription: {
		fontSize: 14,
		color: Colors.light.text,
		opacity: 0.8,
		marginBottom: 12,
		lineHeight: 20,
	},
	resourceFooter: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	categoryTag: {
		paddingHorizontal: 10,
		paddingVertical: 4,
		borderRadius: 12,
	},
	resourceCategory: {
		fontSize: 12,
		fontWeight: "500",
		textTransform: "capitalize",
	},
	tipCard: {
		backgroundColor: Colors.light.surface,
		borderRadius: 16,
		overflow: "hidden",
		marginBottom: 16,
		elevation: 2,
	},
	tipImage: {
		width: "100%",
		height: 150,
		resizeMode: "cover",
	},
	tipContent: {
		padding: 16,
	},
	tipHeader: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 8,
	},
	tipTitle: {
		fontSize: 18,
		fontWeight: "600",
		color: Colors.light.text,
		marginLeft: 8,
	},
	tipText: {
		fontSize: 14,
		color: Colors.light.text,
		opacity: 0.8,
		marginBottom: 12,
		lineHeight: 20,
	},
	emptyText: {
		textAlign: "center",
		color: Colors.light.primary,
		marginVertical: 20,
		fontSize: 16,
	},
});

export default ExploreScreen;
