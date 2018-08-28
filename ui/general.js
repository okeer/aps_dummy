define([
   "dojo/_base/declare",

   "aps/View",
   "aps/ResourceStore"
], function (
   declare,

   View,
   Store
) {
   return declare(View, {
      init: function() {

         /* Define the data store */
	var store = new Store({
	   apsType: "http://sorlov.tld/aps/test/dummy/1.1",
	   target: "/aps/2/resources/"
	});

         /* Define a handler for the *New* button click */

	var add = function() {
	   /* Start the process of creating a VPS by going to the relevant view */
	   aps.apsc.gotoView("general-new");
	};

         /* Define and return widgets */
	return ["aps/Grid", {
	   id: this.genId("srv_grid"),
	   store: store,
	   columns: [{
		 field: "name",
		 name: "Name"
	   },{
		 field: "testProperty",
		 name: "Test"}]}, [
	      ["aps/Toolbar", [
		 ["aps/ToolbarButton", {
		    id: this.genId("srv_new"),
		    iconClass:"fa-plus",
		    type: "primary",
		    label: "New",
		    onClick: add
		 }]
	      ]]
	]];

      }, // End of Init

      onContext: function() {
	this.byId("srv_grid").refresh();
	   aps.apsc.hideLoading();
      },

      onHide: function() {
	this.byId("srv_new").cancel();
      }

   });
});
