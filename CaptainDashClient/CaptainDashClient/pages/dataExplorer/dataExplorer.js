/*-------------------------------
-- Author : [A.A]
-- Creation date : 05/02/2013
------------------------------*/
var isPredicted = false;
var predictInt = 15;
var canPredict = false;//time range

(function () {
    "use strict";
    var viewObjectExplorer;
    WinJS.UI.Pages.define(Pages.dataExplorer,
        {
            ready: function (elements, options) {
                WinJS.Resources.processAll();
                CDHelper.requireScriptJS(Scripts.dataExplorerHelperJS);
                CDHelper.requireScriptJS(Scripts.dataExplorerController);
                CDHelper.requireScriptJS(Scripts.legendHelperJS);
                CDHelper.requireScriptJS(Scripts.legendJS);
                CDHelper.requireScriptJS(Scripts.gridHelperJS);
                CDHelper.requireScriptJS(Scripts.gridJS);

                _initialiseAppBarLabel();

                backbuttonFul.onclick = function () { WinJS.Navigation.back(); }

                cmdNewSerie.onclick = showAddSerieMenu;
                _showCurrentView();
                div_explorer_fullPage.addEventListener("MSPointerDown", _hideFlyoutLegendAndRightMenu, false);
                cmdNewExploration.onclick = _showNewExplorationPopup;
                cmdChangePeriod.onclick = _showTimeRangeMenu;
                lbl_dataExplorerPage_currentFrequency.onclick = _showFrequencyFlyout;
                btn_dataExplorerPage_frequency.onclick = _showFrequencyFlyout;

                cmdHelpTopAppBar.onclick = function () { HelpUtil.goToHelpPage(HelpUtil.PreviousPageIndex.DataExplorer); };
                cmdpinToCockpit.onclick = _showPinToCockpitMenu;

                cmdPredict.onclick = function () {
                    if (!isPredicted) {
                        _PredictIt(15);
                        topAppBar.winControl.hide();
                        div_dataExplorer_bottomAppBar.winControl.hide();
                    }
                };

            },
        });


    /* ------------------------------------------------------
    -- Author: [A.A]
    -- Name: _PredictIt
    -- Description: apply prediction
    -- Params:
    -- Return:
    -------------------------------------------------------*/
    function _PredictIt(interval) {
        if ((!isPredicted || canPredict) && (DataExplorerController.exploration.getFrequency() == 3 && (DataExplorerController.exploration.graphs_attributes[0].measure == 0 || DataExplorerController.exploration.graphs_attributes[0].measure == 10) && DataExplorerController.exploration.graphs_attributes[0].source == ConnectorsTemplate.ConnectorType.GoogleAnalytics)) {
            var predictLength = interval - 1;
            var tabDataPred = _getDataPredict(DataExplorerController.exploration.graphs_attributes[0].source, DataExplorerController.exploration.graphs_attributes[0].measure);  
            var tabDatePred = [];

            for (var count = 1; count <= predictLength; count++) {
                var date = new Date();
                date = new Date((date.getUTCMonth() + 1) + "/" + (date.getUTCDate() + count) + "/" + date.getUTCFullYear());
                tabDatePred.push(date.getTime());
            }

            for (var count = 0; count < predictLength; count++) {
                DataExplorerController.exploration.graphs_attributes[0].data.push(tabDataPred[count]);
                DataExplorerController.exploration.graphs_attributes[0].date.push(tabDatePred[count]);
            }

            canPredict = false;
            updateGraphsView(true);          
            isPredicted = true;
        }
    }

    /* ------------------------------------------------------
    -- Author: [A.A]
    -- Name: _getDataPredict
    -- Description: get futur data
    -- Params: connectorType, measureCode
    -- Return: list predicted data
    -------------------------------------------------------*/
    function _getDataPredict(connectorType, measure) {
        if (connectorType == ConnectorsTemplate.ConnectorType.GoogleAnalytics) {
            if (measure == 0) {
                DataExplorerController.exploration.name = "Predicted CaptainDash visits"
                return [600, 881, 852, 1802, 1644, 1721, 1784, 497, 1005, 668, 1723, 1592, 1695, 1753, 399, 990, 723, 1737, 1535, 1594, 1672, 364, 1076, 744, 1601, 1433, 1359, 1476, 389, 1034, 741];
            } else if (measure == 10) {
                DataExplorerController.exploration.name = "Predicted CaptainDash first time visitors"
                return [726, 552, 518, 581, 595, 799, 739, 697, 644, 555, 527, 515, 617, 578, 619, 604, 581, 523, 502, 539, 539, 533, 554, 530, 531, 498, 508, 499, 514, 511, 518];
            }
        }
    }

    /* ------------------------------------------------------
-- Author: [M.C]
-- Name: _initialiseAppBarLabel
-- Description: initialise app bar globalisation
-- Params: no one 
-- Return: no one
------------------------------------------------------*/
    function _initialiseAppBarLabel() {
        cmdNewSerie.winControl.label = WinJS.Resources.getString("bottomAppBar_newSerie").value;
        cmdChangePeriod.winControl.label = WinJS.Resources.getString("bottomAppBar_changePeriod").value;
        cmdNewExploration.winControl.label = WinJS.Resources.getString("bottomAppBar_newExploratione").value;
        cmdpinToCockpit.winControl.label = WinJS.Resources.getString("bottomAppBar_pinToCockpit").value;
        cmdRate.winControl.label = WinJS.Resources.getString("bottomAppBar_rate").value;
    }

    function _hideFlyoutLegendAndRightMenu() {
        if (!DataExplorerController.isEmptyExploration)
            RightMenu.showHideRightMenu(false);
        Legend.hideFlyout();
    }

    /* ------------------------------------------------------
    -- Author: [A.A]
    -- Name: showAddSerieMenu
    -- Description: display add serie menu from appBar
    -- Params:
    -- Return:
    -------------------------------------------------------*/
    function showAddSerieMenu() {
        topAppBar.winControl.hide();
        div_dataExplorer_bottomAppBar.winControl.hide();
        RightMenu.showRightMenu(Pages.addSerieConnectorsTypeStep, null);
    }

    /* ------------------------------------------------------
    -- Author: [A.A]
    -- Name: _showTimeRangeMenu
    -- Description: display change dates menu from appBar
    -- Params:
    -- Return:
    -------------------------------------------------------*/
    function _showTimeRangeMenu() {
        topAppBar.winControl.hide();
        div_dataExplorer_bottomAppBar.winControl.hide();
        RightMenu.showRightMenu(Pages.timeRangeMenu, null);
    }

    /* ------------------------------------------------------
    -- Author: [S.H]
    -- Name: _showCurrentView
    -- Description: display the appropriate view of explorer page
    -- Params: No one
    -- Return: No one
    -------------------------------------------------------*/
    function _showCurrentView() {
        if (DataExplorerController.isEmptyExploration) {
            _showDefaultExplorerPage();
        }
        else
            updateGraphsView();
    }

    /* ------------------------------------------------------
    -- Author: [S.H]
    -- Name: showDefaultExplorerPage
    -- Description: display default view of Explorer page and manage app bar
    -- Params: No one
    -- Return: No one
    -------------------------------------------------------*/
    function _showDefaultExplorerPage() {
        CDHelper.displayHideDiv(div_explorer_DefaultPage, true);
        CDHelper.displayHideDiv(div_dataExplorer_headerPage, false);
        div_dataExplorer_bottomAppBar.winControl.hideCommands("cmdpinToCockpit");
        div_dataExplorer_bottomAppBar.winControl.hideCommands("separatorDataaExp");
        div_dataExplorer_bottomAppBar.winControl.hideCommands("cmdChangePeriod"); 
        div_dataExplorer_bottomAppBar.winControl.hideCommands("cmdPredict");
        div_dataExplorer_bottomAppBar.winControl.hideCommands("cmdNewExploration");
        if ((Windows.UI.ViewManagement.ApplicationView.value !== Windows.UI.ViewManagement.ApplicationViewState.snapped)) {
        showAddSerieMenu();
        
        }
        resetTitleExploration();
        isPredicted = false;
    }

    /* ------------------------------------------------------
    -- Author: [S.H]
    -- Name: showFullExplorerPage
    -- Description: display full view of Explorer page and manage app bar
    -- Params: No one
    -- Return: No one
    -------------------------------------------------------*/
    function _showFullExplorerPage() {
        CDHelper.displayHideDiv(div_dataExplorer_headerPage, true);
        CDHelper.displayHideDiv(div_explorer_DefaultPage, false);
        div_dataExplorer_bottomAppBar.winControl.showCommands("cmdpinToCockpit");
        div_dataExplorer_bottomAppBar.winControl.showCommands("separatorDataaExp");
        div_dataExplorer_bottomAppBar.winControl.showCommands("cmdChangePeriod");
        div_dataExplorer_bottomAppBar.winControl.showCommands("cmdPredict");
        div_dataExplorer_bottomAppBar.winControl.showCommands("cmdNewExploration");

        lbl_dataExplorerPage_currentFrequency.innerText = CDHelper.getFrequencyLabel(DataExplorerController.exploration.getFrequency());
        div_dataExplorer_selectedPeriod.innerText = CDHelper.formatDateToShow(new Date(DataExplorerController.exploration.timestamps[0]), DataExplorerController.exploration.getFrequency()) + ' to ' + CDHelper.formatDateToShow(new Date(DataExplorerController.exploration.timestamps[DataExplorerController.exploration.timestamps.length - 1]), DataExplorerController.exploration.getFrequency());

    }

    /* ------------------------------------------------------
     -- Author: [S.H]
    -- Name: _showPinToCockpitMenu
    -- Description: show Pin to dashboard Menu
    -- Params: No one
    -- Return: No one
    -------------------------------------------------------*/
    function _showPinToCockpitMenu() {
        topAppBar.winControl.hide();
        div_dataExplorer_bottomAppBar.winControl.hide();
        RightMenu.showRightMenu(Pages.pinToCockpit, null);
    }

    /* ------------------------------------------------------
     -- Author: [S.H]
     -- Name: _showNewExplorationPopup
     -- Description: show popup of new exploration
     -- Params: No one
     -- Return: No one
     -------------------------------------------------------*/
    function _showNewExplorationPopup() {
        topAppBar.winControl.hide();
        div_dataExplorer_bottomAppBar.winControl.sticky = true;

        Popup.showYesNoPopup(cmdNewExploration, MessagesHelper.MSG_CONFIRM_NEW_EXPLORATION_TITLE, MessagesHelper.MSG_CONFIRM_NEW_EXPLORATION_TXT,
        MessagesHelper.buttonsLabel.continue,
        function () {
            _deleteExploration();
            _showDefaultExplorerPage();
        },
        MessagesHelper.buttonsLabel.cancel,
        function () {
            div_dataExplorer_bottomAppBar.winControl.sticky = false;
            div_dataExplorer_bottomAppBar.winControl.hide();
        },
        CDHelper.position.right);
    }
    /* ------------------------------------------------------
      -- Author: [S.H]
      -- Name: _deleteExploration
      -- Description: delete exploration object, svg object 
         and clear legend and grid content
      -- Params: No one
      -- Return: No one
      -------------------------------------------------------*/
    function _deleteExploration() {
        if (!DataExplorerController.isEmptyExploration) {
            DataExplorerController.deleteExploration();
            D3jsAccess.deleteSvgObject(viewObjectExplorer);
            div_dataExplorer_legendContainer.innerHTML = '';
            div_dataExplorer_gridHeader.innerHTML = '';
        }
    }

    /*------------------------------------------------------
    -- Author: [M.C]
    -- Name: createAdvencedTooltip
    -- Description: buils list picto detail
    -- Params: values
    -- Return: no one
    -------------------------------------------------------*/
    function createTooltips(values) {
        div_dataExplorer_tooltipsContainer.innerHTML = "";
        var tooltipsContainer = document.createElement("span");
        tooltipsContainer.className = 'div_dataExplorer_containerAdvencedTooltip';
        for (var count in values) {
            var tooltipObject = values[count];
            //create tooltip container
            var tooltipContainer = document.createElement("div");
            tooltipContainer.className = 'div_dataExplorer_subContainerAdvencedTooltip';
            //create picto container
            var pictoContainer = document.createElement("div");
            pictoContainer.className = 'picto_' + tooltipObject.type.toLocaleLowerCase() + '_' + CDHelper.convertColorToHex(tooltipObject.color).replace('#', '');
            pictoContainer.style.width = "30px";
            pictoContainer.style.height = "30px";
            pictoContainer.style.cssFloat = "left";
            pictoContainer.style.marginRight = "20px";
            pictoContainer.style.marginTop = "-6px";
            //create value container
            var valueContainer = document.createElement("div");
            valueContainer.appendChild(document.createTextNode(tooltipObject.value));
            valueContainer.style.color = CDHelper.convertColorToHex(tooltipObject.color);
            valueContainer.className = 'lbl_dataExplorer_advencedTooltip';
            tooltipContainer.appendChild(pictoContainer);
            tooltipContainer.appendChild(valueContainer);
            tooltipsContainer.appendChild(tooltipContainer);
        }
        div_dataExplorer_tooltipsContainer.appendChild(tooltipsContainer);
    }

    /*------------------------------------------------------
    -- Author: [M.C]
    -- Name: clearTooltipsContainer
    -- Description: initialise picto detail div
    -- Params: no one
    -- Return: no one
    -------------------------------------------------------*/
    function clearTooltipsContainer() {
        if (div_dataExplorer_tooltipsContainer)
            div_dataExplorer_tooltipsContainer.innerHTML = "";
    }

    /*------------------------------------------------------
    -- Author: [M.C]
    -- Name: _createSvg
    -- Description:create svg
    -- Params: val boolean
    -- Return: no one
    -------------------------------------------------------*/
    function _createSvg(isOverHight) {
        var gComponents = document.querySelector('#div_dataExplorer_Container').querySelectorAll('g');
        if (gComponents.length > 0) {
            document.querySelector('#div_dataExplorer_Container').lastChild.removeChild(gComponents[0]);
        }

        var mySvg = $('#div_dataExplorer_Container').svg();
        mySvg[0].childNodes[1].id = "container";
        mySvg[0].childNodes[1].style.width = '100%';
        mySvg[0].childNodes[1].style.height = (isOverHight) ? '100%' : 'calc(100% - 25px)';
        mySvg[0].childNodes[1].style.overflowX = 'hidden';
        mySvg[0].childNodes[1].style.overflowY = 'visible';
        $('#div_dataExplorer_Container').svg('get').clear();

    }

    /*------------------------------------------------------
    -- Author: [M.C]
    -- Name: showHideStackableBtn
    -- Description:show hide stack button
    -- Params: no one
    -- Return: no one
    -------------------------------------------------------*/
    function _showHideStackableBtn() {
        if (D3jsAccess.isStackedMode(viewObjectExplorer))
            div_dataExplorer_stackedLogo.style.display = "-ms-grid";
        else
            div_dataExplorer_stackedLogo.style.display = "none";
    }

    /* ------------------------------------------------------
-- Author: [M.C]
-- Name: deleteSerie
-- Description: delete serie 
-- Params: idSerie
-- Return: no one
-------------------------------------------------------*/
    function deleteSerie(idSerie) {
        DataExplorerController.deleteSerie(idSerie);
        if (DataExplorerController.isEmptyExploration) {
            _showDefaultExplorerPage()
            RightMenu.showHideRightMenu(true);
            div_dataExplorer_bottomAppBar.winControl.hideCommands("cmdpinToCockpit");
        }
    }

    /* ------------------------------------------------------
-- Author: [M.C]
-- Name: modifySerie
-- Description: open modify serie menu
-- Params: idSerie
-- Return: no one
-------------------------------------------------------*/
    function modifySerie(idGraph) {
        var currentGraph = DataExplorerController.exploration.getGraphFromId(idGraph);
        currentGraph.tmpGraphId = currentGraph.id;
        if (currentGraph)
            RightMenu.showRightMenu(Pages.modifySerieResumeStep, currentGraph);
    }
 
    function onResize() {
        clearTooltipsContainer();
        div_dataExplorer_explorationsHeader.style.msGridColumns = "1fr calc(100% - 600px) auto";
        if ((Windows.UI.ViewManagement.ApplicationView.value === Windows.UI.ViewManagement.ApplicationViewState.snapped)) {
            RightMenu.showHideRightMenu(false);
            div_dataExplorer_contentPage.scrollLeft = 0;
            div_dataExplorer_flyoutAgregation.style.display = 'none';
            div_dataExplorer_contentPage.style.msGridColumns = "0% 0% 100% 0% 0% 0%";
            document.getElementById('div_dataExplorer_bottomAppBar').winControl.hideCommands("cmdNewExploration"); 
            document.getElementById('div_dataExplorer_bottomAppBar').winControl.hideCommands("cmdChangePeriod");
            document.getElementById('div_dataExplorer_bottomAppBar').winControl.hideCommands("cmdPredict");
            document.getElementById('div_dataExplorer_bottomAppBar').winControl.hideCommands("cmdNewSerie");
            var tempViewObject = D3jsAccess.drawExploration(DataExplorerHelper.idContainerSmallSvgExplorer, DataExplorerController.exploration, true);
            D3jsAccess.displayExploration(tempViewObject, DataExplorerHelper.idContainerSmallSvgExplorer, DataExplorerController.exploration);
            div_dataExplorer_stackedLogo.style.width = '0px';
        }
        else {
            div_dataExplorer_flyoutAgregation.style.display = '-ms-grid';
            div_dataExplorer_contentPage.style.msGridColumns = "63.1% calc(137.5px + 3.25%) 300px 120px " + GridHelper.gridWidth + "px 20%";

            document.getElementById('div_dataExplorer_bottomAppBar').winControl.showCommands("cmdNewSerie");
            div_dataExplorer_stackedLogo.style.width = '40px';
            if (DataExplorerController.isEmptyExploration) {
                RightMenu.showHideRightMenu(true);
            }
            else {
                updateGraphsView();
                document.getElementById('div_dataExplorer_bottomAppBar').winControl.showCommands("cmdNewExploration");
                document.getElementById('div_dataExplorer_bottomAppBar').winControl.showCommands("cmdChangePeriod");
                document.getElementById('div_dataExplorer_bottomAppBar').winControl.showCommands("cmdPredict");
            }
        }
    }
    /* ------------------------------------------------------
-- Author: [M.C]
-- Name: sleepSerie
-- Description: hide /show serie
-- Params: idSerie
-- Return: no one
-------------------------------------------------------*/
    function sleepSerie(idSerie) {
          DataExplorerController.sleepSerie(idSerie);
    }

    /* ------------------------------------------------------
    -- Author: [A.A]
    -- Name: _changeFrequency
    -- Description: change aggregation
    -- Params:
    -- Return:
    -------------------------------------------------------*/
    function _changeFrequency(frequency, label) {
        DataExplorerController.exploration.setFrequency(frequency);
        lbl_dataExplorerPage_currentFrequency.innerText = CDHelper.getFrequencyLabel(frequency);
        DataExplorerController.exploration.setTimeStamps();
        DataExplorerController.getExplorationData(DataExplorerController.exploration, updateGraphsView);
        CDHelper.showHideLoading(true);
        isPredicted = false;
    }

    /* ------------------------------------------------------
    -- Author: [A.A]
    -- Name: _updateGraphView
    -- Description: update graph view
    -- Params:
    -- Return:
    -------------------------------------------------------*/
    function updateGraphsView(retryPredict) {
        if (isPredicted)
            _PredictIt(predictInt);
        else if (DataExplorerController.exploration.getFrequency() == 3 && (DataExplorerController.exploration.graphs_attributes[0].measure == 0 || DataExplorerController.exploration.graphs_attributes[0].measure == 10) && DataExplorerController.exploration.graphs_attributes[0].source == ConnectorsTemplate.ConnectorType.GoogleAnalytics && !retryPredict && CDHelper.compareDates(new Date(DataExplorerController.exploration.timestamps[DataExplorerController.exploration.timestamps.length - 1]), new Date()) > 0) {
            canPredict = true;
            _PredictIt(predictInt);
        }

        CDHelper.showHideLoading(true);
        RightMenu.showHideRightMenu(false);

        _showFullExplorerPage();
        clearTooltipsContainer();
        _createSvg();

        viewObjectExplorer = D3jsAccess.drawExploration(DataExplorerHelper.idContainerSvgExplorer, DataExplorerController.exploration, false);
        D3jsAccess.displayExploration(viewObjectExplorer, DataExplorerHelper.idContainerSvgExplorer, DataExplorerController.exploration);
        _showHideStackableBtn();
        Grid.drawGrid(DataExplorerController.buildDataGrid());
        DataExplorerController.buildAllLegend();
        CDHelper.showHideLoading(false);
        initialiseTitleExploration(DataExplorerController.exploration.name)
        if ((Windows.UI.ViewManagement.ApplicationView.value === Windows.UI.ViewManagement.ApplicationViewState.snapped)) {
           onResize();
        }
    }

    /* ------------------------------------------------------
    -- Author: [A.A]
    -- Name: _showFrequencyFlyout
    -- Description: show list frequencys flyout
    -- Params:
    -- Return:
    -------------------------------------------------------*/
    function _showFrequencyFlyout() {
        Popup.showSelectBox(lbl_dataExplorerPage_currentFrequency, DataExplorerHelper.getListFrequencysFlyout(DataExplorerController.exploration.getFrequency()), _changeFrequency, CDHelper.position.left);
    }

    /* ------------------------------------------------------
   -- Author: [M.C]
   -- Name: showHideTooltipsContainer
   -- Description: show hide container details(picto and value) and hide aggregation flyout
   -- Params:show : boolean,date :date : Date
   -- Return:
   -------------------------------------------------------*/
    function showHideTooltipsContainer(show, date) {

        if (show) {
            div_dataExplorer_stackedLogo.style.width = '40px';
            div_dataExplorer_flyoutAgregation.style.display = '-ms-grid';
            div_dataExplorer_selectedPeriod.innerHTML = CDHelper.formatDateToShow(DataExplorerController.exploration.start_date, DataExplorerController.exploration.getFrequency()) + ' to ' + CDHelper.formatDateToShow(DataExplorerController.exploration.end_date, DataExplorerController.exploration.getFrequency());
            div_dataExplorer_explorationsHeader.style.msGridColumns = "1fr calc(100% - 600px) auto";
        }
        else {
            div_dataExplorer_stackedLogo.style.width = '0px';
            div_dataExplorer_flyoutAgregation.style.display = 'none';
            div_dataExplorer_selectedPeriod.innerHTML = CDHelper.formatDateToShow(new Date(date), DataExplorerController.exploration.getFrequency());
            div_dataExplorer_explorationsHeader.style.msGridColumns = "auto 1fr auto";
        }
    }
    
    /* ------------------------------------------------------
-- Author: [M.C]
-- Name:drawTile
-- Description: draw tile in explorer page
-- Params: tile object
-- Return: no one
-------------------------------------------------------*/
    function drawTile(currentTile) {

        if (currentTile.widgetType == CockpitHelper.TileType.Numerique) {
            DataExplorerController.drawNumericTile(currentTile);
        } else if (currentTile.widgetType == CockpitHelper.TileType.Exploration) {
            DataExplorerController.darwExplorationTile(currentTile);
            goToExplorer();
        }
        
    }

    /* ------------------------------------------------------
-- Author: [M.C]
-- Name:goToExplorer
-- Description: go to explorer page
-- Params: no one
-- Return: no one
-------------------------------------------------------*/
    function goToExplorer() {
        WinJS.Navigation.navigate(Pages.dataExplorer);
    }

    /* ------------------------------------------------------
-- Author: [M.C]
-- Name:resetTitleExploration
-- Description: reset name of exploration
-- Params: no one
-- Return: no one
-------------------------------------------------------*/
    function resetTitleExploration() {
        div_explorer_topPage_labelExploration.innerText = '';
    }

    /* ------------------------------------------------------
-- Author: [M.C]
-- Name:initialiseTitleExploration
-- Description: set the title of exploration
-- Params: string
-- Return: no one
-------------------------------------------------------*/
    function initialiseTitleExploration(title) {
        if (title) {
            div_explorer_topPage_labelExploration.innerText = CDHelper.capitaliseOnlyFirstLetter(title.trim());
            DataExplorerController.exploration.setName(title);
        }
        else if (div_explorer_topPage_labelExploration && div_explorer_topPage_labelExploration.innerText == '')
            div_explorer_topPage_labelExploration.innerText = DataExplorerHelper.NEW_EXPLORATION;

    }

    /* ------------------------------------------------------
-- Author: [M.C]
-- Name:getTitleExploration
-- Description: get title of exploration
-- Params: no one
-- Return: no one
-------------------------------------------------------*/
    function getTitleExploration() {
        if (div_explorer_topPage_labelExploration.innerText != DataExplorerHelper.NEW_EXPLORATION)
            return div_explorer_topPage_labelExploration.innerText;
        else
            return '';

    }
    WinJS.Namespace.define("DataExplorer", {
        createTooltips: createTooltips,
        deleteSerie: deleteSerie,
        modifySerie: modifySerie,
        sleepSerie: sleepSerie,
        viewObjectExplorer: { get: function () { return viewObjectExplorer; }, set: function (val) { return viewObjectExplorer = val; } },
        showAddSerieMenu: showAddSerieMenu,
        _showFullExplorerPage: _showFullExplorerPage,//todo mohemed remove it
        _createSvg: _createSvg,//todo mohemed remove it
        onResize: onResize,
        clearTooltipsContainer: clearTooltipsContainer,
        updateGraphsView: updateGraphsView,
        showHideTooltipsContainer: showHideTooltipsContainer,
        drawTile: drawTile,
        goToExplorer: goToExplorer,
        resetTitleExploration: resetTitleExploration,
        initialiseTitleExploration: initialiseTitleExploration,
        getTitleExploration: getTitleExploration,
    });

})();