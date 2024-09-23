import React, { createContext, useState, useContext, useEffect } from "react";
import { useAuth } from "@clerk/clerk-expo";
import api from "../../API/Api";
import * as SecureStore from "expo-secure-store";

const UserContext = createContext();
const SECURE_STORE_KEY = "user_data";

export const UserProvider = ({ children }) => {
  const { isSignedIn, userId, getToken } = useAuth();
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const loadUserData = async () => {
      setIsLoading(true);
      try {
        const storedData = await SecureStore.getItemAsync(SECURE_STORE_KEY);
        if (isMounted && storedData) {
          setUserData(JSON.parse(storedData));
        } else {
          await fetchUserData();
        }
      } catch (error) {
        console.error("Error loading user data:", error);
        if (isMounted) {
          await fetchUserData();
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };
    if (isSignedIn && userId) {
      loadUserData();
    } else {
      setUserData(null);
      SecureStore.deleteItemAsync(SECURE_STORE_KEY);
      console.log("Deleting stored user data");
      setIsLoading(false);
    }
    return () => {
      isMounted = false;
    };
  }, [isSignedIn, userId]);

  const fetchUserData = async () => {
    if (!isSignedIn || !userId) {
      console.log("User is not signed in or userId is not available");
      return;
    }
    console.log("Inside FetchUserData in UserContext", userId);
    try {
      const token = await getToken();
      const response = await api.get(`/zig360/api/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserData(response.data.body);
      await SecureStore.setItemAsync(
        SECURE_STORE_KEY,
        JSON.stringify(response.data.body)
      );
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  };

  const addUser = async (userData) => {
    try {
      const response = await api.post("/zig360/api/user", userData);
      console.log("addUser response", response.data);
      setUserData(userData);
      await SecureStore.setItemAsync(
        SECURE_STORE_KEY,
        JSON.stringify(userData)
      );
      return response.data;
    } catch (error) {
      console.error("Error adding new user:", error);
      throw error;
    }
  };

  const updateUserData = async (updatedUserData) => {
    if (!isSignedIn || !userId) {
      console.log("User is not signed in or userId is not available");
      return;
    }
    try {
      const token = await getToken();
      const response = await api.put(
        `/zig360/api/user/${userId}`,
        updatedUserData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updatedData = response.data;
      setUserData(updatedUserData);
      await SecureStore.setItemAsync(
        SECURE_STORE_KEY,
        JSON.stringify(updatedUserData)
      );
      return updatedData;
    } catch (error) {
      console.error("Error updating user data:", error);
      throw error;
    }
  };

  const refreshUserData = async () => {
    if (!isSignedIn || !userId) {
      console.log("User is not signed in or userId is not available");
      return;
    }
    console.log("refreshUserData: userId", userId);
    setIsLoading(true);
    try {
      await fetchUserData();
    } catch (error) {
      console.error("Error refreshing user data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <UserContext.Provider
      value={{ userData, updateUserData, refreshUserData, addUser, isLoading }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
