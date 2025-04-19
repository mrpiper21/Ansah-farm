import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { FC } from "react";
import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import Button from "../buttons/basic-button";
import { IconSymbol } from "../ui/IconSymbol";
import { useNavigation } from "@react-navigation/native";
import { Product } from "../../screens/protected/market";
import { Colors } from "../../constants/Colors";
import { DynamicStackScreenProps } from "../../navigation/DynamicNavigator";

interface Props {
	product: Product;
}

const ProducetCard: FC<Props> = ({ product }) => {
	const navigation = useNavigation() as any;
	const toggleFavorite = (productId: string) => {
		console.log(`Toggling favorite for product ${productId}`);
	};

	const getCategoryColor = (category: string) => {
		switch (category.toLowerCase()) {
			case "fruits":
				return Colors.light.accent;
			case "vegetables":
				return Colors.light.primary;
			case "grains":
				return Colors.special.soilBrown;
			case "dairy":
				return Colors.light.info;
			default:
				return Colors.light.secondary;
		}
	};

	return (
		<View style={styles.card}>
			<View
				style={[
					styles.badge,
					{
						borderColor: getCategoryColor(product.category),
						borderWidth: 0.5,
					},
				]}
			>
				<Text
					style={[
						styles.badgeText,
						{ color: getCategoryColor(product.category) },
					]}
				>
					{product.category}
				</Text>
			</View>

			{/* Product Image */}
			<TouchableOpacity
				onPress={() =>
					// router.push({
					// 	pathname: "/(dynamic)/[orderDetails]",
					// 	params: { orderDetails: product._id },
					// })
					//TODO
					navigation.navigate('dynamicNavigator', { 
						screen: 'order-details',
						params: { id: product._id }
					  })
				}
				style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}
			>
				<Image source={{ uri: product.imageUrl }} style={styles.productImage} />

				{/* Product Details */}
				<View style={{ justifyContent: "space-between", display: 'flex', position: 'relative' }}>
					<View style={styles.detailsContainer}>
						<Text style={styles.productName}>{product.name}</Text>

						<View style={styles.priceContainer}>
							<Text style={styles.price}>${product.price.toFixed(2)}</Text>
							<Text style={styles.quantity}> / {product.quantity}</Text>
						</View>

						<Text style={styles.timestamp}>
							{new Date(product.createdAt).toLocaleDateString()}
						</Text>
					</View>
					<View style={{ alignItems: "center", flexDirection: 'row', justifyContent: 'flex-end', width: "80%" }}>
						<IconSymbol name="star.fill" color={"orange"} />
						<Text>4.7</Text>
						<Text>Ratings</Text>
					</View>
				</View>
			</TouchableOpacity>

			{/* Action Buttons */}
			<View style={styles.actionsContainer}>
				<TouchableOpacity
					style={styles.favoriteButton}
					onPress={() => toggleFavorite(product._id)}
				>
					<Ionicons
						name={"heart-outline"}
						size={34}
						color={Colors.light.text}
					/>
				</TouchableOpacity>

				<Button size="md" style={{ width: "80%", borderRadius: 30 }}>
					<Text>Purchase</Text>
				</Button>
			</View>
			<View
				style={{
					position: "absolute",
					flexDirection: "row",
					gap: 10,
				}}
			>
				<View
					style={{
						backgroundColor: "lightgrey",
						padding: 10,
						borderRadius: 30,
						borderWidth: 5,
						borderColor: "white",
					}}
				>
					<SimpleLineIcons name="user" size={30} color="grey" />
				</View>
				<Text style={{ marginTop: 10 }}>{product.farmer.userName}</Text>
			</View>
		</View>
	);
};

export default ProducetCard;

const styles = StyleSheet.create({
	card: {
		backgroundColor: Colors.light.surface,
		borderRadius: 12,
		padding: 16,
		marginBottom: 16,
		position: "relative",
		borderWidth: 0.5,
		borderColor: 'gray'
	},
	badge: {
		position: "absolute",
		top: 5,
		right: 16,
		paddingHorizontal: 10,
		paddingVertical: 4,
		borderRadius: 12,
		zIndex: 1,
	},
	badgeText: {
		fontSize: 12,
		fontWeight: "bold",
	},
	productImage: {
		width: "30%",
		height: 100,
		borderRadius: 8,
		marginBottom: 12,
		resizeMode: "cover",
		marginTop: 15,
	},
	detailsContainer: {
		marginBottom: 12,
	},
	productName: {
		fontSize: 18,
		fontWeight: "bold",
		color: Colors.light.text,
		marginBottom: 4,
	},
	priceContainer: {
		flexDirection: "row",
		alignItems: "baseline",
		marginBottom: 4,
	},
	price: {
		fontSize: 20,
		fontWeight: "bold",
		color: Colors.light.primary,
	},
	quantity: {
		fontSize: 14,
		color: Colors.light.text,
		opacity: 0.7,
	},
	timestamp: {
		fontSize: 12,
		color: Colors.light.text,
		opacity: 0.6,
	},
	actionsContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		position: "relative",
	},
	favoriteButton: {
		padding: 8,
	},
});
