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
    console.error('Razorpay Payment Error:', err);

    if (err?.code === 0) {
      Toast.show({
        type: 'info',
        text1: 'Payment Cancelled',
        text2: 'You cancelled the payment.',
      });
    } else {
      Toast.show({
        
        type: 'error',
        text1: 'Payment Failed',
        text2:
          err?.description ||
          err?.data?.message ||
          'Something went wrong. Please try again.',
      });
    }
  }
}

// import RazorpayCheckout from 'react-native-razorpay';
// import Toast from 'react-native-toast-message';
// import { RAZORPAY_KEY_ID } from '@env';

// export async function startRazorpayPayment({
//   plan,
//   user,
//   createOrder,
//   verifyPayment,
//   refetchSubscription,
//   refetchUser,
//   navigation,
// }) {
//   console.log('========================================');
//   console.log('🚀 STARTING RAZORPAY PAYMENT');
//   console.log('========================================');
//   console.log('Plan:', plan);
//   console.log('Razorpay Key:', RAZORPAY_KEY_ID);

//   try {
//     console.log('STEP 1️⃣ : Creating Razorpay Order...');

//     const order = await createOrder(plan).unwrap();
//     console.log('✅ ORDER RECEIVED');
//     console.log(order);
//     console.log('✅ STEP 1 SUCCESS');
//     console.log('Order Response:');
//     console.log(JSON.stringify(order, null, 2));

//     const options = {
//       key: RAZORPAY_KEY_ID,
//       amount: order.amount,
//       currency: 'INR',
//       order_id: order.id,

//       name: 'NestMe',
//       description: `${plan} Agent Subscription`,

//       prefill: {
//         name: user?.name || '',
//         email: user?.email || '',
//         contact: user?.phone || '',
//       },

//       theme: {
//         color: '#4F46E5',
//       },
//     };

//     console.log('STEP 2️⃣ : Opening Razorpay Checkout...');
//     console.log('Checkout Options:');
//     console.log(JSON.stringify(options, null, 2));

//     const payment = await RazorpayCheckout.open(options);

//     console.log('✅ STEP 2 SUCCESS');
//     console.log('Payment Response:');
//     console.log(JSON.stringify(payment, null, 2));

//     console.log('STEP 3️⃣ : Verifying Payment...');

//     const result = await verifyPayment({
//       razorpay_order_id: payment.razorpay_order_id,
//       razorpay_payment_id: payment.razorpay_payment_id,
//       razorpay_signature: payment.razorpay_signature,
//     }).unwrap();

//     console.log('✅ STEP 3 SUCCESS');
//     console.log('Verification Response:');
//     console.log(JSON.stringify(result, null, 2));

//     if (result.success) {
//       console.log('🎉 PAYMENT VERIFIED');

//       await refetchSubscription?.();
//       await refetchUser?.();

//       Toast.show({
//         type: 'success',
//         text1: 'Subscription Activated 🎉',
//         text2: 'Welcome to your Agent plan.',
//       });

//       navigation.replace('AgentDashboard');
//     } else {
//       console.log('❌ Verification returned success = false');
//     }
//   } catch (err) {
//     console.log('========================================');
//     console.log('❌ RAZORPAY ERROR');
//     console.log('========================================');

//     console.log('Raw Error:');
//     console.log(err);

//     console.log('JSON Error:');
//     try {
//       console.log(JSON.stringify(err, null, 2));
//     } catch (e) {
//       console.log('Could not stringify error');
//     }

//     console.log('Error Code:', err?.code);
//     console.log('Description:', err?.description);
//     console.log('Message:', err?.message);
//     console.log('Data:', err?.data);

//     if (err?.code === 0) {
//       Toast.show({
//         type: 'info',
//         text1: 'Payment Cancelled',
//         text2: 'You cancelled the payment.',
//       });
//     } else {
//       Toast.show({
//         type: 'error',
//         text1: 'Payment Failed',
//         text2:
//           err?.description ||
//           err?.message ||
//           err?.data?.message ||
//           'Something went wrong. Please try again.',
//       });
//     }
//   }

//   console.log('========================================');
//   console.log('🏁 PAYMENT FLOW FINISHED');
//   console.log('========================================');
// }
