import React, { useEffect, useState } from "react"
import Input from "../ui/Input";
import Radio from "../ui/Radio";
import UploadFile from '../ui/UploadFile'
import Button from "../ui/Button";
import axios from "axios";
import Success from '../assets/Success'
import { createTextMask } from 'redux-form-input-masks';

const SectionThree = ({ position }) => {
    const initErrorState = {
        name: false,
        email: false,
        phone: false,
        photo: false // Додано поле помилки для фото
    }
    const initialState = {
        name: '',
        email: '',
        phone: '',
        position_id: 1,
        photo: null
    }
    const emailPattern = new RegExp(
        "^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])$"
    );
    const phonePattern = new RegExp("^\\+{0,1}380([0-9]{9})$");
    const [state, setState] = useState(initialState);
    const [token, setToken] = useState()
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(initErrorState);
    const [errorResponse, setErrorResponse] = useState('')
    const [inputTouched, setInputTouched] = useState({
        name: false,
        email: false,
        phone: false
    });

    useEffect(() => {
        axios.get('https://frontend-test-assignment-api.abz.agency/api/v1/token')
            .then(res => {
                setToken(res.data)
            })
    }, [])

    const phoneMask = createTextMask({
        pattern: '(999) 999-9999',
    });

    const isFormFilled =
        state.name !== '' &&
        state.email !== '' &&
        state.phone !== '' &&
        state.position_id !== null &&
        state.photo !== null;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputTouched({
            ...inputTouched,
            [name]: true // Позначає, що поле було торкнуте
        });

        switch (name) {
            case "name":
                setError(
                    prevState => ({
                        ...prevState, name: inputTouched.name && (value.length < 2 || value.length > 60) ? "Username should contain 2-60 characters" : ""
                    }));
                break;
            case "email":
                setError(prevState => ({
                    ...prevState, email: inputTouched.email && !emailPattern.test(value) ? "User email must be a valid email" : ""
                }))
                break;
            case "phone":
                setError(prevState => ({
                    ...prevState, phone: inputTouched.phone && !phonePattern.test(value) ? "User phone number should start with code of Ukraine +380" : ""
                }));
                break;
            default:
                setError("");
                break;
        }
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleRadioChange = (e) => {
        setState(prevState => ({
            ...prevState,
            position_id: parseInt(e.target.value)
        }));
    };



    const handlePhotoChange = (event) => {
        const [file] = event.target.files;
        if (file) {
            setState(prevState => ({
                ...prevState,
                photo: file
            }));
            setError(prevError => ({
                ...prevError,
                photo: false // Скидаємо помилку для фото, якщо файл вибрано
            }));
        } else {
            setError(prevError => ({
                ...prevError,
                photo: true // Встановлюємо помилку для фото, якщо файл не вибрано
            }));
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // Використайте state для передачі даних
        const formData = new FormData();
        formData.append("photo", state.photo);
        formData.append("name", state.name);
        formData.append("email", state.email);
        formData.append("position_id", state.position_id);
        formData.append("phone", state.phone);
        axios.post('https://frontend-test-assignment-api.abz.agency/api/v1/users', formData, {
            headers: { Token: token.token }
        }).then(response => {

            if (response.data.success) {
                setSuccess(true)
                setTimeout(() => {
                    setSuccess(false)
                }, 2000)
                setState(initialState)
            } else { console.log(response.data.message) }
        })
            .catch((error) => {

                setErrorResponse(error.message)
            });
    }
    return (
        <div className="section-three">
            <div className="container">
                <div className="block">
                    <p className="title">Working with POST request</p>
                    {success ? (<>
                        <p className="title">User successfully registered</p>
                        <Success />
                    </>) : (
                        <form className="form" onSubmit={handleSubmit}>
                            <Input
                                label={'Your name'}
                                name={"name"}
                                required={true}
                                value={state.name}
                                error={error.name && inputTouched.name && state.name.length < 2 ? 'Username should contain 2-60 characters' : ''}
                                onChange={handleInputChange} />
                            <Input
                                label={'Email'}
                                name={"email"}
                                required={true}
                                error={error.email && inputTouched.email && !emailPattern.test(state.email) ? 'User email must be a valid email' : ''}

                                value={state.email}
                                onChange={handleInputChange} />
                            <Input
                                label={'Phone'}
                                name={"phone"}
                                error={error.phone && inputTouched.phone && !phonePattern.test(state.phone) ? 'User phone number should start with code of Ukraine +380' : ''}
                                value={state.phone}
                                required={true}
                                type={'tel'}
                                pattern={"^\\+380[0-9]{9}$"}
                                description={'+38 (XXX) XXX - XX - XX'}
                                phoneMask={phoneMask}
                                onChange={handleInputChange} />

                            <div className="radio-group">
                                <p className="text">Select your position</p>
                                {position?.map(pos => (
                                    <Radio
                                        pos={pos}
                                        key={pos.id}
                                        onChange={handleRadioChange}
                                        selectedPosition={state.position_id} />
                                ))} </div>

                            <UploadFile
                                name={"photo"}
                                required={true}
                                error={error.photo && state.photo === null ? 'Select file' : ''}
                                value={state?.photo?.name}
                                onChange={handlePhotoChange}
                            />
                            {errorResponse && <p className="error">{errorResponse}</p>}
                            <Button disabled={!isFormFilled}>Sign up</Button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    )
};

export default SectionThree;
