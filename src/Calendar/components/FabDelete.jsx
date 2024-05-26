import { useCalendarStore } from "../../hooks/useCalendarStore";
import { useUiStore } from "../../hooks/useUiStore";

export const FabDelete = () => {
  const { startDeleteEvent, hasEventSelected } = useCalendarStore();
  const { isDateModalOpen } = useUiStore();

  const handleDelete = async () => {
    await startDeleteEvent();
  };

  return (
    <button
      className={"btn btn-danger fab-danger"}
      style={{ display: hasEventSelected && !isDateModalOpen ? "" : "none" }}
      onClick={handleDelete}
    >
      <i className="fas fa-trash-alt"></i>
    </button>
  );
};
