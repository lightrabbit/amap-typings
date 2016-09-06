export namespace AMap {
    export interface Pixel {
        constructor(x: number, y: number);
        getX(): number;
        equals(point: Pixel): boolean;
        toString(): string;
    }

    export interface Size {
        constructor(width: number, height: number);
        getWidth(): number;
        getHeight(): number;
        toString(): string;
    }

    export interface LngLat {
        constructor(lng: number, lat:number);
        offset(w:number, s:number): LngLat;
        distance(lnglat: LngLat): number;
        getLng(): number;
        getLat(): number;
        equals(lnglat: LngLat): boolean;
        toString(): string;
    }

    export interface Bounds {
        constructor(southWest: LngLat, northEast: LngLat);
        contains(point: LngLat): boolean;
        getCenter(): LngLat;
        getSouthWest(): LngLat;
        getNorthEast(): LngLat;
        toString(): string;
    }

    export interface TileLayerOptions {
        map: Map;
        tileSize: number;
        tileUrl: string;
        errorUrl: string;
        getTileUrl: (x, y, z) => string;
        zIndex: number;
        opacity: number;
        zooms: number[];
        detectRetina: boolean;
    }

    export interface TileLayer {
        constructor(tileOpt?: {
            map: Map,
            tileSize?: number,
            tileUrl?: string,
            errorUrl?: string,
            getTileUrl?: (x, y, z) => string,
            zIndex?: number,
            opacity?: number,
            zooms?: number[],
            detectRetina?: boolean
        });

        setOpacity(alpha: number);
        show();
        hide();
        getTiles(): string[];
        reload();
        setTileUrl();
        getZooms(): number[];
        setzIndex(index: number);
        setMap(map: Map);
    }

    export namespace TileLayer {
        export interface Satellite extends TileLayer {
            constructor(sateOpt?: {
                map: Map,
                zIndex?: number,
                opacity?: number,
                zooms?: number[],
                detectRetina?: boolean
            });            
        }
    }

    export interface IndoorMap {

    }

    export interface MapOptions {
        view?: View2D;
        layers?: TileLayer[];
        level?: number;
        center?: LngLat;
        labelzIndex?: number;
        zooms?: number[];
        lang?: string;
        cursor?: string;
        crs?: string;
        animateEnable?: boolean;
        isHotspot?: boolean;
        defaultLayer: TileLayer;
        rotateEnable?: boolean;
        resizeEnable?: boolean;
        showIndoorMap?: boolean;
        indoorMap: IndoorMap;
        expandZoomRange?: boolean;
        dragEnable?: boolean;
        zoomEnable?: boolean;
        doubleClickZoom?: boolean;
        keyboardEnable?: boolean;
        jogEnable?: boolean;
        scrollWheel?: boolean;
        touchZoom?: boolean;
        mapStyle?: string;
        features?: string[];
    }

    export interface View2D {
        constructor(opt: {
            center?: LngLat,
            rotation?: number,
            zoom?: number,
            crs?: string
        });
    }

    export interface Map {
        
        constructor(mapDiv: string, opts?: MapOptions);

        getZoom(): number;

        getLayers(): TileLayer[];

        getCenter(): LngLat;

        getCity(callback: (result: {
            provice: string,
            city: string,
            citycode: string,
            district: string
        }) => void);

        getBounds(): Bounds;
        getlabelzIndex(): number;
        getLimitBounds(): Bounds;
        getLang(): string;
        getSize(): Size;
        getRotation(): number;
        getStatus(): any;
        getDefaultCursor(): string;
        getResolution(point: LngLat): number;
        getScale(dpi: number): number;
        setZoom(level: number);
        setlabelzIndex(index: number);
        setLayers(layers: TileLayer[]);
        add(overlayers: any[]);
        remove(overlayers: any[]);
        getAllOverlays(type: string);
        setCenter(position: LngLat);
        setZoomAndCenter(zoomLevel: number, center: LngLat);
        setCity(city:string, callback: () => void);
        setBounds(bound: Bounds);
        setLimitBounds(bound: Bounds);
        clearLimitBounds();
        setLang(lang: string);
        setRotation(rotation: number);
        setStatus(status: any);
        setDefaultCursor(cursor: string);
        zoomIn();
        zoomOut();
        panTo(position: LngLat);
        panBy(x: number, y: number);
        setFitView(overlayList: any[]);
        clearMap();
        destroy();
        plugin(name: string| string[], callback: () => void);
        addControl(obj: MapControl);
        removeControl(obj: MapControl);
        clearInfoWindow();
        pixelToLngLat(pixel: Pixel, level: number): LngLat;
        lnglatToPixel(lnglat: LngLat, level: number): Pixel;
        containerToLngLat(pixel: Pixel, level: number): LngLat;
        lngLatToContainer(lnglat: LngLat, level: number): Pixel;
        setMapStyle(style: string);
        getMapStyle(): string;
        setFeatures(features: string[]);
        getFeatures(): string[];
        setDefaultLayer(layer: TileLayer);
    }

    export interface Icon {
        constructor(options?: {
            size: Size,
            imageOffset: Pixel,
            image: string,
            imageSize: Size
        });

        getImageSize(): Size;
        setImageSize(size: Size);
    }

    /**
     * MarkerShape用于划定Marker的可点击区域范围。需要注意的是，在IE浏览器中图标透明区域默认为不触发事件，因此MarkerShape在IE中不起作用。
     */
    export interface MarkerShape {
        constructor(options: {
            /**
             * 
             * 可点击区域组成元素数组，存放图形的像素坐标等信息，该数组元素由type决定：
             * - circle:coords格式为 [x1, y1, r]，x1，y1为圆心像素坐标，r为圆半径
             * - poly: coords格式为 [x1, y1, x2, y2 … xn, yn]，各x，y表示多边形边界像素坐标
             * - rect: coords格式为 [x1, y1, x2, y2]，x1，y1为矩形左上角像素坐标，x2，y2为矩形右下角像素坐标
             * Markshape的像素坐标是指相对于marker的左上角的像素坐标偏移量
             */
            coords?: number[],

            /**
             * 可点击区域类型，可选值：
             * - circle:圆形
             * - poly:多边形
             * - rect:矩形
             */
            type?: string
        });
    }

    export interface MarkerOptions {
        map?: Map;
        position?: LngLat;
        offset?: Pixel;
        icon?: string|Icon;
        content?: string| HTMLElement;
        topWhenClick?: boolean;
        topWhenMouseOver?: boolean;
        draggable?: boolean;
        raiseOnDrag?: boolean;
        cursor?: string;
        visible?: boolean;
        zIndex?: number;
        angle?: number;
        autoRotation?: boolean;
        animation?: string;
        shadow?: Icon;
        title?: string;
        clickable?: boolean;
        shape?: MarkerShape;
        extData?: any;
        label?: { content: string, offset: Pixel };
    }

    /**
     * 点标记。
     */
    export interface Marker {
        constructor(options?: MarkerOptions);
    }

    export interface CircleOptions {
        map: Map;
        zIndex?: number;
        center: LngLat;
        radius?: number;
        strokeColor?: string;
        strokeOpacity?: number;
        fillColor?: string;
        fillOpacity?: string;
        strokeStyle?: string;
        extData?: any;
        strokeDasharray?: number[];
    }

    export interface Circle {
        constructor(options?: CircleOptions);
        setCenter(lnglat: LngLat);
        getCenter(): LngLat;
        getBounds(): Bounds;
        setRadius(radius: number);
        getRadius(): number;
        setOptions(circleopt: CircleOptions);
        getOptions(): CircleOptions;
        hide();
        show();
        setMap(map: Map);
        setExtData(ext: any);
        getExtData(): any;
        contains(point: LngLat): boolean;
    }

    export interface MapControl {
        show();
        hide();
    }

    export interface MapType extends MapControl {
        constructor(options?: {
            defaultType?: number;
            showTraffic?: boolean;
            showRoad?: boolean;
        });
    }

    export interface OverView extends MapControl {
        constructor(options?: {
            tileLayer?: TileLayer[],
            isOpen?: boolean,
            visible?: boolean
        });

        open();
        close();
        setTileLayer(layer: TileLayer);
        getTileLayer(): TileLayer;
    }

    export interface Scale extends MapControl {
        offset: Pixel;
        position: string;
    }

    export interface ToolBar extends MapControl {
        constructor(options?: {
            offset?: Pixel,
            position?: string,
            ruler?: boolean,
            noIpLocate?: boolean,
            locate?: boolean,
            liteStyle?: boolean,
            direction?: boolean,
            autoPosition?: boolean,
            locationMarker?: Marker,
            useNative?: boolean
        });

        getOffset(): Pixel;
        setOffset(offset: Pixel);
        hideRuler();
        showRuler();
        hideDirection();
        showDirection();
        hideLocation();
        showLocation();
        doLocation();
        getLocation(): { lng:number, lat:number };
    }

    export interface Geolocation {
        constructor(options: {
            enableHighAccuracy?: boolean,
            timeout?: number,
            noIpLocate?: boolean,
            maximumAge?: number,
            convert?: boolean,
            showButton?: boolean,
            buttonDom?: string|HTMLElement,
            buttonPosition?: string,
            buttonOffset?: Pixel,
            showMarker?: boolean,
            markerOptions?: MarkerOptions,
            showCircle?: boolean,
            circleOptions?: CircleOptions,
            panToLocation?: boolean,
            zoomToAccuracy?: boolean,
            userNative?: boolean
        });

        isSupported(): boolean;
        getCurrentPosition();
        watchPosition(): number;
        clearWatch(watchId: number): number;
    }

    export interface GeolocationResult {
        position: LngLat;
        accuracy: number;
        isConverted: boolean;
        info: string;
    }

    export interface GeolocationError {
        info: string;
    }
}