import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar'
import { Map, Marker, TileLayer } from 'react-leaflet';
import mapIcon from "../utils/mapIcon";
import api from '../services/api'

import { HiOutlineLocationMarker } from 'react-icons/hi'
import { RiErrorWarningLine } from 'react-icons/ri'
import { FiTrash, FiEdit3, FiArrowRight } from 'react-icons/fi'
import '../styles/pages/dashboard.css'
import Orphanage from './Orphanage';

interface Orphanage {
    id: number;
    latitude: number;
    longitude: number;
    name: string;
    accepted: boolean;
}

export default function Dashboard() {
    const [orphanages, setOrphanages] = useState<Orphanage[]>([]);
    const [title, setTitle] = useState('Orfanados Cadastrados');
    const [IsPendingPage, setIsPendingPage] = useState(false);

    useEffect(() => {
        api.get('orphanages/accepted').then(response => {
            setOrphanages(response.data);
        })
    }, []);

    const handleRegisteredOrphanages = () => {
        setTitle('Orfanados Cadastrados')
        setIsPendingPage(false)
        api.get('orphanages/accepted').then(response => {
            setOrphanages(response.data);
        })
    }

    const handlePedingOrphanages = () => {
        setTitle('Orfanados Pendentes')
        setIsPendingPage(true)
        api.get('orphanages/pending/').then(response => {
            setOrphanages(response.data)
        })

    }

    return (
        <>
            <Sidebar>
                <div>
                    <button style={!IsPendingPage ? { backgroundColor: '#FFD666' } : undefined} onClick={handleRegisteredOrphanages}><HiOutlineLocationMarker size={23} color="#FFF" /></button>
                    <button style={IsPendingPage ? { backgroundColor: '#FFD666' } : undefined} onClick={handlePedingOrphanages}><RiErrorWarningLine size={23} color="#FFF" /></button>
                </div>
            </Sidebar>
            <div className="page-body">
                <header>
                    <h1>{title}</h1>
                </header>
                {orphanages.map(orphanage => {
                    return (
                        <div className='dash-main'>
                            <div className="orpha-map">
                                <Map
                                    center={[orphanage.latitude, orphanage.longitude]}
                                    style={{ width: '100%', height: 280, borderRadius: '20px 20px 0 0' }}
                                    zoom={15}
                                >
                                    <TileLayer
                                        url={"https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"}
                                    />
                                    {orphanage.latitude !== 0 &&
                                        <Marker interactive={false} icon={mapIcon} position={[orphanage.latitude, orphanage.longitude]} />}
                                </Map>
                                <div className="orpha-info">
                                    <strong>{orphanage.name}</strong>
                                    <div>
                                        {orphanage.accepted ? <button ><FiTrash size={23} color="#15B6D6" /></button> : <button ><FiArrowRight size={23} color="#15B6D6" /></button>}
                                        {orphanage.accepted ? <button ><FiEdit3 size={23} color="#15B6D6" /></button> : ''}
                                    </div>
                                </div>
                            </div>

                        </div>
                    )
                })}
            </div>
        </>
    )
}