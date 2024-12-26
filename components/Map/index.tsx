'use client'

import 'leaflet/dist/leaflet.css'
import React from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import style from './map.module.scss'

export function Map() {
    return <>
        {/* <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
            integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
        ></script> */}
        <MapContainer className={style.container} center={[52.505, 19.1]} zoom={6}>
            <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
        </MapContainer>
    </>
}

export default Map;