"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { HostRegistrationForm } from "@/components/auth/host-registration-form";
import { OTPVerification } from "@/components/auth/otp-verification";
import { RegistrationForm } from "@/components/auth/registration-form";
import { useAuthStore } from "@/lib/store/auth-store";
import { authService } from "@/lib/api/auth";
import { saveTokens } from "@/src/lib/auth";
import { showToast, handleApiError } from "@/lib/utils/toast";
import { useMarket } from "@/lib/market-context";

interface AllFormData {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  referralCode?: string;
  otp?: string;
  password?: string;
  confirmPassword?: string;
}

// Map active market to backend country name
function getCountryFromMarket(market: "NG" | "GB" | "ZA"): string {
  if (market === "NG") return "Nigeria";
  if (market === "ZA") return "South Africa";

  return "United Kingdom"; // GB
}

const HostSignupPage: React.FC = () => {
  console.log("HostSignupPage rendered");
  const router = useRouter();
  const searchParams = useSearchParams();
  const { market } = useMarket();
  // Set initial step based on URL param only once on mount
  const initialStep = React.useMemo(() => {
    const verified = searchParams.get("verified") === "true";

    return verified ? 2 : 1;
  }, []);
  const [step, setStep] = useState(initialStep);
  const [formData, setFormData] = useState<Partial<AllFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { hostFormData, clearHostFormData } = useAuthStore();

  // Removed useEffect for step reset

  const nextStep = () => {
    setStep((prev) => {
      console.log("Advancing to step", prev + 1);

      return prev + 1;
    });
  };

  const handleNext = async (data: any) => {
    console.log("handleNext called with data:", data, "current step:", step);
    const newData =
      typeof data === "object" && data !== null && !Array.isArray(data)
        ? data
        : { otp: data };

    setFormData((prev) => ({ ...prev, ...newData }));

    if (step === 2) {
      setIsSubmitting(true);
      try {
        if (!hostFormData || !hostFormData.email) {
          throw new Error("Host form data or email not found");
        }
        // Verify OTP
        await authService.verifyOtp(hostFormData.email, newData.otp);
        showToast.success("OTP verified successfully!");
        console.log("OTP verified, advancing to step", step + 1);
        setStep((prev) => prev + 1);
        setIsSubmitting(false);
      } catch (error) {
        handleApiError(error, "OTP verification failed. Please try again.");
        setIsSubmitting(false);
      }

      return;
    }
    if (step === 3) {
      setIsSubmitting(true);

      try {
        if (!hostFormData) {
          throw new Error("Host form data not found");
        }

        // Get user location from localStorage
        let location = "POINT(0.0 0.0)"; // Default location

        if (typeof window !== "undefined") {
          const userLocation = localStorage.getItem("userLocation");

          if (userLocation) {
            try {
              const coords = JSON.parse(userLocation);

              if (coords.latitude && coords.longitude) {
                location = `POINT(${coords.longitude} ${coords.latitude})`;
              }
            } catch (error) {
              console.warn(
                "Failed to parse user location from localStorage:",
                error,
              );
            }
          }
        }

        // Set country from market selection
        const country = getCountryFromMarket(market);

        // Combine data from all forms
        const signupData: any = {
          user_type: "Host",
          first_name: hostFormData.firstName,
          last_name: hostFormData.lastName,
          email: hostFormData.email,
          username: data.username,
          password: data.password,
          phone_number: hostFormData.phoneNumber,
          location: location,
          country: country,
          city: hostFormData.city,
        };

        if (hostFormData.referralCode) {
          signupData.referral_code = hostFormData.referralCode;
        }

        // Call the signup endpoint
        const response = await authService.signup(signupData);

        // Save tokens
        if (response.data?.access_token && response.data?.refresh_token) {
          saveTokens(response.data.access_token, response.data.refresh_token);
        }

        // Save user profile to auth store
        if (response.data) {
          const { setUser } =
            require("@/lib/store/auth-store").useAuthStore.getState();

          setUser(response.data);
        }

        // Show success toast
        showToast.success(
          "Host account created successfully! Welcome to iKook.",
        );

        // Clear form data from store
        clearHostFormData();

        // Redirect to host dashboard
        router.push("/dashboard/host");
      } catch (error) {
        handleApiError(error, "Host signup failed. Please try again.");
        setIsSubmitting(false);
      }
    } else {
      nextStep();
    }
  };

  const renderForm = () => {
    switch (step) {
      case 1:
        return <HostRegistrationForm onSubmit={handleNext} />;
      case 2:
        return (
          <OTPVerification
            isSubmitting={isSubmitting}
            onSubmit={handleNext}
            email={hostFormData?.email}
          />
        );
      case 3:
        return (
          <RegistrationForm
            formData={formData}
            isSubmitting={isSubmitting}
            userType="host"
            onSubmit={handleNext}
          />
        );
      default:
        return <div>Loading...</div>;
    }
  };

  return (
    <div className="w-full min-h-screen relative bg-[#FBFBFB] px-2 sm:px-4 md:px-6 lg:px-8">
      <main className="relative">{renderForm()}</main>
    </div>
  );
};

export default HostSignupPage;
