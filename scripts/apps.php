<?php

if (!defined('APS_DEVELOPMENT_MODE')) define ('APS_DEVELOPMENT_MODE', 'on');

require "aps/2/runtime.php";

/**
 * Class app presents application and its global parameters
 * @type("http://sorlov.tld/aps/test/app/1.0")
 * @implements("http://aps-standard.org/types/core/application/1.0","http://odin.com/init-wizard/config/1.0")
 */
class app extends APS\ResourceBase {
# Link to collection of management contexts. Pay attention to [] brackets at the end.
	/**
	 * @link("http://sorlov.tld/aps/test/tenant/1.0[]")
	 */
	public $tenants;

    /**
     * @verb(GET)
     * @path("/getInitWizardConfig")
     * @access(admin, true)
     * @access(owner, true)
     * @access(referrer, true)
     */ 
    public function getInitWizardConfig()
    {
        $myfile = fopen("./wizard_data.json", "r") or die("Unable to open file!");
        $data = fread($myfile,filesize("./wizard_data.json"));
        fclose($myfile);
	   	return json_decode($data);
    }
		
    /**
     * @verb(GET)
     * @path("/testConnection")
     * @param(object,body)
     * @access(admin, true)
     * @access(owner, true)
     * @access(referrer, true)
     */ 
    public function testConnection($body)
    {
        return "";
    }

	public function upgrade() {
		$logger = \APS\LoggerRegistry::get();
		$logger->setLogFile("../logs/error_log");

		$logger->error("Entered upgrade function for apps");
		$logger->debug("Upgrade function APS development mode on");

		$apsc = \APS\Request::getController();
		$start = 0;

		do {
			$dummies = $apsc->getResources("implementing(".$this->getTypeByServiceId("dummies")."),limit($start,1000)");

			foreach ($dummies as $dummy) {
				$dummy->testProperty = "This is set by uprade function";
				$apsc->updateResource($dummy);
			}
			$start += 1000;
		} while (count($dummies) > 0);
	}    	
}

?>
