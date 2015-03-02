define([
    "underscore", "docCookies"
], function(_, docCookies) {
    function setFeatureTogglesFromQueryString(toggles) {
        var enabledFeatures = getQueryStringParameterByName("features").split(",");
        _.each(enabledFeatures, function (enabledFeature) {
            if (enabledFeature){
                toggles[enabledFeature] = true;
                persistToggle(enabledFeature, true);
            }
        });
    };

    function persistToggle(feature, value){      
      docCookies.erase(feature);      
      docCookies.set(feature, value);
    };

    function getQueryStringParameterByName(name) {
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }

    var features = {
        // sample data here, to enable a feature by default, uncomment the following line
        // "feature1": true,
        // to disable a feature by defaut, uncomment the following line
        // "feature2": false,
    };

    setFeatureTogglesFromQueryString(features);
    
    var feature = {        
       isEnabled: function (featureName) {
            return features[featureName];
       },
       all: function () {
           var all = [];

           _.each(features, function (toggleName) {
               all.push(toggleName);
           });
           
           return all;
       },
       setFeatureClasses: function(element) {
           _.each(features, function (value, toggleName) {
               element.addClass("{0}-{1}".format(toggleName, value ? "enabled" : "disabled"));
           });
       }
    };

    return feature;
});