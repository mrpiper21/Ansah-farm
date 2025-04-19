import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastProvider } from "react-native-toast-notifications";
import AppNavigator from "./src/navigation";

const queryClient = new QueryClient();

export default function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<ToastProvider>
				<AppNavigator />
			</ToastProvider>
		</QueryClientProvider>
	);
}
