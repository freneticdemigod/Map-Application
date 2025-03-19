import React, { useEffect, useRef, useState } from 'react';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import OSM from 'ol/source/OSM';
import { Draw, Modify, Snap } from 'ol/interaction';
import { Fill, Stroke, Style } from 'ol/style';
import Header from './Header';
import '../styles/MapPage.css';

const MapPage = () => {
  const mapRef = useRef();
  const [map, setMap] = useState(null);
  const [drawType, setDrawType] = useState('Polygon');
  const [vectorSource, setVectorSource] = useState(null);
  const [drawInteraction, setDrawInteraction] = useState(null);
  const [selectedFeature, setSelectedFeature] = useState(null);

  useEffect(() => {
    const source = new VectorSource();
    setVectorSource(source);

    const vector = new VectorLayer({
      source: source,
      style: new Style({
        fill: new Fill({
          color: 'rgba(255, 165, 0, 0.2)'
        }),
        stroke: new Stroke({
          color: '#ff8000',
          width: 2
        })
      })
    });

    const olMap = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        vector
      ],
      view: new View({
        center: [0, 0],
        zoom: 2
      })
    });

    const modify = new Modify({ source });
    olMap.addInteraction(modify);

    setMap(olMap);

    return () => {
      if (olMap) {
        olMap.setTarget(null);
      }
    };
  }, []);

  useEffect(() => {
    if (!map || !vectorSource) return;

    if (drawInteraction) {
      map.removeInteraction(drawInteraction);
    }

    if (drawType) {
      const draw = new Draw({
        source: vectorSource,
        type: drawType
      });

      map.addInteraction(draw);

      const snap = new Snap({ source: vectorSource });
      map.addInteraction(snap);

      setDrawInteraction(draw);
    }
  }, [map, vectorSource, drawType]);

  const handleDrawPolygon = () => {
    setDrawType('Polygon');
  };

  const handleClear = () => {
    if (vectorSource) {
      vectorSource.clear();
    }
  };

  const handleDeleteSelected = () => {
    if (selectedFeature && vectorSource) {
      vectorSource.removeFeature(selectedFeature);
      setSelectedFeature(null);
    }
  };

  useEffect(() => {
    if (!map) return;

    const selectFeature = (e) => {
      if (selectedFeature) {
        selectedFeature.setStyle(null);
      }

      map.forEachFeatureAtPixel(e.pixel, (feature) => {
        setSelectedFeature(feature);
        feature.setStyle(new Style({
          fill: new Fill({
            color: 'rgba(255, 0, 0, 0.2)'
          }),
          stroke: new Stroke({
            color: '#ff0000',
            width: 2
          })
        }));
        return true; 
      });
    };

    map.on('click', selectFeature);

    return () => {
      map.un('click', selectFeature);
    };
  }, [map, selectedFeature]);

  return (
    <div className="map-page">
      <Header />
      <div className="map-container">
        <div className="toolbar">
          <button onClick={handleDrawPolygon}>Draw Polygon</button>
          <button onClick={handleDeleteSelected} disabled={!selectedFeature}>
            Delete Selected
          </button>
          <button onClick={handleClear}>Clear All</button>
        </div>
        <div ref={mapRef} className="map"></div>
      </div>
    </div>
  );
};

export default MapPage;