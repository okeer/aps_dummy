<?php

require "aps/2/runtime.php";


// Main class
/**
 * @type("http://sorlov.tld/aps/test/dummy/1.1")
 * @implements("http://aps-standard.org/types/core/resource/1.0")
 */
class dummy extends APS\ResourceBase {

   ## Relationship with the management context

   /**
    * @link("http://sorlov.tld/aps/test/tenant/1.0")
    * @required
    */
   public $tenant;

   ## VPS properties

   /**
    * @type("string")
    * @title("name")
    * @description("Name")
    */
   public $name;
   /**
    * @type("string")
    * @title("OS")
    * @description("Operating System")
    */
   public $testProperty;
}
?>
