import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '../../../constants/Colors';
// import { useRouter } from "expo-router";

const SessionScreen = () => {
	const [activeTab, setActiveTab] = useState("chat");

	// Mock data for chat and orders
	const chatData = [
		{
			id: "1",
			name: "Farm Support",
			lastMessage: "Your soil analysis is ready",
			time: "10:30 AM",
			unread: true,
		},
		{
			id: "2",
			name: "Equipment Rental",
			lastMessage: "Your tractor is available",
			time: "Yesterday",
			unread: false,
		},
		{
			id: "3",
			name: "Seed Supplier",
			lastMessage: "New hybrid seeds available",
			time: "Monday",
			unread: true,
		},
	];

	const orderData = [
		{
			id: "1",
			orderNumber: "#ORD-1001",
			status: "Delivered",
			date: "Apr 15, 2023",
			items: "Organic Fertilizer x 5",
		},
		{
			id: "2",
			orderNumber: "#ORD-1002",
			status: "Pending",
			date: "Apr 10, 2023",
			items: "Seed Pack x 3, Tools x 2",
		},
		{
			id: "3",
			orderNumber: "#ORD-1003",
			status: "Completed",
			date: "Apr 5, 2023",
			items: "Irrigation System x 1",
		},
	];

	// const router = useRouter();
	//TODO

	return (
		<View style={styles.container}>
			{/* Header */}
			<View style={styles.header}>
				<Text style={styles.headerText}>Messages & Orders</Text>
			</View>

			{/* Tab Bar */}
			<View style={styles.tabContainer}>
				<TouchableOpacity
					style={[styles.tab, activeTab === "chat" && styles.activeTab]}
					onPress={() => setActiveTab("chat")}
				>
					<Text
						style={[
							styles.tabText,
							activeTab === "chat" && styles.activeTabText,
						]}
					>
						Chat
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={[styles.tab, activeTab === "orders" && styles.activeTab]}
					onPress={() => setActiveTab("orders")}
				>
					<Text
						style={[
							styles.tabText,
							activeTab === "orders" && styles.activeTabText,
						]}
					>
						Orders
					</Text>
				</TouchableOpacity>
			</View>

			{/* Tab Content */}
			{activeTab === "chat" ? (
				<FlatList
					data={chatData}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => (
						<TouchableOpacity
							// onPress={() =>
							// 	router.push({
							// 		pathname: "/[chatID]",
							// 		params: { chatID: item.id },
							// 	})
							// }
							style={styles.chatItem}
						>
							<View style={styles.chatAvatar}>
								<Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
							</View>
							<View style={styles.chatContent}>
								<View style={styles.chatHeader}>
									<Text style={styles.chatName}>{item.name}</Text>
									<Text style={styles.chatTime}>{item.time}</Text>
								</View>
								<Text
									style={[
										styles.chatMessage,
										item.unread && styles.unreadMessage,
									]}
									numberOfLines={1}
								>
									{item.lastMessage}
								</Text>
							</View>
							{item.unread && <View style={styles.unreadBadge} />}
						</TouchableOpacity>
					)}
				/>
			) : (
				<FlatList
					data={orderData}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => (
						<View style={styles.orderItem}>
							<View style={styles.orderHeader}>
								<Text style={styles.orderNumber}>{item.orderNumber}</Text>
								<Text
									style={[
										styles.orderStatus,
										item.status === "Delivered" && styles.statusDelivered,
										item.status === "Pending" && styles.statusProcessing,
										item.status === "Completed" && styles.statusShipped,
									]}
								>
									{item.status}
								</Text>
							</View>
							<Text style={styles.orderDate}>{item.date}</Text>
							<Text style={styles.orderItems}>{item.items}</Text>
							<TouchableOpacity style={styles.orderButton}>
								<Text style={styles.orderButtonText}>View Details</Text>
							</TouchableOpacity>
						</View>
					)}
				/>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  header: {
    padding: 16,
    paddingTop: 50,
    backgroundColor: Colors.light.accent_green,
  },
  headerText: {
    fontSize: 22,
    fontWeight: '600',
    color: Colors.light.primary,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.light.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.background,
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.light.accent,
  },
  tabText: {
    fontSize: 16,
    color: Colors.light.text,
  },
  activeTabText: {
    color: Colors.light.primary,
    fontWeight: '600',
  },
  chatItem: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    backgroundColor: Colors.light.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.background,
  },
  chatAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.light.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    color: Colors.light.surface,
    fontSize: 20,
    fontWeight: 'bold',
  },
  chatContent: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  chatName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.text,
  },
  chatTime: {
    fontSize: 12,
    color: Colors.light.text,
    opacity: 0.6,
  },
  chatMessage: {
    fontSize: 14,
    color: Colors.light.text,
    opacity: 0.7,
  },
  unreadMessage: {
    fontWeight: '600',
    opacity: 1,
  },
  unreadBadge: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.light.accent,
    marginLeft: 8,
  },
  orderItem: {
    padding: 16,
    backgroundColor: Colors.light.surface,
    marginBottom: 8,
    borderRadius: 8,
    marginHorizontal: 16,
    marginTop: 16,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.text,
  },
  orderStatus: {
    fontSize: 14,
    fontWeight: '500',
  },
  statusDelivered: {
    color: Colors.status.success,
  },
  statusProcessing: {
    color: Colors.status.warning,
  },
  statusShipped: {
    color: Colors.status.info,
  },
  orderDate: {
    fontSize: 14,
    color: Colors.light.text,
    opacity: 0.7,
    marginBottom: 8,
  },
  orderItems: {
    fontSize: 14,
    color: Colors.light.text,
    marginBottom: 12,
  },
  orderButton: {
    backgroundColor: Colors.light.primary,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  orderButtonText: {
    color: Colors.light.surface,
    fontWeight: '600',
  },
})

export default SessionScreen