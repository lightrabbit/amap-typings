declare namespace AMap {
    export type EventCallback = (...args: any[]) => void;
    export type GenericEventCallback<T> = (T) => void;

    export const plugin: (pluginNames: string[], ready?: () => void) => void;

    export namespace event {
        /**
         * 注册DOM对象事件：给DOM对象注册事件，并返回eventListener。运行AMap.event.removeListener(eventListener)可以删除该事件的监听器。
            参数：
            instance：需注册事件的DOM对象（必填），
            eventName：事件名称（必填），
            handler：事件功能函数（必填），
            context：事件上下文（可选，缺省时，handler中this指向参数instance引用的对象，否则this指向context引用的对象）
         */
        const addDomListener: (instance: HTMLElement, eventName: string, handler: EventCallback, context?: any) => EventListener;

        /**
         * 注册对象事件：给对象注册事件，并返回eventListener。运行AMap.event.removeListener(eventListener)可以删除该事件的监听器。
            参数：
            instance：需注册事件的对象（必填），
            eventName：事件名称（必填），
            handler：事件功能函数（必填），
            context：事件上下文（可选，缺省时，handler中this指向参数instance引用的对象，否则this指向context引用的对象）
         */
        const addListener: (instance: Object, eventName: string, handler: EventCallback, context?: any) => EventListener;

        /**
         * 类似于addListener，但处理程序会在处理完第一个事件后将自已移除。
         */
        const addListenerOnce: (instance: Object, eventName: string, handler: EventCallback, context?: any) => EventListener;

        /**
         * 删除由上述 event.addDomListener 和 event.addListener 传回的指定侦听器。
         */
        const removeListener: (listener: EventListener) => void;

        /**
         * 触发非DOM事件：触发非DOM事件eventName，extArgs将扩展到事件监听函数（handler）接受到的event参数中。如:在extArgs内写入{m:10,p:2}，eventName监听函数（handler）可以接收到包含m,p两个key值的event对象。
         */
        const trigger: (instance: Object, eventName: string, extArgs: any) => void;
    }
    

    /**
     * 此对象用于表示地图、覆盖物、叠加层上的各种鼠标事件返回，包含以下字段：
     */
    export interface MapsEventOptions {
        lnglat: LngLat;
        pixel: Pixel;
        type: string;
        target: Object;
    }

    abstract class EventBindable {
        on(eventName: string, callback: EventCallback);
        off(eventName: string, callback: EventCallback);
    }


/* --------------------------- 基础类 --------------------------- */
/* 参考地址:http://lbs.amap.com/api/javascript-api/reference/core */

    /**
     * 像素坐标，确定地图上的一个像素点。
     */
    export class Pixel {

        /**
         * 构造一个像素坐标对象。
         */
        constructor(x: number, y: number);
        /**
         * 获得X方向像素坐标
         */
        getX(): number;

        /**
         * 获得Y方向像素坐标
         */
        getY(): number;

        /**
         * 当前像素坐标与传入像素坐标是否相等
         */
        equals(point: Pixel): boolean;

        /**
         * 以字符串形式返回像素坐标对象
         */
        toString(): string;
    }
    
    /**
     * 地物对象的像素尺寸
     */
    export class Size {

        /**
         * 构造尺寸对象
         * @param {number} width 宽度，单位：像素
         * @param {number} height 高度，单位：像素
         */
        constructor(width: number, height: number);

        /**
         * 获得宽度
         */
        getWidth(): number;

        /**
         * 获得高度
         */
        getHeight(): number;

        /**
         * 以字符串形式返回尺寸大小对象
         */
        toString(): string;
    }

    /**
     * 经纬度坐标，确定地图上的一个点
     */
    export class LngLat {

        /**
         * 构造一个地理坐标对象
         * @param {number} lng 经度
         * @param {number} lat 纬度
         */
        constructor(lng: number, lat:number);

        /**
         * 当前经纬度坐标值经度移动w，纬度移动s，得到新的坐标。
         * 
         * @param {number} w 经度，向右移为正值，单位：米
         * @param {number} s 纬度，向上移为正值，单位：米
         */
        offset(w:number, s:number): LngLat;

        /**
         * 计算当前经纬度和传入经纬度或者经纬度数组连线之间的地面距离，单位为米
         * 
         * @param {(LngLat | [number, number])} lnglat 传入的经纬度
         */
        distance(lnglat: LngLat | [number, number]): number;
        
        /**
         * 获取经度值
         */
        getLng(): number;

        /**
         * 获取纬度值
         */
        getLat(): number;

        /**
         * 判断当前坐标对象与传入坐标对象是否相等
         * 
         * @param {LngLat} lnglat 传入坐标对象
         */
        equals(lnglat: LngLat): boolean;

        /**
         * LngLat对象以字符串的形式返回
         */
        toString(): string;
    }

    /**
     * 地物对象的经纬度矩形范围
     */
    export class Bounds {

        /**
         * 构造一个矩形范围
         * @param {LngLat} southWest 西南角经纬度坐标
         * @param {LngLat} northEast 东北角经纬度坐标
         */
        constructor(southWest: LngLat, northEast: LngLat);

        /**
         * 判断指定点坐标是否在矩形范围内
         * @param {LngLat} point 指定点
         */
        contains(point: LngLat): boolean;

        /**
         * 获取当前Bounds的中心点经纬度坐标
         */
        getCenter(): LngLat;

        /**
         * 获取西南角坐标
         */
        getSouthWest(): LngLat;

        /**
         * 获取东北角坐标
         */
        getNorthEast(): LngLat;

        /**
         * 以字符串形式返回地物对象的矩形范围
         */
        toString(): string;
    }
/* --------------------------- 基础类 --------------------------- */

    interface TileLayerOptions {
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

    abstract class Layer extends EventBindable {
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

    export class TileLayer extends Layer {
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
    }

    export namespace TileLayer {

        abstract class MapTypeLayer extends Layer {
            constructor(options?: {
                map: Map,
                zIndex?: number,
                opacity?: number,
                zooms?: number[],
                detectRetina?: boolean
            });
        }

        export class Satellite extends MapTypeLayer {           
        }

        export class RoadNet extends MapTypeLayer {
        }

        export class Traffic extends MapTypeLayer {
            constructor(options?: {
                map: Map,
                zIndex?: number,
                opacity?: number,
                zooms?: number[],
                detectRetina?: boolean,
                autoRefresh?: boolean,
                interval?: number
            });

            interval: number;
            autoRefresh: boolean;
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
        defaultLayer?: TileLayer;
        rotateEnable?: boolean;
        resizeEnable?: boolean;
        showIndoorMap?: boolean;
        indoorMap?: IndoorMap;
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

    export class View2D {
        constructor(opt: {
            center?: LngLat,
            rotation?: number,
            zoom?: number,
            crs?: string
        });
    }

    export class Map extends EventBindable {
        
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
        getAllOverlays(type: string): Marker[] | Circle[] | Polygon[] | Polyline[];
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
        setFitView(overlayList?: any[]);
        clearMap();
        destroy();
        plugin(name: string| string[], callback: () => void);
        addControl(obj: IMapControl|Object);
        removeControl(obj: IMapControl|Object);
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

    export class Icon {
        constructor(options?: {
            size?: Size,
            imageOffset?: Pixel,
            image?: string,
            imageSize?: Size
        });

        getImageSize(): Size;
        setImageSize(size: Size);
    }

    /**
     * MarkerShape用于划定Marker的可点击区域范围。需要注意的是，在IE浏览器中图标透明区域默认为不触发事件，因此MarkerShape在IE中不起作用。
     */
    export class MarkerShape {
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
    export class Marker extends EventBindable {
        constructor(options?: MarkerOptions);

        markOnAMAP(obj: {
            name: string,
            position: LngLat
        });

        getOffset(): Pixel;
        setOffset(offset: Pixel);

        setAnimation(animate: string);
        getAnimation(): string;

        setClickable(clickable: boolean);
        getClickable(): boolean;

        getPosition(): LngLat;
        setPosition(lnglat: LngLat);

        setAngle(angle: number);
        getAngle(): number;

        setLabel(label: {
            content?: string,
            offset?: Pixel
        });
        getLabel(): {
            content?: string,
            offset?: Pixel
        };

        setzIndex(index: number);

        getIcon(): string|Icon;
        setIcon(content: string|Icon);
        
        setDraggable(draggable: boolean);
        getDraggable(): boolean;

        hide();
        show();

        setCursor(cursor: string);

        setContent(content: string| HTMLElement);
        getContent(): string;

        moveAlong(lnglatlist: LngLat[], speed?: number, f?: (k: number) => number, circlable?: boolean);
        moveTo(lnglat: LngLat, speed?: number, f?: (k: number) => number);
        stopMove();
        setMap(map: Map);
        getMap(): Map;
        setTitle(title: string);
        getTitle(): string;
        setTop(isTop: boolean);
        getTop(): boolean;
        setShadow(icon: Icon);
        getShadow(): Icon;
        setShape(shape: MarkerShape);
        getShape(): MarkerShape;
        setExtData(ext: any);
        getExtData(): any;
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

    export class Circle {
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

    export interface PolygonOptions {
        map?: Map;
        zIndex?: number;
        path?: LngLat[]|LngLat[][];
        strokeColor?: string;
        strokeOpacity?: number;
        strokeWeight?: number;
        fillColor?: string;
        fillOpacity?: number;
        extData?: any;
        strokeStyle?: string;
        strokeDasharray?: number[];
    }

    export class Polygon extends EventBindable {
        constructor(options?: PolygonOptions);

        setPath(path: LngLat[]|LngLat[][]);
        getPath(): LngLat[]|LngLat[][];
        setOptions(opt: PolygonOptions);
        getOptions(): PolygonOptions;
        getBounds(): Bounds;
        getArea(): number;
        hide();
        show();
        setMap(map: Map);
        setExtData(ext: any);
        getExtData(): any;
        contains(point: LngLat): boolean;
    }

    export interface PolylineOptions {
        map?: Map;
        zIndex?: number;
        geodesic?: boolean;
        isOutline?: boolean;
        outlineColor?: string;
        path?: LngLat[];
        strokeColor?: string;
        strokeOpacity?: number;
        strokeWeight?: number;
        strokeStyle?: string;
        strokeDasharray?: number[];
        extData?: any;
    }

    export class Polyline extends EventBindable {
        constructor(options?: PolylineOptions);

        setPath(path: LngLat[]);
        getPath(): LngLat[];

        setOptions(opt: PolylineOptions);
        getOptions(): PolylineOptions;

        getLength(): number;
        getBounds(): Bounds;
        hide();
        show();
        
        setMap(map: Map);
        setExtData(ext: any);
        getExtData(): any;

    }

    export interface IMapControl {
        show();
        hide();
    }

    export class MapType implements IMapControl {
        constructor(options?: {
            defaultType?: number;
            showTraffic?: boolean;
            showRoad?: boolean;
        });

        show();
        hide();
    }

    export class OverView extends EventBindable implements IMapControl {
        constructor(options?: {
            tileLayer?: TileLayer[],
            isOpen?: boolean,
            visible?: boolean
        });

        open();
        close();
        setTileLayer(layer: TileLayer);
        getTileLayer(): TileLayer;
        show();
        hide();
    }

    export class Scale extends EventBindable implements IMapControl {
        offset: Pixel;
        position: string;

        show();
        hide();
    }

    export class ToolBar extends EventBindable implements IMapControl {
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
        show();
        hide();
    }

    export class InfoWindow extends EventBindable {
        constructor(options?: {
            isCustom?: boolean,
            autoMove?: boolean,
            closeWhenClickMap?: boolean,
            content?: string | HTMLElement,
            size?: Size,
            offset?: Pixel,
            position?: LngLat,
            showShadow?: boolean
        });

        open(map: Map, pos: LngLat);
        close();
        getIsOpen(): boolean;
        setPosition(lnglat: LngLat);
        getPosition(): LngLat;
        setSize(size: Size);
        getSize(): Size;
        getContent(): string;
        setContent(content: string|HTMLElement);
    }

    export class AdvancedInfoWindow extends EventBindable {
        constructor(options?: {
            autoMove?: boolean,
            closeWhenClickMap?: boolean,
            content?: string|HTMLElement,
            offset?: Pixel,
            position?: LngLat,
            panel?: string|HTMLElement,
            searchRadius?: number,
            placeSearch?: boolean,
            driving?: boolean,
            walking?: boolean,
            transit?: boolean,
            asOrigin?: boolean,
            asDestination?: boolean
        });

        open(map: Map, pos: LngLat);
        close();
        getIsOpen(): boolean;
        setPosition(lnglat: LngLat);
        getPosition(): LngLat;
        setContent(content: string|HTMLElement);
        getContent(): string;
    }

    export class Geolocation extends EventBindable {
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
            useNative?: boolean
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

    export interface CitySearchResult {
        city: string;
        bounds: Bounds;
    }

    export class CitySearch extends EventBindable {
        getLocalCity(callback: (status: string, result: string | CitySearchResult) => void);
        getCityByIp(ip: string, callback: (status: string, result: string | CitySearchResult) => void);
    }

    export class Poi {

    }

    export const enum DrivingPolicy {
        LEAST_TIME,
        LEAST_FEE,
        LEAST_DISTANCE,
        REAL_TRAFFIC
    }

    export interface ViaCity {
        name: string;
        citycode: string;
        adcode: string;
        districts: District[]
    }

    export interface District {
        name: string;
        adcode: string;
    }

    export interface TMC {
        lcode: string;
        distance: number;
        status: string;
    }

    export interface DriveStep {
        start_location: LngLat;
        end_location: LngLat;
        instruction: string;
        action: string;
        assist_action: string;
        orientation: string;
        road: string;
        distance: number;
        tolls: number;
        tolls_distance: number;
        toll_road: string;
        time: number;
        path: LngLat[],
        cities?: ViaCity[],
        tmcs?: TMC[]
    }

    export interface DriveRoute {
        distance: number;
        time: number;
        policy: string;
        tolls: number;
        tolls_distance: number;
        steps: DriveStep[]
    }

    export interface DrivingResult {
        info: string;
        origin: LngLat;
        destination: LngLat|Poi;
        start: Poi;
        waypoints: Poi;
        taxi_cost: number;
        routes: DriveRoute[]
    }

    export class Driving extends EventBindable {
        constructor(options?: {
            policy?: DrivingPolicy,
            extensions?: string,
            map?: Map,
            panel?: string|HTMLElement,
            hideMarkers?: boolean,
            showTraffic?: boolean
        });

        search(origin:LngLat, destination: LngLat, opts?: {
            waypoints: LngLat[]
        }, callback?: (status: string, result: string|DrivingResult) => void);
        search(point: {
            keyword: string,
            city: string
        }[], callback: (status: string, result: string|DrivingResult) => void);

        setPolicy(policy: DrivingPolicy);
        setAvoidPolygons(path: LngLat[][]);
        setAvoidRoad(road: string);
        clearAvoidRoad();
        clearAvoidPolygons();
        getAvlidPolygons(): LngLat[][];
        getAvoidRoad(): string;
        clear();
        searchOnAMAP(obj: {
            origin?: LngLat,
            originName?: string,
            destination?: LngLat,
            destinationName?: string
        });
    }
}