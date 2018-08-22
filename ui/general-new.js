define([
      "dojo/_base/declare",
      "dojox/mvc/getPlainValue",
      "dojox/mvc/at",
      "dojox/mvc/getStateful",
      "dojo/when",

      "aps/View",
      "aps/ResourceStore"
   ],
   function (
      declare,
      getPlainValue,
      at,
      getStateful,
      when,

      View,
      Store
   ) {
      return declare(View, {
         init: function() {
            /* Declare the data sources */
		this.model = getStateful({
		   "aps": {
		      "type": "http://sorlov.tld/aps/test/dummy/1.0"
		   },
		   "name": ""
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
	       apsType: "http://sorlov.tld/aps/test/dummy/1.0",
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
