import { StyleSheet, Text, View, ScrollView, Image, ActivityIndicator, FlatList } from 'react-native'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { RouteProp } from '@react-navigation/native'
import { baseUrl } from '../../../../config/api'
import { Colors } from '../../../../constants/Colors'
import { IconSymbol } from '../../../../components/ui/IconSymbol'
import ProductCard from '../../../../components/cards/productCard'
import { Product } from '../../../../store/cart-store'

interface Order {
  _id: string;
  status: string;
  totalAmount: number;
  createdAt: string;
}

interface Farmer {
  _id: string;
  userName: string;
  email: string;
  profileImage?: string;
  location?: string;
  description?: string;
  phone?: string;
  createdAt: string;
  orders?: Order[];
  productsCount: number;
}

type RootFarmersParamList = {
  "farmers-details": {id: string}
}

type FarmersDetailsRouteProp = RouteProp<RootFarmersParamList, "farmers-details">

interface Props {
  route: FarmersDetailsRouteProp
}

const FarmerDetailsScreen = ({route}: Props) => {
  const { id } = route.params

  // Fetch farmer details - now includes orders and productsCount
  const { data: farmer, isLoading: isLoadingFarmer, error } = useQuery<Farmer>({
    queryKey: ['farmer', id],
    queryFn: async () => {
      const response = await axios.get(`${baseUrl}/api/users/farmers`)
      return response.data.data
    }
  })

  console.log("farmer - ", farmer)

  // Fetch farmer's products
  const { data: products, isLoading: isLoadingProducts } = useQuery<Product[]>({
    queryKey: ['farmerProducts', id],
    queryFn: async () => {
      const response = await axios.get(`${baseUrl}/api/users/farmers/single/${id}?populate=orders`)
      return response.data.data
    }
  })

  console.log("productssss - ", products)

  if (isLoadingFarmer) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.light.primary} />
      </View>
    )
  }

  if (!farmer) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Farmer not found</Text>
      </View>
    )
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Farmer Profile Section */}
      <View style={styles.profileSection}>
        {farmer.profileImage ? (
          <Image source={{ uri: farmer.profileImage }} style={styles.avatar} />
        ) : (
          <View style={[styles.avatar, styles.avatarPlaceholder]}>
            <IconSymbol name="person" size={48} color={Colors.light.text} />
          </View>
        )}
        
        <Text style={styles.farmerName}>{farmer.userName}</Text>
        
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{farmer.productsCount}</Text>
            <Text style={styles.statLabel}>Products</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{farmer.orders?.length || 0}</Text>
            <Text style={styles.statLabel}>Recent Orders</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Joined</Text>
            <Text style={styles.statDate}>{formatDate(farmer.createdAt)}</Text>
          </View>
        </View>
        
        {farmer.location && (
          <View style={styles.detailRow}>
            <IconSymbol name="location" size={20} color={Colors.light.primary} />
            <Text style={styles.detailText}>{farmer.location}</Text>
          </View>
        )}
        
        {farmer.email && (
          <View style={styles.detailRow}>
            <IconSymbol name="mail" size={20} color={Colors.light.primary} />
            <Text style={styles.detailText}>{farmer.email}</Text>
          </View>
        )}
        
        {farmer.phone && (
          <View style={styles.detailRow}>
            <IconSymbol name="phone" size={20} color={Colors.light.primary} />
            <Text style={styles.detailText}>{farmer.phone}</Text>
          </View>
        )}
        
        {farmer.description && (
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionText}>{farmer.description}</Text>
          </View>
        )}
      </View>

      {/* Products Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Available Products</Text>
        
        {isLoadingProducts ? (
          <ActivityIndicator size="small" color={Colors.light.primary} />
        ) : products?.length ? (
          <FlatList
            key="products-list"
            data={products}
            renderItem={({ item }) => <ProductCard product={item} />}
            keyExtractor={(item) => item._id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.productsList}
          />
        ) : (
          <View style={styles.emptyProducts}>
            <IconSymbol name="info" size={32} color={Colors.light.text} />
            <Text style={styles.emptyText}>No products available</Text>
          </View>
        )}
      </View>

      {/* Recent Orders Section */}
      {farmer.orders && farmer.orders.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Orders</Text>
          <View style={styles.ordersContainer}>
            {farmer.orders.map((order) => (
              <View key={order._id} style={styles.orderCard}>
                <View style={styles.orderHeader}>
                  <Text style={styles.orderDate}>{formatDate(order.createdAt)}</Text>
                  <View style={[
                    styles.statusBadge, 
                    { backgroundColor: getStatusColor(order.status) }
                  ]}>
                    <Text style={styles.statusText}>{order.status}</Text>
                  </View>
                </View>
                <View style={styles.orderDetails}>
                  <Text style={styles.orderAmount}>
                    ${order.totalAmount.toFixed(2)}
                  </Text>
                  <IconSymbol name="paperclip" size={16} color={Colors.light.text} />
                </View>
              </View>
            ))}
          </View>
        </View>
      )}
    </ScrollView>
  )
}

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'completed':
      return Colors.light.accent_green;
    case 'processing':
      return Colors.light.primary;
    case 'pending':
      return '#FFA500'; // Orange
    default:
      return Colors.light.text;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  contentContainer: {
    paddingBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.light.background,
  },
  profileSection: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: Colors.light.surface,
    borderRadius: 12,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  avatarPlaceholder: {
    backgroundColor: Colors.light.accent_green,
    justifyContent: 'center',
    alignItems: 'center',
  },
  farmerName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.light.text,
    marginBottom: 12,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.light.primary,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.light.text,
    opacity: 0.8,
  },
  statDate: {
    fontSize: 12,
    color: Colors.light.text,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 16,
    color: Colors.light.text,
    marginLeft: 8,
  },
  descriptionContainer: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.light.accent_green,
  },
  descriptionText: {
    fontSize: 15,
    color: Colors.light.text,
    lineHeight: 22,
    textAlign: 'center',
  },
  section: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.light.primary,
    marginBottom: 16,
  },
  productsList: {
    paddingBottom: 10,
  },
  emptyProducts: {
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: Colors.light.text,
    marginTop: 8,
  },
  errorText: {
    color: Colors.light.error,
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  ordersContainer: {
    marginBottom: 16,
  },
  orderCard: {
    backgroundColor: Colors.light.surface,
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  orderDate: {
    fontSize: 14,
    color: Colors.light.text,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    color: 'white',
    fontWeight: '500',
  },
  orderDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.light.text,
  }
})

export default FarmerDetailsScreen