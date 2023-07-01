"use client"
import React, { useEffect, useRef, useState } from "react";
import * as turf from "@turf/turf"
import Map, { Source, Layer, MapLayerMouseEvent, Popup, Marker } from 'react-map-gl';
import GeocoderControl from "./map.geocoder";
import mapboxgl from "mapbox-gl";
import { produce } from "immer";
import { Form, InputNumber, Input, Radio, Popover } from "antd";

const random = () => {
    return `id-${Math.round(Math.random() * 123321321123123)}`
}

// mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default; // eslint-disable-line import/no-webpack-loader-syntax

const MapContext = React.createContext<any>({});

export const MapProvider = (props: any) => {
    const children = props.children;
    const viewOnly = props?.viewOnly || false;
    const [loading, setLoading] = useState(false);
    const [points, setPoints] = useState<Array<Array<number>>>();
    const map: any = useRef();
    const terrainRef = useRef<any>();
    const providerRef = useRef<any>();
    const [distance, setDistance] = useState(0);
    const [elevation, setElevation] = useState(0);
    const [elevationLoss, setElevationLoss] = useState(0);
    const [lines, setLines] = useState<Array<any>>([]);
    const [pins, setPins] = useState<Array<any>>([]);
    const [mode, setMode] = useState('draw');
    const [lng, setLng] = useState(props?.lng || 105.847130);
    const [lat, setLat] = useState(props?.lat || 21.030653);
    const [popup, setPopup] = useState<any>();
    const [isImported, setIsImported] = useState<boolean>(false);

    const [geojson, setGeojson] = useState({
        'type': 'geojson',
        'data': {
            'type': 'FeatureCollection',
            'features': []
        }
    });

    const fly = (lat: number, lng: number) => {
        map?.current?.flyTo({
            center: [lat, lng],
            zoom: 16,
            essential: true
        });
    }

    useEffect(() => {

        providerRef.current = {
            inited: false,
        }
    }, [])

    useEffect(() => {
        if (map.current && providerRef.current.inited) {

        }
        if (map.current) {
            providerRef.current.inited = true;
        }
    }, [points]);

    const fitToBounds = (coordinates: Array<any>) => {
        let coordinatesMode = 'single';
        // check mode
        if (coordinates && coordinates[0] && coordinates[0][0] && coordinates[0][0][0]) {
            coordinatesMode = 'multi';
            // join
            let items: Array<any> = [];
            coordinates.map(item => item.map((x: any) => items.push(x)));
            if (items?.length === 1) {
                items.push(items[0]);
            }
            coordinates = items;
        }

        if (coordinates && coordinates[0] && coordinates[0]?.length >= 1) {
            try {
                const [minLng, minLat, maxLng, maxLat] = turf.bbox(turf.lineString(coordinates));
                if (map.current) {
                    map.current.getMap().fitBounds(
                        [
                            [minLng, minLat],
                            [maxLng, maxLat]
                        ],
                        { padding: 40, duration: 1000 }
                    );
                }
            } catch (e) {
                console.error(e);
            }
        }
    }


    return (
        <MapContext.Provider value={{
            loading,
            points, setPoints, map,
            elevation, setElevation,
            distance, setDistance,
            lines, setLines, fitToBounds, viewOnly, mode, setMode,
            geojson, setGeojson,
            pins, setPins,
            elevationLoss, setElevationLoss, lat, lng, terrainRef, popup, setPopup, setLng, setLat,
            fly, isImported, setIsImported
        }}>
            {children}
        </MapContext.Provider>
    )
}

const useMap = () => React.useContext(MapContext);

