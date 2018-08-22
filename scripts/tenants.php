<?php
# It is the management context of the subscription, in which a customer can manage its VPSes.
# It must correspond to a tenant created for the subscriber in the remote application system.
require "aps/2/runtime.php";

/**
* Class tenant
* @type("http://sorlov.tld/aps/test/tenant/1.0")
* @implements("http://aps-standard.org/types/core/subscription/service/1.0")
*/

class tenant extends \APS\ResourceBase
{
## Strong relation (link) to the application instance
		
	/**
	* @link("http://sorlov.tld/aps/test/app/1.0")
	* @required
	*/
	public $app;
	
## Weak relation (link) to collection of VPSes
	/**
	 * @link("http://sorlov.tld/aps/test/dummy/1.0[]")
	 */
	public $dummies;
	
}
?>
