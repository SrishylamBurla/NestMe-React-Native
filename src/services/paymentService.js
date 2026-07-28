import RazorpayCheckout from "react-native-razorpay";
import { Alert } from "react-native";

export async function startRazorpayPayment({
  plan,
  user,
  createOrder,
  verifyPayment,
  refetchSubscription,
  refetchUser,
  navigation,
}) {
  try {
    // Create Razorpay Order
    const order = await createOrder(plan).unwrap();

    const options = {
      key: "rzp_test_SX6Krmlo4bHVj6", // Move to env/config
      amount: order.amount,
      currency: "INR",
      order_id: order.id,

      name: "NestMe",

      description: `${plan} Agent Subscription`,

      prefill: {
        name: user?.name || "",
        email: user?.email || "",
        contact: user?.phone || "",
      },

      theme: {
        color: "#4F46E5",
      },
    };

    const payment = await RazorpayCheckout.open(options);

    // Verify payment with your backend
    const result = await verifyPayment({
      razorpay_order_id: payment.razorpay_order_id,
      razorpay_payment_id: payment.razorpay_payment_id,
      razorpay_signature: payment.razorpay_signature,
    }).unwrap();

    if (result.success) {
      await refetchSubscription?.();
      await refetchUser?.();

      Alert.alert(
        "Success",
        "Subscription Activated!"
      );

      navigation.replace("AgentDashboard");
    }
  } catch (err) {
    if (err?.code === 0) {
      Alert.alert(
        "Cancelled",
        "Payment was cancelled."
      );
    } else {
      Alert.alert(
        "Payment Failed",
        err?.description ||
          err?.data?.message ||
          "Something went wrong."
      );
    }
  }
}