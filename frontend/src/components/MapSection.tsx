import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

function MapSection({ places }) {

    // คำนวนศูนย์กลางแผนที่
    const calculateCenter = (data) => {
        if (!data || data.length === 0) return [13.8068, 100.5274]; 

        try {
            const total = data.reduce((acc, curr) => {
                if (curr.location && curr.location.lat && curr.location.lng) {
                    acc.lat += curr.location.lat;
                    acc.lng += curr.location.lng;
                    acc.count += 1;
                }
                return acc;
            }, { lat: 0, lng: 0, count: 0 });

            if (total.count === 0) return [13.8068, 100.5274];
            return [total.lat / total.count, total.lng / total.count];
        } catch (error) {
            console.error("Error calculating center:", error);
            return [13.8068, 100.5274];
        }
    };

    const currentCenter = calculateCenter(places);

    function ChangeView({ places }) {
        const map = useMap();

        useEffect(() => {
            if (places && places.length > 0) {
                // สร้างกลุ่มของพิกัดทั้งหมดที่มี
                const bounds = L.latLngBounds(places.map(res => [
                    res.location.lat, 
                    res.location.lng
                ]));
                
                // สั่งให้แผนที่ขยับไปครอบคลุมพื้นที่ทั้งหมดนั้น
                map.fitBounds(bounds, { padding: [50, 50] }); 
                // padding ช่วยให้หมุดไม่ไปชิดขอบจอเกินไป
            }
        }, [places, map]);

        return null;
    }

    return (
        <section className="w-full h-[300px] md:h-full md:flex-1 relative order-1 md:order-2 shrink-0">
            <MapContainer 
                center={currentCenter} 
                zoom={10} 
                style={{ height: '100%', width: '100%' }}
            >
                <ChangeView center={currentCenter} />
                <TileLayer
                    attribution='&copy; OpenStreetMap contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                
                {places && places.map((res) => {
                    if (!res.location || !res.location.lat || !res.location.lng) return null;
                    
                    return (
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
                    );
                })}
            </MapContainer>
        </section>
    );
}

export default MapSection;