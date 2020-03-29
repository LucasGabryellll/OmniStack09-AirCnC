import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom'; //cria link que quando o user clica ele vai para outra rota
import socketio from 'socket.io-client';
import api from '../../services/api';

import './styles.css';

//para percorre o array e mostrar todos os spots uso o useState armazenados dentro de um estado

export default function Dashboard() {
    //Q: carregar info com um componente exibido em tela
    //R: executar função assim que user acessar a page
    const [spots, setSpots] = useState([]); //sintaxe do estado
                                            //spots: vem do backend como array
    
    const [requests, setRequests] = useState([]);                                
    
    const user_id = localStorage.getItem('user');
    
    const socket = useMemo(() => socketio('http://localhost:3333', {
        query: { user_id },
    }), [user_id]);
    
    useEffect(() => {
        socket.on('booking_request', data => {
            setRequests([...requests, data]);
        })//ouvir o socket do backend
    }, [requests, socket]); 
 
    useEffect(()=> {
        //2º params: escolhe(quando for alterada) quando a função vai ser executada
        async function loadSpots (){
            const user_id = localStorage.getItem('user');
            const response = await api.get('/dashboard', {
                headers: { user_id }
            });

            setSpots(response.data);
        }
        loadSpots();
    }, []);//executa apenas 1 vez

    async function handleAccept (id) {
        await api.post(`/bookings/${id}/approvals`);

        setRequests(requests.filter(request => request._id != id));
    }
 
    async function handleReject (id) {
        await api.post(`/bookings/${id}/rejections`);

        setRequests(requests.filter(request => request._id != id));

    }

    return (
        <>  
            <ul className= "notifications">
                {requests.map(request => (
                    <li key={request._id}>
                        <p>
                            <strong>{request.user.email}</strong> está solicitando uma reserva em <strong>{request.spot.company}</strong> para a data: <strong>{request.date}</strong>
                        </p>
                        <button className="accept" onClick={() => handleAccept(request._id)} >ACEITAR</button>
                        <button className="reject" onClick={() => handleReject(request._id)} >REJEITAR</button>
                    </li>
                ))}
            </ul>

            <ul className= 'spot-list'>
                {spots.map(spot => (
                    <li key={spot._id}>
                        <header style={{ backgroundImage: `url(${spot.thumbnail_url})` }} />
                        <strong>{spot.company}</strong>
                        <span>{spot.price ? `R$${spot.price}/dia` : `GRATUITO` }</span>
                    </li>
                ))}
            </ul>

            <Link to= "/new">
                <button className="btn" >Cadastrar novo spot</button>
            </Link>
        </>
    )
}