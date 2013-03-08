param($installPath, $toolsPath, $package, $project) 

#get script folder
$scripts = $project.ProjectItems | Where-Object { $_.Name -eq "js" }

if ($scripts) {
	
	#check for existing markedup.js file
	$mk = $scripts.ProjectItems | Where-Object { $_.Name -eq "MarkedUp.js" }

	if (!$mk) {
		
		#copy the markedup.js to the scripts folder
		$scripts.ProjectItems.AddFromFileCopy([System.IO.Path]::Combine($toolsPath, "MarkedUp.js"))

	} else {
		
		#file exists alert
		Write-Warning "Skipping adding MarkedUp.js file to project as file with same name already exists"

	}

}