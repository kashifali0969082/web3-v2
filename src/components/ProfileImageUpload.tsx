import React, { useState, useEffect, useRef } from "react";
import { Upload, UserCircle } from "lucide-react";
import { useToast } from "./hooks/use-toast";

interface ProfileImageUploadProps {
  walletAddress: string;
  onImageChange?: (imageUrl: string) => void;
}

export function ProfileImageUpload({
  walletAddress,
  onImageChange,
}: ProfileImageUploadProps) {
  const [image, setImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Get image from localStorage
  const getLocalStorageImage = (address: string): string | null => {
    try {
      const key = `profile_image_${address.toLowerCase()}`;
      return localStorage.getItem(key);
    } catch (e) {
      console.error("Error accessing localStorage:", e);
      return null;
    }
  };

  // Save image to localStorage
  const saveLocalStorageImage = (address: string, imageUrl: string) => {
    try {
      const key = `profile_image_${address.toLowerCase()}`;
      localStorage.setItem(key, imageUrl);
    } catch (e) {
      console.error("Error saving to localStorage:", e);
    }
  };

  // Upload handler (mocked for now)
  const uploadImageToServer = async (imageData: string, contentType: string) => {
    if (!walletAddress) {
      toast({
        title: "Upload error",
        description: "Wallet address not available",
        variant: "destructive",
      });
      return null;
    }

    try {
      // Simulate success
      console.log("Uploading image to server...");
      saveLocalStorageImage(walletAddress, imageData);
      return imageData;
    } catch (error) {
      console.error("Error uploading image:", error);
      saveLocalStorageImage(walletAddress, imageData);
      toast({
        title: "Server upload failed",
        description: "Image was saved locally but server upload failed",
        variant: "destructive",
      });
      return imageData;
    }
  };

  // Load image on component mount
  useEffect(() => {
    if (!walletAddress) return;
    const cachedImage = getLocalStorageImage(walletAddress);
    if (cachedImage) {
      setImage(cachedImage);
      onImageChange?.(cachedImage);
    }
  }, [walletAddress, onImageChange]);

  // Handle image file selection
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Image must be less than 5MB",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    const reader = new FileReader();
    reader.onload = async (e) => {
      const imageData = e.target?.result as string;
      if (imageData) {
        try {
          const uploaded = await uploadImageToServer(imageData, file.type);
          if (uploaded) {
            setImage(uploaded);
            onImageChange?.(uploaded);
          }
        } catch (error) {
          console.error("Error handling image upload:", error);
          setImage(imageData);
          onImageChange?.(imageData);
        } finally {
          setIsUploading(false);
        }
      }
    };

    reader.onerror = () => {
      console.error("Error reading file");
      setIsUploading(false);
    };

    reader.readAsDataURL(file);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center">
      <div
        className="relative mb-2 cursor-pointer"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onClick={triggerFileInput}
      >
        {image ? (
          <div className="relative rounded-full w-24 h-24 overflow-hidden">
            <img
              src={image}
              alt="Profile"
              className="w-full h-full object-cover"
            />
            {isHovering && (
              <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center transition-all duration-200">
                <Upload className="w-8 h-8 text-white animate-pulse" />
              </div>
            )}
          </div>
        ) : (
          <div className="rounded-full w-24 h-24 bg-gray-800 flex items-center justify-center border-2 border-dashed border-gray-600">
            <UserCircle className="w-16 h-16 text-gray-500" />
            {isHovering && (
              <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center rounded-full transition-all duration-200">
                <Upload className="w-8 h-8 text-white animate-pulse" />
              </div>
            )}
          </div>
        )}
      </div>

      {isUploading && (
        <div className="mt-2 text-xs text-gray-400 flex items-center">
          <div className="animate-spin mr-2 h-3 w-3 border-2 border-primary border-r-transparent rounded-full"></div>
          Uploading...
        </div>
      )}

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
    </div>
  );
}