export const FormMap = (props: any) => {
    const [zoom, setZoom] = useState(14);
    const [viewState, setViewState] = useState<any>();
    const [viewMode, setViewMode] = useState<any>('streets-v12');
    const viewRef = useRef<any>();
    const [popupForm] = Form.useForm();
    const [loader, showLoader] = useState<boolean>(false)
    const {
        points,
        setPoints,
        map,
        fitToBounds,
        setElevation,
        setElevationLoss,
        setDistance,
        setLines,
        viewOnly,
        mode, setMode,
        geojson, setGeojson,
        pins, setPins,
        lines,
        lat, lng,
        terrainRef,
        popup, setPopup,
        setLng, setLat, fly, isImported, setIsImported
    } = useMap();

    useEffect(() => {
        updateView(3);
        viewRef.current = {};
    }, []);

    useEffect(() => {
        if (props?.onChange && points) {
            props?.onChange(points);
            updateView(2);
        }
    }, [points, pins]);

    useEffect(() => {
        setPoints(props?.value);
    }, []);

    const onAddPoint = (point: any) => {
        console.log(`add point:`, point)
        setPoints((prevState: any) => {
            if (!prevState) {
                return [point];
            } else {
                // @ts-ignore
                return produce(prevState, (draft: any) => {
                    draft.push(point)
                })
            }
        });
    }

    const onMapClick = (event: MapLayerMouseEvent) => {
        if (!viewOnly) {
            if (mode === 'draw') {
                onAddPoint([event.lngLat.lng, event.lngLat.lat]);
            }
            if (mode === 'pin' && !popup) {
                onAddPin([event.lngLat.lng, event.lngLat.lat]);
            }
        }
    }

    const updateView = (p: any) => {
        let coordinates = points;
        // mode multiLine
        if (coordinates && coordinates[0] && coordinates[0][0] && coordinates[0][0][0]) {
            let pointViews: Array<any> = [];
            coordinates.map((items: any) => {
                return ((items || []).map((item: any, index: number) => {
                    const isEnd = index === ((items || []).length - 1);
                    const isStart = index === 0;
                    return pointViews.push({
                        'type': 'Feature',
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [item[0], item[1]]
                        },
                        'properties': {
                            'id': Math.round(Math.random() * 1232141312644),
                            'type': isStart ? 'point-start' : (isEnd ? 'point-end' : ''),
                        }
                    })
                }))
            })
            const gjson = {
                'type': 'FeatureCollection',
                'features': [
                    // points view
                    ...pointViews,
                    //line view
                    ...coordinates.map((item: any) => {
                        return {
                            'type': 'Feature',
                            'geometry': {
                                'type': 'LineString',
                                'coordinates': (item || [])
                            },
                            'properties': {
                                'id': random(),
                                'type': 'line',
                            }
                        }
                    })
                ]
            };
            console.log(gjson)
            setGeojson(gjson);
            return;
        }
        const endPoint = (coordinates || [])[(coordinates || []).length - 1];
        const gjson = {
            'type': 'FeatureCollection',
            'features': [
                //line view
                {
                    'type': 'Feature',
                    'geometry': {
                        'type': 'LineString',
                        'coordinates': (coordinates || []),

                    },
                    'properties': {
                        'id': random(),
                        'type': 'line',
                    }
                },
                //mouse line view
                ...(endPoint && viewRef?.current?.point ? [{
                    'type': 'Feature',
                    'geometry': {
                        'type': 'LineString',
                        'coordinates': [endPoint, viewRef?.current?.point]
                    },
                    'properties': {
                        'id': random(),
                        'type': 'mouse-line',
                    }
                }] : []),
                //preview move point
                ...(viewRef?.current?.pointMove ? [{
                    'type': 'Feature',
                    'geometry': {
                        'type': 'LineString',
                        'coordinates': [viewRef?.current?.pointMove?.coordinatesPrev, viewRef?.current?.pointMove?.coordinates, viewRef?.current?.pointMove?.coordinatesNext].filter(item => !!item)
                    },
                    'properties': {
                        'id': random(),
                        'type': 'point-preview-line',
                    }
                }] : [])
            ]
        };
        setGeojson(gjson);

        console.log(geojson)
    }

    const onAddPin = (point: any) => {
        console.log(`Add pin:`, point)
        // @ts-ignore
        setPins(produce((draft: any) => {
            let maxPinNumber = -1;
            pins.map((item: any) => {
                if ((item?.properties?.index || 0) >= maxPinNumber) {
                    maxPinNumber = item.properties.index
                }
            });
            maxPinNumber = maxPinNumber + 1;
            if ((maxPinNumber) > 99) {
                maxPinNumber = 99
            }
            const item = {
                coordinates: point,
                properties: {
                    id: random(),
                    index: maxPinNumber,
                }
            };
            draft.push(item);
            onViewPopup(item);
        }))
    }
    const onUpdatePin = (pin: any, point: any) => {
        console.log(`Update pin: `, pin, point)
        // @ts-ignore
        setPins(produce((draft: Array<any>) => {
            const findIndex = draft.findIndex(item => item.properties.id === pin.properties.id);
            draft[findIndex].coordinates = point;
        }));
        setPopup(null);
    }

    const onViewPopup = (item: any) => {
        map.current.getMap().setCenter(item.coordinates)
        setPopup(item);
        popupForm.setFieldsValue({
            index: item?.properties?.index >= 0 ? item?.properties?.index : 0,
            name: item?.properties?.name || '',
            note: item?.properties?.note || ''
        });
    }

    const onSavePopup = () => {
        console.log(`Saved popup`)
        const values = popupForm.getFieldsValue();
        // @ts-ignore
        setPins(produce((draft: Array<any>) => {
            const findIndex = draft.findIndex(item => item.properties.id === popup.properties.id);
            draft[findIndex].properties = {
                ...draft[findIndex].properties,
                index: values.index,
                name: values.name,
                note: values.note,
            };
        }));
        setPopup(null);
    }
    const onRemovePopup = () => {
        console.log(`Removed popup`)
        // @ts-ignore
        setPins(produce((draft: Array<any>) => {
            const findIndex = draft.findIndex(item => item.properties.id === popup.properties.id);
            draft.splice(findIndex, 1);
        }));
        setPopup(null);
    }

    const onPreviewDraw = (event: any) => {
        if (!event) {
            if (!viewOnly && mode == 'draw') {
                viewRef.current.point = null;
                updateView(-1);
            }
        } else {
            if (!viewOnly && mode == 'draw') {
                viewRef.current.point = [event.lngLat.lng, event.lngLat.lat];
                updateView(-1);
            }
        }
    }

    return (
        <div className="map-view">

            <div className="map-container">
                <div className="mapview-bg">
                    {
                        !viewOnly ? (
                            <Map
                                ref={terrainRef}
                                mapStyle={'mapbox://styles/mapbox/streets-v11'}
                                mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX}
                                initialViewState={{
                                    zoom: zoom,
                                    longitude: lng,
                                    latitude: lat,
                                }}

                                viewState={viewState}
                                terrain={{ source: 'mapbox-dem', exaggeration: 1 }}
                            >
                                <Source
                                    id="mapbox-dem"
                                    type="raster-dem"
                                    url="mapbox://mapbox.mapbox-terrain-dem-v1"
                                    tileSize={512}
                                    maxzoom={14}
                                />
                            </Map>
                        ) : null
                    }
                </div>
                <div className="map-view-front">
                    <Map
                        ref={map}
                        mapStyle={'mapbox://styles/mapbox/' + viewMode}
                        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX}
                        initialViewState={{
                            zoom: zoom,
                            longitude: lng,
                            latitude: lat,
                        }}
                        onZoomEnd={(event: any) => {
                            setViewState(event.viewState);
                        }}
                        onMoveEnd={(event: any) => {
                            setViewState(event.viewState);
                        }}
                        // cursor={'crosshair'}
                        cursor={(mode == 'draw') ? 'crosshair' : 'pointer'}
                        onClick={onMapClick}
                        onLoad={() => {
                            fitToBounds(props?.value);
                        }}
                        onMouseMove={(event) => {
                            onPreviewDraw(event);
                        }}
                        onMouseOut={(e) => {
                            onPreviewDraw(null);
                        }}
                    >

                        <Source id="geojson" type="geojson" data={geojson}>
                            <Layer
                                id={'router-lines'}
                                type={'line'}
                                paint={{
                                    'line-color': '#D66A3E',
                                    'line-width': 5
                                }}
                                layout={{
                                    'line-cap': 'round',
                                    'line-join': 'round'
                                }}
                                filter={['==', ['get', 'type'], "line"]}
                            />
                            <Layer
                                id={'point-start'}
                                type={'circle'}
                                paint={{
                                    'circle-radius': 8.5,
                                    'circle-color': '#000000',
                                    'circle-stroke-color': '#F2EDD4',
                                    'circle-stroke-width': 2.5,
                                }}
                                filter={['==', ['get', 'type'], "point-start"]}
                            />
                            <Layer
                                id={'point-end'}
                                type={'circle'}
                                paint={{
                                    'circle-radius': 8.5,
                                    'circle-color': '#22b300',
                                    'circle-stroke-color': '#F2EDD4',
                                    'circle-stroke-width': 2.5,
                                }}
                                filter={['==', ['get', 'type'], "point-end"]}
                            />
                            <Layer
                                id={'mouse-line'}
                                type={'line'}
                                paint={{
                                    'line-color': '#D66A3E',
                                    'line-width': 2,
                                    'line-dasharray': [1, 0.5]
                                }}
                                layout={{}}
                                filter={['==', ['get', 'type'], "mouse-line"]}
                            />
                            <Layer
                                id={'point-preview-line'}
                                type={'line'}
                                paint={{
                                    'line-color': '#D66A3E',
                                    'line-width': 2,
                                    'line-dasharray': [1, 0.5]
                                }}
                                layout={{}}
                                filter={['==', ['get', 'type'], "point-preview-line"]}
                            />
                            {(points || []).map((item: any, index: number) => {
                                const isEnd = index === (points.length - 1);
                                const isStart = index === 0;
                                const isPoint = (typeof item[0] === 'number')
                                return isPoint && ((mode === 'draw') || (isEnd || isStart)) ? (
                                    <Marker
                                        onDrag={(event) => {
                                            onPreviewDraw(null);
                                            viewRef.current.pointMove = {
                                                index: index,
                                                coordinates: [event.lngLat.lng, event.lngLat.lat],
                                                coordinatesNext: points[index + 1] ? points[index + 1] : null,
                                                coordinatesPrev: points[index - 1] ? points[index - 1] : null,
                                            };
                                            updateView(-2);
                                        }}
                                        onDragEnd={(event) => {
                                            viewRef.current.pointMove = null;
                                            // @ts-ignore
                                            setPoints(produce((draft: any) => {
                                                draft[index] = [event.lngLat.lng, event.lngLat.lat];
                                            }));
                                        }}
                                        draggable={mode === 'draw'}
                                        key={index.toString()}
                                        longitude={viewRef?.current?.pointMove?.index === index ? viewRef?.current?.pointMove?.coordinates[0] : item[0]}
                                        latitude={viewRef?.current?.pointMove?.index === index ? viewRef?.current?.pointMove?.coordinates[1] : item[1]}
                                        anchor={'center'}>
                                        <div
                                            className={`${isStart ? 'w-3 h-3 bg-green-600 rounded-full' : ''} ${isEnd ? 'w-3 h-3 bg-red-600 rounded-full' : ''}`} />
                                    </Marker>
                                ) : null
                            })}
                            {(pins || []).map((item: any, index: number) => {
                                return (
                                    <Marker
                                        onDragStart={() => {
                                            viewRef.current.markerDrag = true;
                                        }}
                                        onDragEnd={(event) => {
                                            onUpdatePin(item, [event.lngLat.lng, event.lngLat.lat]);
                                            setTimeout(() => {
                                                viewRef.current.markerDrag = false;
                                            }, 500);
                                        }}
                                        draggable={mode === 'pin'}
                                        onClick={() => {
                                            if (!viewRef?.current?.markerDrag && mode === 'pin') {
                                                onViewPopup(item);
                                            }
                                        }} key={index.toString()}
                                        longitude={item?.coordinates[0]}
                                        latitude={item?.coordinates[1]}
                                        anchor={'center'}>

                                        <Popover content={<div>
                                            <p>{item.properties.note}</p>
                                        </div>}
                                            title={item.properties.name}>
                                            <div className="flex items-center justify-center w-4 h-4 text-sm rounded-full bg-sky-600">{item.properties.index}</div>
                                        </Popover>
                                    </Marker>
                                )
                            })}

                            {
                                popup && (mode === 'pin') ? <Popup
                                    anchor="left"
                                    offset={10}
                                    longitude={popup?.coordinates[0] || 0}
                                    latitude={popup?.coordinates[1] || 0}
                                    closeButton={false}
                                    closeOnClick={false}
                                    closeOnMove={false}
                                    className={'popup-view'}
                                >
                                    <div className="popup-container w-[22rem] p-2">
                                        <Form form={popupForm} onFinish={() => onSavePopup()}>
                                            <div className="flex justify-between items-center">
                                                <p>{popup?.coordinates[0] || 0}, {popup?.coordinates[1] || 0}</p>
                                                <img onClick={() => setPopup(null)} src="/icons/popup.svg" alt="" />
                                            </div>
                                            <div>
                                                <Form.Item name={'index'} label={'No.'} rules={[{ required: true }]}>
                                                    <InputNumber min={0} max={99} />
                                                </Form.Item>
                                            </div>
                                            <div className="popup-control">
                                                <Form.Item name={'name'} label={'Name'} rules={[{ required: true }]}>
                                                    <Input />
                                                </Form.Item>
                                            </div>
                                            <div className="popup-control">
                                                <Form.Item name={'note'} label={'Note'}>
                                                    <Input />
                                                </Form.Item>
                                            </div>
                                            <div className="popup-footer">
                                                <button type={'button'}
                                                    onClick={() => onRemovePopup()}>Remove</button>
                                                <button type={'submit'}>Save</button>
                                            </div>
                                        </Form>
                                    </div>
                                </Popup> : null
                            }
                        </Source>
                        <div className="drop-shadow-xl fixed z-50 px-4 py-2 flex items-center space-x-4">
                            <div className="mr-4">
                                <img src="/logo-black.svg" alt="" className="w-24" />
                                <span className="text-[#bebebe] text-sm">Travel planner</span>
                            </div>
                            <p className="text-base text-[#9b9b9b] font-semibold">Home</p>
                            <p className="text-base text-[#9b9b9b] font-semibold">Travel Advice</p>
                            <p className="text-base text-[#9b9b9b] font-semibold">Community</p>
                        </div>
                        {
                            !viewOnly ? (
                                <GeocoderControl marker={true} mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX}
                                    position="top-right" />
                            ) : null
                        }
                    </Map>
                    {/*<div className="!hidden map-view-mode">
                        <Radio.Group size={"small"} onChange={(event) => setViewMode(event.target.value)}
                            value={viewMode}>
                            <Radio value={"satellite-streets-v12"}>Satellite Streets</Radio>
                            <Radio value={"light-v11"}>Light</Radio>
                            <Radio value={"dark-v11"}>Dark</Radio>
                            <Radio value={"streets-v12"}>Streets</Radio>
                            <Radio value={"outdoors-v12"}>Outdoors</Radio>
                        </Radio.Group>
                    </div>*/}
                </div>
            </div>

            {
                !viewOnly ? (
                    <div className="mode-items space-y-2">

                        <button className="mode-item">Save</button>

                        <div className="mode-item" onClick={() => setMode('draw')}>
                            <svg width="20" height="21" viewBox="0 0 20 21" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path fill={mode === 'draw' ? '#fff' : '#ccc'}
                                    d="M6.66667 20.75C5.44444 20.75 4.39815 20.3148 3.52778 19.4444C2.65741 18.5741 2.22222 17.5278 2.22222 16.3056V7.22222C1.57407 6.98148 1.04148 6.57852 0.624444 6.01333C0.208148 5.44889 0 4.80556 0 4.08333C0 3.15741 0.324074 2.37037 0.972222 1.72222C1.62037 1.07407 2.40741 0.75 3.33333 0.75C4.25926 0.75 5.0463 1.07407 5.69444 1.72222C6.34259 2.37037 6.66667 3.15741 6.66667 4.08333C6.66667 4.80556 6.45852 5.44889 6.04222 6.01333C5.62518 6.57852 5.09259 6.98148 4.44444 7.22222V16.3056C4.44444 16.9167 4.66222 17.44 5.09778 17.8756C5.53259 18.3104 6.05556 18.5278 6.66667 18.5278C7.27778 18.5278 7.80111 18.3104 8.23667 17.8756C8.67148 17.44 8.88889 16.9167 8.88889 16.3056V5.19444C8.88889 3.97222 9.32407 2.92593 10.1944 2.05556C11.0648 1.18519 12.1111 0.75 13.3333 0.75C14.5556 0.75 15.6019 1.18519 16.4722 2.05556C17.3426 2.92593 17.7778 3.97222 17.7778 5.19444V14.2778C18.4259 14.5185 18.9585 14.9211 19.3756 15.4856C19.7919 16.0507 20 16.6944 20 17.4167C20 18.3426 19.6759 19.1296 19.0278 19.7778C18.3796 20.4259 17.5926 20.75 16.6667 20.75C15.7407 20.75 14.9537 20.4259 14.3056 19.7778C13.6574 19.1296 13.3333 18.3426 13.3333 17.4167C13.3333 16.6944 13.5415 16.0463 13.9578 15.4722C14.3748 14.8981 14.9074 14.5 15.5556 14.2778V5.19444C15.5556 4.58333 15.3381 4.06037 14.9033 3.62556C14.4678 3.19 13.9444 2.97222 13.3333 2.97222C12.7222 2.97222 12.1993 3.19 11.7644 3.62556C11.3289 4.06037 11.1111 4.58333 11.1111 5.19444V16.3056C11.1111 17.5278 10.6759 18.5741 9.80556 19.4444C8.93518 20.3148 7.88889 20.75 6.66667 20.75Z" />
                            </svg>
                        </div>
                        <div className="mode-item" onClick={() => setMode('pin')}>
                            <svg width="21" height="22" viewBox="0 0 21 22" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path fill={mode === 'pin' ? '#fff' : '#ccc'} fillRule="evenodd" clipRule="evenodd"
                                    d="M10.125 0.625C10.6773 0.625 11.125 1.07272 11.125 1.625V2.625H17.8975C18.2452 2.625 18.5679 2.80559 18.7498 3.10191L19.9773 5.10191C20.1742 5.42283 20.1742 5.82717 19.9773 6.14809L18.7498 8.14809C18.5679 8.44441 18.2452 8.625 17.8975 8.625H11.125V19.625H14.125C14.6773 19.625 15.125 20.0727 15.125 20.625C15.125 21.1773 14.6773 21.625 14.125 21.625H6.125C5.57272 21.625 5.125 21.1773 5.125 20.625C5.125 20.0727 5.57272 19.625 6.125 19.625H9.125V15.625H2.3525C2.00482 15.625 1.68209 15.4444 1.50022 15.1481L0.27272 13.1481C0.0757599 12.8272 0.0757599 12.4228 0.27272 12.1019L1.50022 10.1019C1.68209 9.80559 2.00482 9.625 2.3525 9.625H9.125V1.625C9.125 1.07272 9.57271 0.625 10.125 0.625ZM9.125 11.625H2.91207L2.29832 12.625L2.91207 13.625H9.125V11.625ZM11.125 6.625H17.3379L17.9517 5.625L17.3379 4.625H11.125V6.625Z" />
                                <path fill={mode === 'pin' ? '#fff' : '#ccc'} fillRule="evenodd" clipRule="evenodd"
                                    d="M9 1.625C9 1.00368 9.50368 0.5 10.125 0.5C10.7463 0.5 11.25 1.00368 11.25 1.625V2.5H17.8975C18.2886 2.5 18.6517 2.70316 18.8563 3.03653L20.0838 5.03653C20.3054 5.39756 20.3054 5.85244 20.0838 6.21347L18.8563 8.21347C18.6517 8.54684 18.2886 8.75 17.8975 8.75H11.25V19.5H14.125C14.7463 19.5 15.25 20.0037 15.25 20.625C15.25 21.2463 14.7463 21.75 14.125 21.75H6.125C5.50368 21.75 5 21.2463 5 20.625C5 20.0037 5.50368 19.5 6.125 19.5H9V15.75H2.3525C1.96136 15.75 1.59829 15.5468 1.39369 15.2135L0.166185 13.2135C-0.0553952 12.8524 -0.0553952 12.3976 0.166185 12.0365L1.39369 10.0365C1.59829 9.70316 1.96136 9.5 2.3525 9.5H9V1.625ZM10.125 0.75C9.64175 0.75 9.25 1.14175 9.25 1.625V9.625C9.25 9.69403 9.19404 9.75 9.125 9.75H2.3525C2.04828 9.75 1.76589 9.90802 1.60676 10.1673L0.379255 12.1673C0.206915 12.4481 0.206915 12.8019 0.379255 13.0827L1.60676 15.0827C1.76589 15.342 2.04828 15.5 2.3525 15.5H9.125C9.19404 15.5 9.25 15.556 9.25 15.625V19.625C9.25 19.694 9.19404 19.75 9.125 19.75H6.125C5.64175 19.75 5.25 20.1418 5.25 20.625C5.25 21.1082 5.64175 21.5 6.125 21.5H14.125C14.6082 21.5 15 21.1082 15 20.625C15 20.1418 14.6082 19.75 14.125 19.75H11.125C11.056 19.75 11 19.694 11 19.625V8.625C11 8.55596 11.056 8.5 11.125 8.5H17.8975C18.2017 8.5 18.4841 8.34198 18.6432 8.0827L19.8707 6.0827C20.0431 5.8019 20.0431 5.4481 19.8707 5.1673L18.6432 3.1673C18.4841 2.90802 18.2017 2.75 17.8975 2.75H11.125C11.056 2.75 11 2.69404 11 2.625V1.625C11 1.14175 10.6082 0.75 10.125 0.75ZM11 4.625C11 4.55596 11.056 4.5 11.125 4.5H17.3379C17.3814 4.5 17.4217 4.52257 17.4445 4.55961L18.0582 5.55961C18.0828 5.59973 18.0828 5.65027 18.0582 5.69039L17.4445 6.69039C17.4217 6.72743 17.3814 6.75 17.3379 6.75H11.125C11.056 6.75 11 6.69404 11 6.625V4.625ZM11.25 4.75V6.5H17.268L17.805 5.625L17.268 4.75H11.25ZM2.80554 11.5596C2.82827 11.5226 2.86861 11.5 2.91207 11.5H9.125C9.19404 11.5 9.25 11.556 9.25 11.625V13.625C9.25 13.694 9.19404 13.75 9.125 13.75H2.91207C2.86861 13.75 2.82827 13.7274 2.80554 13.6904L2.19179 12.6904C2.16717 12.6503 2.16717 12.5997 2.19179 12.5596L2.80554 11.5596ZM2.98202 11.75L2.44499 12.625L2.98202 13.5H9V11.75H2.98202Z" />
                            </svg>
                        </div>
                    </div>
                ) : null
            }

            {
                !viewOnly ? (
                    <div className="map-btns">
                        {
                            ((mode === 'draw') && points?.length) || ((mode === 'pin') && pins?.length) ? (
                                <button className="map-btn" onClick={() => {
                                    if (mode === 'draw') {
                                        setPoints([]);
                                        setLines([]);
                                        setElevation(0);
                                        setElevationLoss(0);
                                        setDistance(0);
                                        setLat(0);
                                        setLng(0);
                                    } else {
                                        setPins([]);
                                        setPopup(null);
                                    }
                                }}>Reset</button>
                            ) : (
                                <div className="map-btn-pen">
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M0.66108 12C0.569725 11.9998 0.479402 11.9807 0.395855 11.9437C0.312308 11.9067 0.237366 11.8528 0.175793 11.7853C0.113106 11.7183 0.0652717 11.6389 0.035427 11.5522C0.00558234 11.4655 -0.00559873 11.3734 0.0026168 11.2821L0.16394 9.50769L7.61642 2.05581L9.94541 4.38477L2.4949 11.836L0.721 11.9974C0.70108 11.9992 0.681084 12.0001 0.66108 12ZM10.4103 3.91911L8.08196 1.59015L9.47856 0.193171C9.53971 0.131933 9.61233 0.083352 9.69227 0.0502063C9.7722 0.0170606 9.85789 0 9.94442 0C10.031 0 10.1166 0.0170606 10.1966 0.0502063C10.2765 0.083352 10.3491 0.131933 10.4103 0.193171L11.8069 1.59015C11.8681 1.65132 11.9167 1.72396 11.9498 1.80392C11.9829 1.88388 12 1.96959 12 2.05614C12 2.1427 11.9829 2.2284 11.9498 2.30836C11.9167 2.38832 11.8681 2.46096 11.8069 2.52213L10.4109 3.91845L10.4103 3.91911Z"
                                            fill="white" />
                                    </svg>
                                </div>
                            )
                        }
                    </div>
                ) : null
            }
        </div>
    )
}
