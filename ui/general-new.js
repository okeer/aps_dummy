define([
      "dojo/_base/declare",
      "dojox/mvc/getPlainValue",
      "dojox/mvc/at",
      "dojox/mvc/getStateful",
      "dojo/when",

      "aps/View",
      "aps/ResourceStore",
      "aps/Memory"
   ],
   function (
      declare,
      getPlainValue,
      at,
      getStateful,
      when,

      View,
      Store,
      Memory
   ) {
      return declare(View, {
         init: function() {
            /* Declare the data sources */
		var tests = new Memory({
			idProperty: "value",
			data: [
				{ value: "test1", label: "Test #1"},
				{ value: "test2", label: "Test #2"}
			]
		});

		this.model = getStateful({
		   "aps": {
		      "type": "http://sorlov.tld/aps/test/dummy/1.1"
		   },
		   "name": "",
		   "testProperty": "test1"
		});

            /* Define and return widgets */
	return ["aps/Panel", {
	      id: this.genId("srvNew_form")
	   }, [
	      ["aps/FieldSet", {
		    id: this.genId("srvNew_properties"),
		    title: "General"
		 },
		 [
		    ["aps/TextBox", {
		       id: this.genId("srvNew_name"),
		       label: "Name",
		       value: at(this.model, "name"),
		       required: true
		    }],
		    ["aps/Select", {
			id: this.genId("newDummy_testProp"),
			label: "Test Property",
			store: tests,
				value: at(this.model, "testProperty"),
				required: true
		    }]
		 ]
	      ]
	]];

         }, // End of Init

         /* Create handlers for the navigation buttons */

         onCancel: function() {
		aps.apsc.gotoView("servers");
         },

         onSubmit: function() {

		aps.context.subscriptionId = aps.context.vars.tenant.aps.subscription;

	   var store = new Store({
	       apsType: "http://sorlov.tld/aps/test/dummy/1.1",
	       target: "/aps/2/resources/" + aps.context.vars.tenant.aps.id + "/dummies"
	   });
	   when(store.put(getPlainValue(this.model)),
	       function() {
		   aps.apsc.gotoView("general");
	       }
	   );
         }

      });   // End of Declare
   });      // End of Define
