define(['app/core/mediator', 'app/collections/places', 'app/views/placesview', 'app/views/placedetail', 'require'], function(mediator, Places, PlacesView, PlaceDetailView, require) { 
    return {
        "home": function() {
            console.log("home");
            
        },
        "search": function(queryString) {
            var app = require("app/app");
            //console.log("app", app);
            var searchHelper = require("app/helpers/search");
            var queryJSON = searchHelper.queryStringToJSON(queryString);
            var places = new Places().setServerApi(queryJSON);
            mediator.events.trigger("search:beforeFetch", queryJSON);
            places.fetch({
                success: function() {
                    var placesView = new PlacesView({collection: places});
                    app.content.show(placesView);
                    //app.views.places = placesView;
                    //mediator.events.trigger("search:afterFetch");
                }
            });
        },
        "detail": function(id) {
            var app = require("app/app");
            var detailView = new PlaceDetailView({});
            app.content.show(detailView); 
        }
    }   

});
