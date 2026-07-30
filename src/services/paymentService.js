import RazorpayCheckout from 'react-native-razorpay';
import Toast from 'react-native-toast-message';
import { RAZORPAY_KEY_ID } from '@env';

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
      key: RAZORPAY_KEY_ID, // Move to env/config
      amount: order.amount,
      currency: 'INR',
      order_id: order.id,

      name: 'NestMe',

      description: `${plan} Agent Subscription`,

      prefill: {
        name: user?.name || '',
        email: user?.email || '',
        contact: user?.phone || '',
      },

      theme: {
        color: '#4F46E5',
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

      Toast.show({
        type: 'success',
        text1: 'Subscription Activated 🎉',
        text2: 'Welcome to your Agent plan.',
      });

      navigation.replace('AgentDashboard');
    }
  } catch (err) {
  console.error("Razorpay Payment Error:", err);

  if (err?.code === 0) {
    Toast.show({
      type: "info",
      text1: "Payment Cancelled",
      text2: "You cancelled the payment.",
    });
  } else {
    Toast.show({
      type: "error",
      text1: "Payment Failed",
      text2:
        err?.description ||
        err?.data?.message ||
        "Something went wrong. Please try again.",
    });
  }
}
}
