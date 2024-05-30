import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthPovider";
import { API_URL } from "../auth/constants";
import { AuthResponseError } from "../types/types";

export default function Signup() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorResponse, setErrorResponse] = useState("");
    const auth = useAuth();
    const goTo = useNavigate();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();

        try {
            const response = await fetch(`${API_URL}/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
            });

            if (response.ok) {
                console.log("User created successfully");
                setErrorResponse("");
                goTo("/");
            } else {
                console.log("Error");
                const json = (await response.json()) as AuthResponseError;
                setErrorResponse(json.body.error);
                return;
            }
        } catch (error) {
            console.log(error);
        }
    }

    if (auth.isAuthenticated) {
        return <Navigate to="/dashboard" />;
    }

    return (
        <div id="contenedor">
            <div id="contenedorcentrado">
                <div id="derecho">
                    <div className="titulo">
                        Registrate !!
                    </div>
                    <hr />
                    <div className="pie-form">
                        <Link to="">Bienvenido a nuestro sistema de inventario</Link>
                        <Link to="/" className="nav-link">volver</Link> 
                        <hr />
                    </div>
                </div>
                <div id="login">
                    <form id="loginform" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input id="usuario" type="text" name="usuario" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} />
                            <label htmlFor="usuario">Usuario</label>
                        </div>
                        <div className="form-group">
                            <input id="password" type="password" name="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}  />
                            <label htmlFor="password">Contraseña</label>
                            {!!errorResponse && <div className="errorMessage">{errorResponse}</div>}
                        </div>
                        <button type="submit" title="Ingresar" name="Ingresar">Registrarse</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
