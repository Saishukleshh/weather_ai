import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for missing marker icons in React Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
});

L.Marker.prototype.options.icon = DefaultIcon;

const UserMap = ({ location }) => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);

  useEffect(() => {
   
    if (mapRef.current && !mapInstance.current) {
     
      const initialLat = location ? location.latitude : 20.5937;
      const initialLng = location ? location.longitude : 78.9629;
      const zoomLevel = location ? 13 : 5;

      mapInstance.current = L.map(mapRef.current).setView([initialLat, initialLng], zoomLevel);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(mapInstance.current);
    }

    
    if (location && mapInstance.current) {
      const { latitude, longitude } = location;
      
      
      mapInstance.current.setView([latitude, longitude], 13);

      
      mapInstance.current.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          mapInstance.current.removeLayer(layer);
        }
      });

      
      L.marker([latitude, longitude])
        .addTo(mapInstance.current)
        .bindPopup("<b>Farm Location</b><br>Selected Coordinates")
        .openPopup();
    }
  }, [location]);

  return (
    <div className="bg-slate-800 rounded-xl overflow-hidden shadow-lg border border-slate-700 h-full">
      <div className="p-3 bg-slate-800 border-b border-slate-700 flex justify-between items-center">
        <h3 className="font-semibold text-slate-200">Live Location Map</h3>
        {location && <span className="text-xs text-emerald-400 bg-emerald-900/30 px-2 py-1 rounded">Active</span>}
      </div>
      {/* This div is where the map renders */}
      <div ref={mapRef} style={{ height: "300px", width: "100%" }} />
    </div>
  );
};

export default UserMap;