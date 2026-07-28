import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/Home/HomeScreen';
import LoginScreen from '../screens/Auth/LoginScreen';
import RegisterScreen from '../screens/Auth/RegisterScreen';
import SavedPropertiesScreen from '../screens/saved/SavedPropertiesScreen';
import NotificationsScreen from '../screens/notifications/NotificationScreen';
import PropertiesScreen from '../screens/Property/PropertiesScreen';
import PropertyDetailsScreen from '../screens/Property/PropertyDetailsScreen';
import AgentProfileScreen from '../screens/Agent/AgentProfileScreen';
import UserProfileScreen from '../screens/User/UserProfileScreen';
import AddPropertyScreen from '../screens/AddProperty/AddPropertyScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import EditProfileScreen from '../screens/Profile/EditProfileScreen';
import ChangePasswordScreen from '../screens/Profile/ChangePasswordScreen';
import MyPropertiesScreen from '../screens/MyProperties/MyPropertiesScreen';
import SetPasswordScreen from '../screens/Profile/SetPasswordScreen';
import EditPropertyScreen from '../screens/EditProperty/EditPropertyScreen';
import UserLeadsScreen from '../screens/leads/UserLeadsScreen';
import AgentLeadsScreen from '../screens/leads/AgentLeadsScreen';
import AdminLeadsScreen from '../screens/leads/AdminLeadsScreen';
import LeadDetailScreen from '../screens/leads/LeadDetailScreen';
import BecomeAgentScreen from '../screens/Subscribe/BecomeAgentScreen';
import CheckoutScreen from '../screens/Checkout/CheckoutScreen';
import SearchScreen from '../screens/Search/SearchScreen';
import AgentDashboardScreen from '../screens/Agent/AgentDashboardScreen';
import SupportHomeScreen from '../screens/support/SupportHomeScreen';
import SupportChatScreen from '../screens/support/SupportChatScreen';
import CreateTicketScreen from '../screens/support/CreateTicketScreen';
import AdminSupportHomeScreen from '../screens/admin/AdminSupportHomeScreen';
import AdminSupportChatScreen from '../screens/admin/AdminSupportChatScreen';
import ForgotPasswordScreen from '../screens/Auth/ForgotPasswordScreen';
import ResetPasswordScreen from '../screens/Auth/ResetPasswordScreen';
import PrivacyPolicyScreen from "../screens/PrivacyPolicy/PrivacyPolicyScreen"
import AboutUsScreen from "../screens/AboutUs/AboutUsScreen"

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />

      <Stack.Screen name="Login" component={LoginScreen} />

      <Stack.Screen name="Register" component={RegisterScreen} />

      <Stack.Screen name="SavedProperties" component={SavedPropertiesScreen} />

      <Stack.Screen name="Notifications" component={NotificationsScreen} />

      <Stack.Screen name="Properties" component={PropertiesScreen} />

      <Stack.Screen name="PropertyDetails" component={PropertyDetailsScreen} />

      <Stack.Screen name="AddProperty" component={AddPropertyScreen} />

      <Stack.Screen name="MyProperties" component={MyPropertiesScreen} />

      <Stack.Screen
        name="AgentProfile"
        component={AgentProfileScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="UserProfile" component={UserProfileScreen} />

      <Stack.Screen name="EditProfile" component={EditProfileScreen} />

      <Stack.Screen name="EditProperty" component={EditPropertyScreen} />

      <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />

      <Stack.Screen name="SetPassword" component={SetPasswordScreen} />

      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />

      <Stack.Screen name="UserLeads" component={UserLeadsScreen} />

      <Stack.Screen name="AgentLeads" component={AgentLeadsScreen} />

      <Stack.Screen name="AdminLeads" component={AdminLeadsScreen} />

      <Stack.Screen name="LeadDetails" component={LeadDetailScreen} />

      <Stack.Screen name="Subscribe" component={BecomeAgentScreen} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} />

      <Stack.Screen name="Search" component={SearchScreen} />

      <Stack.Screen name="AgentDashboard" component={AgentDashboardScreen} />

      {/* <Stack.Screen
        name="Subscription"
        component={SubscriptionScreen}
      /> */}

      <Stack.Screen name="SupportHome" component={SupportHomeScreen} />
      <Stack.Screen name="CreateTicket" component={CreateTicketScreen} />
      <Stack.Screen name="SupportChat" component={SupportChatScreen} />

      <Stack.Screen
        name="AdminSupportHome"
        component={AdminSupportHomeScreen}
      />

      <Stack.Screen
        name="AdminSupportChat"
        component={AdminSupportChatScreen}
      />
      <Stack.Screen name="AboutUs" component={AboutUsScreen} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />


    </Stack.Navigator>
  );
}
