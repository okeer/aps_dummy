<?php

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
    	
}

?>
