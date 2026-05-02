import { create } from 'zustand';
import { profileService } from './appwrite-service';
import { BusinessProfile } from './types';

interface BusinessState {
  publicProfiles: BusinessProfile[];
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchPublicProfiles: () => Promise<void>;
  addProfileToState: (profile: BusinessProfile) => void;
}

export const useBusinessStore = create<BusinessState>((set) => ({
  publicProfiles: [],
  isLoading: false,
  error: null,

  fetchPublicProfiles: async () => {
    set({ isLoading: true, error: null });
    try {
      const profiles = await profileService.getPublicProfiles();
      set({ publicProfiles: profiles, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  addProfileToState: (profile: any) => {
    set((state) => ({
      publicProfiles: [profile, ...state.publicProfiles].slice(0, 6)
    }));
  }
}));
