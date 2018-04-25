require(["esri/Map",
    "esri/views/MapView",
    "esri/layers/ArcGISDynamicMapServiceLayer",
    "esri/layers/ImageParameters", 
    "esri/layers/FeatureLayer",
    "esri/widgets/Legend",
    "esri/widgets/LayerList",
    "esri/widgets/Search",
    "esri/tasks/Locator",
    "dojo/domReady!"],
function (Map, MapView,ArcGISDynamicMapServiceLayer, ImageParameters, FeatureLayer, Legend, LayerList, Search, Locator) {
    //my code starts here

    var mapConfig = {
        basemap: "gray"
    };

  
    var mapView = new MapView({
        map: myMap,
        container: "viewDiv",
        center: [-110.521094, 32.926912],
        zoom: 9
    });

    var imageParameters = new ImageParameters();
    imageParameters.format = "jpeg"; //set the image type to PNG24, note default is PNG8.

        //Takes a URL to a non cached map service.
    var dynamicMapServiceLayer = new ArcGISDynamicMapServiceLayer("https://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Demographics/ESRI_Population_World/MapServer", {
        "opacity": 0.5,
        "imageParameters": imageParameters
    });

    myMap.addLayer(dynamicMapServiceLayer);
    });

    
 
    });
    var myFeatureLayer = new FeatureLayer({
        url: "https://services.arcgis.com/P3ePLMYs2RVChkJx/ArcGIS/rest/services/USA_Federal_Lands/FeatureServer/0",
        
    });
    myMap.add(myFeatureLayer);

        

    var legend = new Legend({
        view: mapView,
        layerInfos: [{ layer: myFeatureLayer, title: 'Federal Lands' }]
    });
    mapView.ui.add(legend, "bottom-right");

    var layerList = new LayerList({
        view: mapView
    });
    // Adds widget below other elements in the top left corner of the view
    mapView.ui.add(layerList, {
        position: "top-right"
    });

    var searchWidget = new Search({
        view: mapView,
        sources: [{
            locator: new Locator({ url: "//geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer" }),
            singleLineFieldName: "SingleLine",
            name: "Custom Geocoding Service",
            localSearchOptions: {
                minScale: 300000,
                distance: 50000
            },
            placeholder: "Search Geocoder",
            maxResults: 3,
            maxSuggestions: 6,
            suggestionsEnabled: false,
            minSuggestCharacters: 0
        }, {
            featureLayer:myFeatureLayer,
            searchFields: ["Agency"],
            displayField: "Agency",
            exactMatch: false,
            outFields: ["*"],
            name: "My Custom Search",
            placeholder: "example: Forest Service",
            maxResults: 6,
            maxSuggestions: 6,
            suggestionsEnabled: true,
            minSuggestCharacters: 0
        }]
    });
    // Adds the search widget below other elements in
    // the top left corner of the view
    mapView.ui.add(searchWidget, {
        position: "top-left",
        index: 2
    });