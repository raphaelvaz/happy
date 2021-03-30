import React from 'react';
import Sidebar from '../components/Sidebar'
import { HiOutlineLocationMarker } from 'react-icons/hi'
import { RiErrorWarningLine } from 'react-icons/ri'
import { FiTrash, FiEdit3 } from 'react-icons/fi'
import { Map, Marker, TileLayer } from 'react-leaflet';
import mapIcon from "../utils/mapIcon";
import '../styles/pages/dashboard.css'

export default function Dashboard() {
    return (
        <>
            <Sidebar>
                <div>
                    <button><HiOutlineLocationMarker size={23} color="#FFF" /></button>
                    <button><RiErrorWarningLine size={23} color="#FFF" /></button>
                </div>
            </Sidebar>
            <div className="page-body">
                <header>
                    <h1>Orfanados Cadastrados</h1>
                </header>
                <div className='dash-main'>
                    <div className="orpha-map">
                        <Map
                            center={[-32.0358677, -52.1006924]}
                            style={{ width: '100%', height: 280, borderRadius: '20px 20px 0 0' }}
                            zoom={15}
                        >
                            <TileLayer
                                url={"https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"}
                            />
                            {/* {position.latitude !== 0 &&
                        <Marker interactive={false} icon={mapIcon} position={[position.latitude, position.longitude]} />} */}
                        </Map>
                        <div className="orpha-info">
                            <strong>Orfanato Esp.</strong>
                            <div>
                                <button><FiEdit3 size={23} color="#15B6D6" /></button>
                                <button><FiTrash size={23} color="#15B6D6" /></button>
                            </div>
                        </div>
                    </div>
                    <div className="orpha-map">
                        <Map
                            center={[-32.0358677, -52.1006924]}
                            style={{ width: '100%', height: 280, borderRadius: '20px 20px 0 0' }}
                            zoom={15}
                        >
                            <TileLayer
                                url={"https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"}
                            />
                            {/* {position.latitude !== 0 &&
                        <Marker interactive={false} icon={mapIcon} position={[position.latitude, position.longitude]} />} */}
                        </Map>
                        <div className="orpha-info">
                            <strong>Orfanato Esp.</strong>
                            <div>
                                <button><FiEdit3 size={23} color="#15B6D6" /></button>
                                <button><FiTrash size={23} color="#15B6D6" /></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}