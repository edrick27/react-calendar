import { addHours, differenceInSeconds } from 'date-fns';
import { useEffect, useMemo, useState } from 'react';
import Modal from 'react-modal';
import DatePicker, { registerLocale } from "react-datepicker";
import { es } from 'date-fns/locale/es';

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import "react-datepicker/dist/react-datepicker.css";
import { useCalendarStore, useUiStore } from '../../hooks';

registerLocale('es', es)

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');

export const CalendarModal = () => {

    const { isDateModalOpen, toogleDateModal } = useUiStore();
    const { activeEvent, startSavingEvent } = useCalendarStore();

    const [formSubmitted, setFormSubmitted] = useState(false)

    const [formValues, setFormValues] = useState({
        title: '',
        notes: '',
        start: new Date(),
        end: addHours(new Date(), 1),
    });

    const titleClass = useMemo(() => {
        if (!formSubmitted) return '';

        return formValues.title.trim().length <= 0 ? '' : 'is-valid';
    }, [formValues.title, formSubmitted]);

    useEffect(() => {
        if (activeEvent !== null) {
            setFormValues({ ...activeEvent });
        } 
    }, [activeEvent])
    

    const onChangeForm = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        });
    }

    const onDateChange = (event, changingValue) => {
        setFormValues({
            ...formValues,
            [changingValue]: event
        });
    }

    const onCloseModal = () => {
        toogleDateModal(false);
    }

    const onSubmit = async (event) => {
        event.preventDefault();

        setFormSubmitted(true);

        const diff = differenceInSeconds(formValues.end, formValues.start);

        if (isNaN(diff) || diff < 0) {
            Swal.fire('Fechas incorrectas','Revisar las fechas ingresadas','error');
        }

        if (formValues.title.trim().length <= 0) return;

        await startSavingEvent(formValues);
        onCloseModal();
        setFormSubmitted(false);
    }

    return (
        <Modal
            isOpen={isDateModalOpen}
            onRequestClose={onCloseModal}
            style={customStyles}
            className="modal"
            overlayClassName="modal-fondo"
            closeTimeoutMS={200}
        >
            <h1> Nuevo evento </h1>
            <hr />
            <form className="container" onSubmit={onSubmit}>

                <div className="form-group mb-2">
                    <label>Fecha y hora inicio</label>
                    <DatePicker
                        className="form-control"
                        selected={formValues.start}
                        onChange={ (event) => onDateChange(event, 'start') }
                        dateFormat="Pp"
                        locale="es"
                        showTimeSelect
                        timeCaption='Hora'
                    />
                </div>

                <div className="form-group mb-2">
                    <label>Fecha y hora fin</label>
                    <DatePicker
                        className="form-control"
                        minDate={ formValues.start }
                        selected={formValues.end}
                        onChange={ (event) => onDateChange(event, 'end') }
                        dateFormat="Pp"
                        locale="es"
                        showTimeSelect
                        timeCaption='Hora'
                    />
                </div>

                <hr />
                <div className="form-group mb-2">
                    <label>Titulo y notas</label>
                    <input
                        type="text"
                        className={ `form-control ${titleClass}`}
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={formValues.title}
                        onChange={onChangeForm}
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group mb-2">
                    <textarea
                        type="text"
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={formValues.notes}
                        onChange={onChangeForm}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
        </Modal>
    )
}
