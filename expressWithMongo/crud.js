/*
 module to provide routing
 */
/*
 * crud.js - module to provide basic crud actions against MongoDB.
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
var checkType, constructObject, readObject, findOne, updateObject,
  destroyObject, mongo, db, ObjectID, makeMongoId, objectTypeMap;

mongo = require('mongoskin');
ObjectID = mongo.ObjectID;
db = mongo.db("mongodb://127.0.0.1/aige", {native_parser: true});

objectTypeMap = {
  'country': {},
  'geoscope': {},
  'member': {},
  'membership': {},
  'event': {},
  'saison': {},
  'ports': {},
  'vesselsystems': {},
  'routingresult': {}
};
//------------- END MODULE SCOPED VARIABLES ------------------

//------------- BEGIN PUBLIC METHODS ------------------

makeMongoId = function (id) {
  return ObjectID.createFromHexString(id);
};


checkType = function (obj_type) {
  if (!objectTypeMap[obj_type]) {
    console.log("check type  =" + obj_type);
    return ({error_msg: 'Object Type' + obj_type + ' is not supported'});
  }
  return null;

};
constructObject = function (obj_type, obj_map, callback) {
  console.log("crud create obj_map =" + JSON.stringify(obj_map));
  var type_check_map = checkType(obj_type);
  if (type_check_map) {
    callback(type_check_map);
    return;
  }
  db.collection(obj_type, function (errors, collection) {
    if (errors) {
      callback(errors);
      return;
    }

    var options_map = {safe: true};
    collection.insert(obj_map, options_map, function (error, result_map) {
      if (error) {
        callback(result_map);
      }
      callback(result_map);
    });
  });
};

readObject = function (obj_type, find_map, fields_map, callback) {
  console.log("crud read all =" + JSON.stringify(find_map));

  var type_check_map = checkType(obj_type);
  if (type_check_map) {
    callback(type_check_map);
    return;
  }

  db.collection(obj_type, function (errors, collection) {
    if (errors) {
      console.log("crud read all  error =" + JSON.stringify(errors));

      callback(errors);
      return;
    }

    collection.find(find_map, fields_map).toArray(function (error, result_map) {
      if (errors) {
        callback(result_map);
      }
      console.log("crud read all  result =" + JSON.stringify(result_map));

      callback(result_map);
    });
  });
};

findOne = function (obj_type, find_map, fields_map, callback) {
  var type_check_map = checkType(obj_type);
  if (type_check_map) {
    callback(type_check_map);
    return;
  }

  db.collection(obj_type, function (errors, collection) {
    if (errors) {
      callback(errors);
      return;
    }
    collection.findOne(find_map, fields_map, function (error, result) {
      if (errors) {
        callback(error);
      }
      callback(result);
    });
  });
};

updateObject = function (obj_type, find_map, set_map, callback) {
  var type_check_map = checkType(obj_type);
  if (type_check_map) {
    callback(type_check_map);
    return;
  }

  db.collection(obj_type, function (errors, collection) {
    if (errors) {
      callback(errors);
      return;
    }
    var options_map = {safe: true, multi: true, upsert: false};
    console.log("crud update options_map" + options_map);
    collection.update(find_map, {$set: set_map}, options_map, function (error, update_count) {
      if (errors) {
        callback(error);
      }
      callback({update_count: update_count});
    });
  });

};
destroyObject = function (obj_type, find_map, callback) {
  var type_check_map = checkType(obj_type);
  if (type_check_map) {
    callback(type_check_map);
    return;
  }
  db.collection(obj_type, function (errors, collection) {
    if (errors) {
      callback(errors);
      return;
    }
    var options_map = {safe: true, single: true};

    collection.remove(find_map, options_map, function (error, delete_count) {
      if (errors) {
        callback(error);
      }
      callback({delete_count: delete_count});
    });
  });
};

module.exports = {
  checkType: checkType,
  construct: constructObject,
  read: readObject,
  findOne: findOne,
  update: updateObject,
  destroy: destroyObject,
  makeMongoId: makeMongoId
};

//------------- END PUBLIC METHODS ------------------


//------------- BEGIN MODULE INITIALIZATION ------------------

console.log(" CRUD module loaded.");
