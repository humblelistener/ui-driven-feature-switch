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

    var featureToggles = {
        "new-zuji-flightsearch": false,
    };

    setFeatureTogglesFromQueryString(featureToggles);
    
    var feature = {        
       isEnabled: function (featureName) {
            return featureToggles[featureName];
       },
       all: function () {
           var all = [];

           _.each(featureToggles, function (toggleName) {
               all.push(toggleName);
           });
           
           return all;
       },
       setFeatureClasses: function(element) {
           _.each(featureToggles, function (value, toggleName) {
               element.addClass("{0}-{1}".format(toggleName, value ? "enabled" : "disabled"));
           });
       }
    };

    return feature;
});