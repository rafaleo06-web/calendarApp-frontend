import { useState, useMemo } from "react";
import { addHours, differenceInSeconds } from "date-fns";
import Swal from "sweetalert2";
import { useUiStore } from "../../hooks/useUiStore";
import { useEffect } from "react";
import { useCalendarStore } from "../../hooks/useCalendarStore";

export const useCalendarModal = () => {
  const { activeEvent, startSavingEvent } = useCalendarStore();
  // const [openModal, setOpenModal] = useState(true);
  const { isDateModalOpen, closeDateModal } = useUiStore();
  const [sendSubmit, setSendSubmit] = useState(false);
  const [formValues, setFormValues] = useState({
    title: "",
    notes: "",
    start: new Date(),
    end: addHours(new Date(), 2),
  });

  const titleClass = useMemo(() => {
    if (!sendSubmit) return "";
    return formValues.title.length > 0 ? "is-valid" : "is-invalid";
  }, [formValues.title, sendSubmit]);

  useEffect(() => {
    if (activeEvent !== null) {
      setFormValues({ ...activeEvent });
    }
  }, [activeEvent]);

  const onInputChanged = ({ target }) => {
    setFormValues({ ...formValues, [target.name]: target.value });
  };

  const onDateChanged = (event, changing) => {
    setFormValues({ ...formValues, [changing]: event });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setSendSubmit(true);

    const difference = differenceInSeconds(formValues.end, formValues.start);
    if (isNaN(difference) || difference <= 0) {
      Swal.fire({
        title: "Fechas incorrectas",
        text: "Ingrese las fechas correctas",
        icon: "warning",
      });
      return;
    }
    if (formValues.title.length <= 0) {
      return;
    }
    await startSavingEvent(formValues);
    closeDateModal();
    setSendSubmit(false);
  };

  return {
    // openModal,
    isDateModalOpen,
    sendSubmit,
    formValues,
    titleClass,
    onInputChanged,
    onDateChanged,
    onSubmit,
    closeDateModal,
    // onCloseModal,
  };
};
