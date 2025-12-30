import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
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
    <div className="bg-stone-200/80 rounded-xl overflow-hidden shadow-lg border border-stone-300 h-full">
      <div className="p-3 bg-stone-300/80 border-b border-stone-300 flex justify-between items-center">
        <h3 className="font-semibold text-stone-800">Live Location Map</h3>
        {location && <span className="text-xs text-emerald-600 bg-emerald-100 px-2 py-1 rounded">Active</span>}
      </div>
      { }
      <div ref={mapRef} style={{ height: "300px", width: "100%" }} />
    </div>
  );
};

export default UserMap;