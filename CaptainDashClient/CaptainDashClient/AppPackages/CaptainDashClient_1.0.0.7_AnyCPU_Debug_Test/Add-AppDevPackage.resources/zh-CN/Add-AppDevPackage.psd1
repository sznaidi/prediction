# Localized	07/22/2012 09:04 AM (GMT)	303:4.80.0411 	Add-AppDevPackage.psd1
# Culture = "en-US"
ConvertFrom-StringData @'
###PSLOC
PromptText=[Y] 是 [N] 否(默认为“N”)
    PromptYesCharacter = Y
    PromptNoCharacter = N
PromptYesString=是
PromptNoString=否
PackageFound=找到包: {0}
CertificateFound=找到证书: {0}
DependenciesFound=找到依赖项包:
GettingDeveloperLicense=正在获取开发人员许可证...
InstallingCertificate=正在安装证书...
InstallingPackage=\n正在安装包...
AcquireLicenseSuccessful=已成功获取开发人员许可证。
InstallCertificateSuccessful=已成功安装证书。
Success=\n成功: 包已成功安装。
WarningInstallCert=你要将数字证书安装到计算机的受信任人员证书存储区中。这样做有严重的安全风险，只有在信任此数字证书的建立者时才应执行此操作。\n\n当你使用完此应用程序时，应手动删除关联的数字证书。以下网址提供了相关操作说明:\nhttp://go.microsoft.com/fwlink/?LinkId=243053
WarningPromptContinue=\n是否确定要继续?
ElevateActions=\n在安装此包之前，需要执行以下操作:
ElevateActionDevLicense=\t- 获取开发人员许可证
ElevateActionCertificate=\t- 安装签名证书
ElevateActionsContinue=需要具有管理员凭据才能继续。请接受 UAC 提示并在请求时提供管理员密码。
ErrorForceElevate=必须提供管理员凭据才能继续。请不用 -Force 参数运行此脚本或从提升权限的 PowerShell 窗口中运行此脚本。
ErrorForceDeveloperLicense=获取开发人员许可证需要用户交互。请不带 -Force 参数重新运行该脚本。
ErrorLaunchAdminFailed=错误: 无法以管理员身份启动新进程。
ErrorNoScriptPath=错误: 必须从文件中启动此脚本。
ErrorNoPackageFound=错误: 在脚本目录中未找到包。请确保将要安装的包与此脚本放在同一目录中。
ErrorManyPackagesFound=错误: 在脚本目录中发现多个包。请确保仅将要安装的包与此脚本放在同一目录中。
ErrorPackageUnsigned=错误: 包未数字签署或其签名已损坏。
ErrorNoCertificateFound=错误: 在脚本目录中未找到证书。请确保将用于签署正在安装的包的证书与此脚本放在同一目录中。
ErrorManyCertificatesFound=错误: 在脚本目录中找到多个证书。请确保只将用于签署正在安装的包的证书与此脚本放在同一目录中。
ErrorBadCertificate=错误: 文件“{0}”不是有效的数字证书。CertUtil 返回错误代码 {1}。
ErrorExpiredCertificate=错误: 开发人员证书“{0}”已过期。一个可能的原因是系统时钟未设置为正确的日期和时间。如果系统设置正确，请与包所有者联系以使用有效的证书重新创建包。
ErrorCertificateMismatch=错误: 证书与用于签署包的证书不匹配。
ErrorCertIsCA=错误: 证书不能为证书颁发机构。
ErrorBannedKeyUsage=错误: 证书不能具有以下密钥用法: {0}。密钥用法必须为未指定或等于“DigitalSignature”。
ErrorBannedEKU=错误: 证书不能具有以下扩展密钥用法: {0}。只允许代码签署和生存期签署 EKU。
ErrorNoBasicConstraints=错误: 证书缺少基本约束扩展。
ErrorNoCodeSigningEku=错误: 证书缺少用于代码签署的扩展密钥用法。
ErrorInstallCertificateCancelled=错误: 证书的安装已取消。
ErrorCertUtilInstallFailed=错误: 无法安装证书。CertUtil 返回错误代码 {0}。
ErrorGetDeveloperLicenseFailed=错误: 无法获取开发人员许可证。有关详细信息，请参阅 http://go.microsoft.com/fwlink/?LinkID=252740。
ErrorInstallCertificateFailed=错误: 无法安装证书。状态: {0}。有关详细信息，请参阅 http://go.microsoft.com/fwlink/?LinkID=252740。
ErrorAddPackageFailed=错误: 无法安装包。
ErrorAddPackageFailedWithCert=错误: 无法安装包。为了确保安全性，请考虑卸载签署证书，直至可以安装包。以下网址提供了相关操作说明:\nhttp://go.microsoft.com/fwlink/?LinkId=243053
'@
