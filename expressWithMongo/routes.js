/*
 module to provide routing
 */
/*
 * routes.js - module to provide routing
 */

/*jslint         node    : true, continue : true,
 devel  : true, indent  : 2,    maxerr   : 50,
 newcap : true, nomen   : true, plusplus : true,
 regexp : true, sloppy  : true, vars     : false,
 white  : true
 */
/*global */

// ------------ BEGIN MODULE SCOPE VARIABLES --------------
'use strict';

var configRoutes,
  crud = require("./crud"),
  makeMongoId = crud.makeMongoId;


//------- END MODULE SCOPE VARIABLES -------


configRoutes = function (app, server) {
  app.get('/', function (request, response) {

    console.log("redirect to aige.html");

    response.redirect('/index.html');
  });


  app.all('/:object_type/*?', function (request, response, next) {
    console.log("set content type to JSON");
    response.contentType('json');
    next();
  });

  app.post('/:object_type/login', function (request, response) {

    var find_map = {'firstname': request.body.name};
    crud.read(request.params.object_type, find_map, {},
      function (map_list) {
        response.json(map_list);
      }
    );
  });


  app.get('/:object_type/findAll', function (request, response) {
    console.log("node find all");
    var object_type = request.params.object_type,
      find_map = {},
      field_map = {};

    crud.read(object_type, find_map, field_map,
      function (map_list) {
        response.json(map_list);
      }
    );
  });

  app.post('/:object_type/findAll', function (request, response) {
    console.log("find all");
    var object_type = request.params.object_type,
      find_map = {},
      field_map = {};

    crud.read(object_type, find_map, field_map,
      function (map_list) {
        response.json(map_list);
      }
    );
  });
  app.get('/:object_type/filter', function (request, response) {
    console.log("node filter");
    var object_type = request.params.object_type;
    console.log("object type:=" + JSON.stringify(object_type))
    if (object_type === 'geoscope') {

      var theSearch = request.query;
      console.log("the filter=" + JSON.stringify(theSearch));
      var locationCode = theSearch.location_code;
      var re = new RegExp("^" + locationCode);
      var geo_scope_type = theSearch.geo_scope_type;
      console.log("location_code: " + JSON.stringify(locationCode));
      console.log("geo_scope_type: " + JSON.stringify(geo_scope_type));
      var find_map = {location_code: re, geo_scope_type: geo_scope_type};
      console.log("field_map: " + JSON.stringify(find_map));
    }
    else if (object_type === 'country') {
      var theSearch = request.query;
      console.log("the filter=" + JSON.stringify(theSearch));
      var countryCode = theSearch.country_code;
      var re = new RegExp("^" + countryCode);
      console.log("country_code: " + JSON.stringify(countryCode));
      var find_map = {code: re};
      console.log("field_map: " + JSON.stringify(find_map));
    }
    else {
      var theSearch = request.query;
      console.log("the filter=" + JSON.stringify(theSearch));

    }
    var field_map = {};
    crud.read(object_type, find_map, field_map,
      function (map_list) {
        response.json(map_list);
      }
    );
  });

  app.get('/:object_type/search', function (request, response) {
    console.log("node search");
    var object_type = request.params.object_type;
    var theSearch = request.query;
    console.log("the search=" + JSON.stringify(theSearch));

    var from = theSearch.from;
    console.log("from: " + JSON.stringify(from));

    var field_map = {};
    var find_map = {};
    crud.read(object_type, find_map, field_map,
      function (map_list) {
        response.json(map_list);
      }
    );
  });

  app.get('/:object_type/findOne', function (request, response) {
    console.log("node find one");
    var object_type = request.params.object_type;
    var theId = request.query;
    var hex = theId['id'];
    var find_map = {'_id': makeMongoId(hex)};
    var field_map = {};

    console.log("find one=" + JSON.stringify(find_map));
    crud.findOne(object_type, find_map, field_map,
      function (map_list) {
        response.json(map_list);
      }
    );
  });


  app.post('/:object_type/createItem', function (request, response) {
    console.log("routes create item");
    var object_type, item, set_map;

    object_type = request.params.object_type;
    item = request.body.item;
    delete item._id;
    set_map = item;

    crud.construct(
      object_type,
      set_map,
      function (result_map) {
        response.json(result_map);
      }
    );
  });


  app.post('/:object_type/updateItem', function (request, response) {
    console.log('node update item');
    var object_type, item, id, find_map, set_map;

    object_type = request.params.object_type;
    console.log("object type=" + object_type);

    item = request.body.item;
    id = makeMongoId(item._id);

    console.log("item =" + JSON.stringify(item));


    delete item._id;

    find_map = {'_id': id};
    set_map = item;
    crud.update(
      object_type,
      find_map,
      set_map,
      function (result_map) {
        console.log("update =" + JSON.stringify(result_map));
        response.json(result_map);
      }
    );
  });
  app.post('/:object_type/deleteByInactivate', function (request, response) {
    var object_type, requestedId, id, find_map, set_map;

    object_type = request.params.object_type;
    requestedId = request.body.id + "";
    id = makeMongoId(requestedId);
    find_map = {'_id': id},
      set_map = {'isActive': false};

    crud.update(
      object_type,
      find_map,
      set_map,
      function (result_map) {
        response.json(result_map);
      }
    );
  });

  app.post('/:object_type/deleteItem', function (request, response) {
    var object_type, requestedId, id, find_map;

    object_type = request.params.object_type;
    requestedId = request.body.id;
    id = makeMongoId(requestedId);
    find_map = {'_id': id};

    crud.destroy(object_type, find_map,
      function (map_list) {
        response.json(map_list);
      }
    );
  });
  app.all('/*', function (req, res) {
    res.sendfile(__dirname + '/public/index.html');
  });

  app.post('/:object_type/updateEvents', function (request, response) {
    var object_type, requestedId, id, name, find_map, events, set_map, id, name;

    object_type = request.params.object_type;
    requestedId = request.body.id;
    id = makeMongoId(requestedId);
    name = request.body.name;

    events = request.body.events;
    console.log("id =" + JSON.stringify(id));
    console.log("country_name =" + JSON.stringify(name));
    console.log("events =" + JSON.stringify(events));
    find_map = {'_id': id, "memberEvents.memberName": name};
    set_map = {"memberEvents.$.saisonEvents": events};
    crud.update(
      object_type,
      find_map,
      set_map,
      function (result_map) {
        console.log("update =" + JSON.stringify(result_map));
        response.json(result_map);
      }
    );
//  response.json({"Hello":"Goodbye"});
    //      {"country_name": "Saison 2015", "myMembers.memberName":"Chrischi"}, {$set:{"myMembers.$.myEvents":[]}}

  });
// end configRoutes
};
console.log('ROUTE module loaded now ');
module.exports = {configRoutes: configRoutes};


