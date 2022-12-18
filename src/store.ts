import create from "zustand";

interface TReview {
  author: string;
  content: string;
  submitted_at: string;
}

interface TReviewStore {
  reviews: TReview[];
  setReviews: (reviews: TReview[]) => void;
  addReview: (review: TReview) => void;
}

export const useReviewStore = create<TReviewStore>()((set) => ({
  reviews: [],
  setReviews: (reviews) => set({ reviews }),
  addReview: (review) =>
    set((state) => ({ reviews: [...state.reviews, review] })),
}));
