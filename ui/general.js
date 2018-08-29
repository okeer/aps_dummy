define([
   "dojo/_base/declare",
   "dojo/when",
   "aps/View",
   "aps/ResourceStore"
], function (
   declare,
   when,
   View,
   Store
) {
   var self;
   return declare(View, {
      init: function() {
	self = this;
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

	var remove = function() {
	    var btn = this;
	    /* Get confirmation from the user for the delete operation */
	    if (!confirm("Are you sure you want delete dummy?")) {
	       btn.cancel();
	       return;
	    }
	    var sel = self.grid.get("selectionArray");
	    var counter = sel.length;

	    /* Clear the current messages on the screen */
	    self.page.get("messageList").removeAll();

	    sel.forEach(function(vpsId){
	       console.log("I'm trying to delete VPS with id = [" + vpsId + "]");

	       /* Remove the VPS from the APS controller DB */
	       when(store.remove(vpsId),
		   /* If success, process the next VPS until the list is empty */
		  function(){
		     console.log("VPS with id = [" + vpsId + "] removed");
		     /* Remove the processed VPS from the selection */
		     sel.splice(sel.indexOf(vpsId),1);
		     self.grid.refresh();
		     if (--counter === 0) { btn.cancel(); }
		  },
		  function(e) {
		 	if (--counter === 0) { btn.cancel(); }
		}
	       );
	    });
	};

         /* Define and return widgets */
	return ["aps/Grid", {
	   id: this.genId("srv_grid"),
	   store: store,
	   selectionMode: "multiple",
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
		 }],
		["aps/ToolbarButton", {
		   id: this.genId("srv_del"),
		   iconClass: "fa-trash",
		   type: "danger",
		   label: "Delete",
		   requireItems: true,
		   onClick: remove
		}]
	      ]]
	]];

      }, // End of Init

      onContext: function() {
	this.grid = this.byId("srv_grid");
	this.page = this.byId("apsPageContainer");
	this.byId("srv_grid").refresh();
	   aps.apsc.hideLoading();
      },

      onHide: function() {
	this.byId("srv_new").cancel();
      }

   });
});
