# Localized	07/22/2012 09:04 AM (GMT)	303:4.80.0411 	Add-AppDevPackage.psd1
# Culture = "en-US"
ConvertFrom-StringData @'
###PSLOC
PromptText=[Y] Sì [N] No (predefinito "N")
    PromptYesCharacter = Y
    PromptNoCharacter = N
PromptYesString=Sì
PromptNoString=No
PackageFound=Pacchetto trovato: {0}
CertificateFound=Certificato trovato: {0}
DependenciesFound=Pacchetti di dipendenza trovati:
GettingDeveloperLicense=Acquisizione della licenza per sviluppatori in corso...
InstallingCertificate=Installazione del certificato in corso...
InstallingPackage=\nInstallazione del pacchetto in corso...
AcquireLicenseSuccessful=Acquisizione di una licenza per sviluppatori completata.
InstallCertificateSuccessful=Installazione del certificato completata.
Success=\nOperazione completata: il pacchetto è stato installato.
WarningInstallCert=Verrà installato un certificato digitale nell'archivio certificati Persone attendibili del computer. Questa operazione costituisce un grave rischio per la sicurezza e deve essere eseguita solo se si considera attendibile l'origine del certificato digitale.\n\nDopo aver terminato di usare l'app, è consigliabile rimuovere manualmente il certificato digitale associato. Le istruzioni necessarie sono disponibili qui:\nhttp://go.microsoft.com/fwlink/?LinkId=243053
WarningPromptContinue=\nContinuare?
ElevateActions=\nPrima di installare il pacchetto, è necessario eseguire quanto segue:
ElevateActionDevLicense=\t- Acquisire una licenza per sviluppatori
ElevateActionCertificate=\t- Installare il certificato di firma
ElevateActionsContinue=Per continuare sono necessarie credenziali di amministratore. Accettare l'avviso di Controllo dell'account utente e specificare, se richiesta, la password di amministratore.
ErrorForceElevate=Per continuare è necessario specificare credenziali di amministratore. Eseguire questo script senza il parametro -Force oppure da una finestra di PowerShell con privilegi elevati.
ErrorForceDeveloperLicense=L'acquisizione di una licenza per sviluppatori richiede l'intervento dell'utente. Eseguire di nuovo lo script senza il parametro -Force.
ErrorLaunchAdminFailed=Errore: impossibile avviare un nuovo processo come amministratore.
ErrorNoScriptPath=Errore: è necessario avviare questo script da un file.
ErrorNoPackageFound=Errore: nessun pacchetto trovato nella directory dello script. Accertarsi che il pacchetto da installare si trovi nella stessa directory dello script.
ErrorManyPackagesFound=Errore: più pacchetti trovati nella directory dello script. Accertarsi che nella directory dello script sia presente solo il pacchetto da installare.
ErrorPackageUnsigned=Errore: il pacchetto non è provvisto di firma digitale oppure la firma è danneggiata.
ErrorNoCertificateFound=Errore: nessun certificato trovato nella directory dello script. Accertarsi che il certificato usato per firmare il pacchetto da installare si trovi nella stessa directory dello script.
ErrorManyCertificatesFound=Errore: più certificati trovati nella directory dello script. Accertarsi che nella directory dello script sia presente solo il certificato usato per firmare il pacchetto da installare.
ErrorBadCertificate=Errore: il file "{0}" non è un certificato digitale valido. CertUtil terminato con codice di errore {1}.
ErrorExpiredCertificate=Errore: il certificato "{0}" dello sviluppatore è scaduto. È possibile che l'orologio di sistema non sia impostato sulla data e sull'ora corrette. Se le impostazioni di sistema sono corrette, contattare il proprietario del pacchetto per ricreare un pacchetto con un certificato valido.
ErrorCertificateMismatch=Errore: il certificato non corrisponde a quello usato per firmare il pacchetto.
ErrorCertIsCA=Errore: il certificato non può essere un'autorità di certificazione.
ErrorBannedKeyUsage=Errore: il certificato non può avere il seguente utilizzo chiavi: {0}. L'utilizzo chiavi deve essere non specificato o corrispondere a "DigitalSignature".
ErrorBannedEKU=Errore: il certificato non può avere il seguente utilizzo chiavi avanzato: {0}. Sono consentiti solo utilizzi chiavi avanzati (EKU) Firma codice e Firma definitiva.
ErrorNoBasicConstraints=Errore: il certificato non dispone dell'estensione Limitazioni di base.
ErrorNoCodeSigningEku=Errore: il certificato non dispone dell'utilizzo chiavi avanzato per Firma codice.
ErrorInstallCertificateCancelled=Errore: installazione del certificato annullata.
ErrorCertUtilInstallFailed=Errore: impossibile installare il certificato. CertUtil terminato con codice di errore {0}.
ErrorGetDeveloperLicenseFailed=Errore: impossibile acquisire una licenza per sviluppatori. Per ulteriori informazioni, vedere http://go.microsoft.com/fwlink/?LinkID=252740.
ErrorInstallCertificateFailed=Errore: impossibile installare il certificato. Stato: {0}. Per ulteriori informazioni, vedere http://go.microsoft.com/fwlink/?LinkID=252740.
ErrorAddPackageFailed=Errore: impossibile installare il pacchetto.
ErrorAddPackageFailedWithCert=Errore: impossibile installare il pacchetto. Per garantire la sicurezza, provare a disinstallare il certificato di firma finché non risulta possibile installare il pacchetto. Le istruzioni necessarie sono disponibili qui:\nhttp://go.microsoft.com/fwlink/?LinkId=243053
'@
