//import { useState } from "react";
import { Global } from "../../helpers/Global";
import UserFrom from "../../hooks/UserFrom";
import alerts from "../../helpers/Alerts";


const Register = () => {

    const { form, changed } = UserFrom({});
    //const [saved, setSaved] = useState('')
    const saveUser = async (e) => {
        //prevenir atualziacion de pantalla
        e.preventDefault();
        //regoger datos del formulario
        let newUser = form;
        //guardar usario a la bd usando un metodo fecth
        const request = await fetch(Global.url + 'user/registro', {
            method: 'POST',
            body: JSON.stringify(newUser),//convertir a JSON string
            headers: {
                'Content-Type': 'application/json'
            }
        });
        // recibir informacion de la request para que sea legible
        const data = await request.json();
        if (data.status === 'success') {
            //setSaved('saved');
            alerts('Registro exitoso', 'Usuario registrado correctamente', 'success');
            const myForm = document.querySelector("#publication-form");
            myForm.reset();
        } else if (data.status === 'warning') {
            //setSaved('warning');
            alerts('Datos repetidos', 'Nombre de usuario o correo ya existen. Utilice otro', 'warning')
        } else {
            //setSaved('error');
            alerts('Error', 'Usuario no registrado correctamente', 'error')
        }
    }
    return (
        <>
            <header className="content__header">
                <h1 className="content__title">Registro</h1>

            </header>
            <h2 className="warning">RECOMENDACIONES: </h2>
            <p className="warningp">

                Esta app se ha realizado con el único fin de aprendizaje y prácticas. Se recomienda y sugiere que al
                momento de registrarse y
                probar la app utilice, solamente correos ficticios o inventados en lugar de correos personales reales.
            </p>

            <div className="content__posts">
                {/**
                    <strong className="alert alert-success">{saved === 'saved' ? 'Usuario registrado correctamente.' : ''}</strong>
                <strong className="alert alert-danger">{saved === 'error' ? 'Usuario no registrado correctamente.' : ''}</strong>
                <strong className="alert alert-danger">{saved === 'warning' ? 'Nombre de usuario o correo ya existen. Utilice otro' : ''}</strong>
                 */}

                <form className="register-from" id='publication-form' onSubmit={saveUser}>
                    <div className="form-group">
                        <label htmlFor="name">Nombres</label>
                        <input type="text" name="name" onChange={changed}></input>
                    </div>

                    <div className="form-group">
                        <label htmlFor="surname">Apellidos</label>
                        <input type="text" name="surname" onChange={changed}></input>
                    </div>

                    <div className="form-group">
                        <label htmlFor="nick">Nickanme</label>
                        <input type="text" name="nick" onChange={changed}></input>
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Correo electrónico</label>
                        <input type="name" name="email" onChange={changed}></input>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Cotraseña</label>
                        <input type="password" name="password" onChange={changed}></input>
                    </div>

                    <input type="submit" value='Regístrate' className="btn btn-succes"></input>
                </form>
            </div>
        </>
    )
}

export default Register
