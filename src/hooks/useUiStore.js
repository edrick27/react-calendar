import { useDispatch, useSelector } from "react-redux"
import { onCloseDateModal, onOpenDateModal } from "../store/ui/uiSlice";

export const useUiStore = () => {

    const { 
        isDateModalOpen
    } = useSelector(state => state.ui);

    const dispatch = useDispatch();

    const toogleDateModal = (open) => {
        
        if (open) {
            dispatch(onOpenDateModal());
            return;
        }

        dispatch(onCloseDateModal());
    }

    return {
        isDateModalOpen,

        // methods
        toogleDateModal
    }
}