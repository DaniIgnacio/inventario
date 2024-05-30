import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthPovider";
import { API_URL } from "../auth/constants";
import type { AuthResponseError } from "../types/types";

export default function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errorResponse, setErrorResponse] = useState("");
    const auth = useAuth();
    const goTo = useNavigate();


    async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();

        try{
            const response = await fetch(` ${API_URL}/login`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
            });

            if(response.ok){
                console.log("login sucefull")
                setErrorResponse("")
                goTo("/")
            } else {
                console.log("error")
                const json = (await response.json()) as AuthResponseError;
                setErrorResponse(json.body.error);
                return;
            }
        }catch(error){
            console.log(error)
        }
    }

    if(auth.isAuthenticated){
        return <Navigate to="/dashboard"/>
    }
    return (

            <div id="contenedor">
            <div id="contenedorcentrado">
                <div id="derecho">
                    <div className="titulo">
                        Bienvenido al Sistema de inventario
                    </div>
                    <hr />
                    <div className="pie-form">
                        <Link to="/" className="nav-link">¿Perdiste tu contraseña?</Link> 
                        <Link to="/signup" className="nav-link">¿No tienes Cuenta? Registrate</Link>
                        <hr />
                    </div>
                </div>
                <div id="login">
                    <form id="loginform" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input id="usuario" type="text" name="usuario" 
                            value={username} 
                            onChange={(e)=> setUsername(e.target.value)}  />
                            <label htmlFor="usuario">Usuario</label>
                        </div>
                        
                        <div className="form-group">
                            <input id="password" type="password" name="password" 
                            value={password} 
                            onChange={(e)=> setPassword(e.target.value)}  />
                            <label htmlFor="password">Contraseña</label>
                            {!!errorResponse && <div className="errorMessage">{errorResponse}</div>}
                        </div>
                        
                        <button type="submit" title="Ingresar" name="Ingresar">INICIAR SESIÓN</button>
                    </form>
                </div>
            </div>
        </div>
        
    );
}