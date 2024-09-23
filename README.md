Clerk minimal repoduction of the issue.

The issue:
Social signUp & signIN not working when moving to the Clerk production instance.

App.js
Set the variable clerkPublishableKey between Clerk instances.

process.env.EXPO_PUBLIC_OUT_DEV_CLERK_PUBLISHABLE_KEY and social login & email login works.

process.env.EXPO_PUBLIC_OUT_PRD_CLERK_PUBLISHABLE_KEY and email login works (use example test@testing.com/Qwedcxzaq!@#) but social login is not working - redirectURL issue

Testing with feedback from Jacob.

I added the redirect linking to see and it is wrong. It is showing as com.zig360.zig360app://oauth-native-callback, but in the dasboard, it should be https://clerk.zig360.com/v1/oauth_callback. I tested to hard code the redirectUrl, but still getting the mismatch error, even with this set.

const onSelectGoogleAuth = useCallback(async () => {
console.log("Linking URL :", Linking.createURL("/oauth-native-callback"));
try {
const { createdSessionId, setActive } = await googleAuth({
redirectUrl: "https://clerk.zig360.com/v1/oauth_callback",
});
// redirectUrl: Linking.createURL("/oauth-native-callback"),
// });
