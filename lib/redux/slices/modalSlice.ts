import { IDiaglogInfo } from "@/types/dialogInfo";
import { createSlice } from "@reduxjs/toolkit";

interface ModalSliceState {
  isOpen: boolean;
  paymentModal: boolean;
  dialogInfo: IDiaglogInfo | null;
  showMobileSidebar: boolean;
  modalTitle?: string;
}

const initialState: ModalSliceState = {
  isOpen: false,
  paymentModal: false,
  dialogInfo: null,
  showMobileSidebar: false,
  modalTitle: "",
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      if (action.payload) {
        state.dialogInfo = action.payload;
      }
    },
    closeModal: (state) => {
      state.paymentModal = false;
      state.isOpen = false;
    },
    setPaymentModal: (state, action) => {
      state.paymentModal = action.payload;
    },
    setShowMobileSidebar: (state, action) => {
      state.showMobileSidebar = action.payload;
    },
    setModalTitle: (state, action) => {
      state.modalTitle = action.payload;
    },
  },
});

export const {
  openModal,
  closeModal,
  setShowMobileSidebar,
  setPaymentModal,
  setModalTitle,
} = modalSlice.actions;

export default modalSlice.reducer;
