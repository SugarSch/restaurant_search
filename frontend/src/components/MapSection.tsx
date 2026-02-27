import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
// นำเข้าเพื่อแก้ปัญหา Icon ไม่แสดง (ปัญหาปกติของ Leaflet ใน React)
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// แก้ไขเรื่อง Icon หาย
let DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

function MapSection({ places }) {
    // กำหนดจุดศูนย์กลาง (ควรเป็นพิกัดของร้านแรก หรือจุดกึ่งกลางของเขตนั้นๆ)
    const defaultCenter = [13.8068, 100.5274];

    return (
        <section className="hidden md:block flex-1 relative h-full">
            <MapContainer 
                center={defaultCenter} 
                zoom={13} 
                style={{ height: '100%', width: '100%' }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                
                {/* วนลูปปักหมุดแบบ React Style */}
                {places && places.map((res) => (
                    <Marker 
                        key={res.id} 
                        position={[res.location.lat, res.location.lng]}
                    >
                        <Popup>
                            <div className="text-sm">
                                <strong className="text-blue-600">{res.name}</strong><br/>
                                <span className="text-gray-500">{res.category}</span><br/>
                                <p className="mt-1 border-t pt-1 text-xs">{res.description}</p>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </section>
    );
}

export default MapSection;