// screens/ProductDetailsScreen.tsx
import { RouteProp } from '@react-navigation/native';
import { StyleSheet, Text, View, Image, ScrollView, ActivityIndicator } from 'react-native';
import { useQuery } from '@tanstack/react-query'
import { getProductDetails } from '../../../apis/product';
import { Colors } from '../../../constants/Colors';
import Button from '../../../components/buttons/basic-button';
import responsive from '../../../helpers/responsive';

type ProductStackParamList = {
  'product-details': { id: string };
};

type ProductDetailsRouteProp = RouteProp<ProductStackParamList, 'product-details'>;

interface ProductDetailsProps {
  route: ProductDetailsRouteProp;
}

const ProductDetailsScreen = ({ route }: ProductDetailsProps) => {
  const { id } = route.params;

  console.log("product id -",id)

  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['product', id],
    queryFn: () => getProductDetails(id),
  });

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.light.primary} />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: {error.message}</Text>
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Product not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {product.imageUrl && (
        <Image source={{ uri: product.imageUrl }} style={styles.productImage} resizeMode="cover" />
      )}
      
      <View style={styles.detailsContainer}>
        <Text style={styles.productName}>{product.name}</Text>
        
        <View style={styles.priceContainer}>
          <Text style={styles.price}>${product.price.toFixed(2)}</Text>
          <Text style={styles.quantity}>{product.quantity}</Text>
        </View>
        
        {product.category && (
          <View style={styles.categoryContainer}>
            <Text style={styles.categoryLabel}>Category:</Text>
            <Text style={styles.category}>{product.category}</Text>
          </View>
        )}
        
        {product.description && (
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionLabel}>Description:</Text>
            <Text style={styles.description}>{product.description}</Text>
          </View>
        )}
        
        <View style={styles.farmerContainer}>
          <Text style={styles.farmerLabel}>Sold by:</Text>
          <View style={styles.farmerInfo}>
            {product.farmer.avatar && (
              <Image source={{ uri: product.farmer.avatar }} style={styles.avatar} />
            )}
            <View style={styles.farmerText}>
              <Text style={styles.farmerName}>{product.farmer.userName}</Text>
              <Text style={styles.farmerEmail}>{product.farmer.email}</Text>
            </View>
          </View>
        </View>
        <Button style={{borderRadius: 30, marginTop: responsive.Dw(60)}}>
        <Text>
          Purchase
        </Text>
      </Button>
      </View>
      
    </ScrollView>
  );
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
  errorText: {
    color: Colors.status.error,
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  productImage: {
    width: '100%',
    height: 300,
  },
  detailsContainer: {
    padding: 16,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.light.text,
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  price: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.light.primary,
  },
  quantity: {
    fontSize: 16,
    color: Colors.light.text,
    opacity: 0.8,
  },
  categoryContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  categoryLabel: {
    fontWeight: 'bold',
    color: Colors.light.text,
    marginRight: 4,
  },
  category: {
    color: Colors.light.text,
  },
  descriptionContainer: {
    marginBottom: 16,
  },
  descriptionLabel: {
    fontWeight: 'bold',
    color: Colors.light.text,
    marginBottom: 4,
  },
  description: {
    color: Colors.light.text,
    lineHeight: 22,
  },
  farmerContainer: {
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.light.accent_green,
  },
  farmerLabel: {
    fontWeight: 'bold',
    color: Colors.light.text,
    marginBottom: 8,
  },
  farmerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  farmerText: {
    flex: 1,
  },
  farmerName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.text,
  },
  farmerEmail: {
    fontSize: 14,
    color: Colors.light.text,
    opacity: 0.7,
  },
});

export default ProductDetailsScreen;