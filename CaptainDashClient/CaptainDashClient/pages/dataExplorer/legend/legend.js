
(function () {

    /* ------------------------------------------------------
-- Author: [M.C]
-- Name: addBtnNewSerie
-- Description: add button add new source
-- Params: no one
-- Return: no one
-------------------------------------------------------*/
    function addBtnNewSerie() {
        var newSerie = WinJS.Resources.getString("Legend_newSerie").value;

        var contenairLegendGlobal = document.createElement("div");
        contenairLegendGlobal.className = "contenairLegendGlobal";
        var newSerieLegend = document.createElement("div");
        newSerieLegend.className = "newSerieLegend";
        var txt_newSerieLegend = document.createElement("div");
        txt_newSerieLegend.className = "txt_newSerieLegend";
        txt_newSerieLegend.innerText = newSerie;
        newSerieLegend.appendChild(txt_newSerieLegend);
        contenairLegendGlobal.appendChild(newSerieLegend);
        div_dataExplorer_legendContainer.appendChild(contenairLegendGlobal);
        contenairLegendGlobal.onclick = DataExplorer.showAddSerieMenu;
    }

    /* ------------------------------------------------------
-- Author: [M.C]
-- Name: _createFlyout
-- Description: build flyout legend
-- Params: idSerie, status (0 or 1), canSleep:(true,false)
-- Return: html
-------------------------------------------------------*/
    function _createFlyout(idSerie, status, canSleep) {

        var deleteItemLabel = WinJS.Resources.getString("Legend_delete").value;
        var modify = WinJS.Resources.getString("Legend_modify").value;
        var wakeUp = WinJS.Resources.getString("Legend_wakeUp").value;
        var sleep = WinJS.Resources.getString("Legend_sleep").value;

        var containerFlyout = document.createElement("div");

        var deleteElem = document.createElement("div");
        var modifyElem = document.createElement("div");
        var sleepElem = document.createElement("div");

        var separator = document.createElement("div");
        var containerDeleteLegend = document.createElement("div");
        var containerModifyLegend = document.createElement("div");
        var containerSleepLegend = document.createElement("div");


        containerFlyout.className = "flyoutLegend";

        separator.className = "separatorLegend";
        deleteElem.className = "deleteLegend";
        modifyElem.className = "modifyLegend";
        sleepElem.className = "sleepLegend";

        containerDeleteLegend.className = "containerDeleteLegend";
        containerModifyLegend.className = "containerModifyLegend";
        containerSleepLegend.className = "containerSleepLegend";

        deleteElem.appendChild(document.createTextNode("Delete"));
        modifyElem.appendChild(document.createTextNode("Modify"));
        if (status)
            sleepElem.appendChild(document.createTextNode("Wake up"));
        else
            sleepElem.appendChild(document.createTextNode("Sleep"));

        containerDeleteLegend.dataSrc = idSerie;
        containerModifyLegend.dataSrc = idSerie;
        containerSleepLegend.dataSrc = idSerie;

        containerDeleteLegend.appendChild(deleteElem);
        containerModifyLegend.appendChild(modifyElem);
        containerSleepLegend.appendChild(sleepElem);

        containerFlyout.appendChild(containerDeleteLegend);
        containerFlyout.appendChild(containerModifyLegend);

        if ((canSleep) || (status)) {
            containerFlyout.appendChild(separator);
            containerFlyout.appendChild(containerSleepLegend);
        }
        else if (!status) {
            containerFlyout.style.msGridRows = "40px 40px 0px 0px";
        }

        return containerFlyout
    }

    /* ------------------------------------------------------
-- Author: [M.C]
-- Name: _createDimensionLegend
-- Description: build dimensions bloc
-- Params: dimensions :array
-- Return: html
-------------------------------------------------------*/
    function _createDimensionLegend(dimensions) {
        var msgridRows = ""
        var div_dimensions = document.createElement("div");
        div_dimensions.className = "div_dimensions";
        var listDimensions = [];
        for (var count = 0; count < dimensions.length; count++) {
            if (listDimensions[dimensions[count][0]]) {
                listDimensions[dimensions[count][0]].push(dimensions[count][1]);
            }
            else {
                listDimensions[dimensions[count][0]] = [];
                listDimensions[dimensions[count][0]].push(dimensions[count][1]);
            }
        }
        var indiceDimension = 0;
        for (var dimension in listDimensions) {

            var div_dimension_key = document.createElement("div");
            var div_dimension_value = document.createElement("div");
            div_dimension_key.className = "div_dimension_key";
            div_dimension_value.className = "div_dimension_value";

            div_dimension_key.appendChild(document.createTextNode(CDHelper.capitaliseOnlyFirstLetter((dimension).toLowerCase())));

            for (var count = 0; count < listDimensions[dimension].length; count++) {
                var elem_dimension = document.createElement("div");
                elem_dimension.appendChild(document.createTextNode(CDHelper.capitaliseOnlyFirstLetter((listDimensions[dimension][count]).toLowerCase())));
                div_dimension_value.appendChild(elem_dimension);
            }
            if (listDimensions[dimension].length) {
                msgridRows += "auto auto";
                div_dimension_key.style.msGridRow = indiceDimension + 1;
                div_dimension_value.style.msGridRow = indiceDimension + 2;

                div_dimensions.appendChild(div_dimension_key);
                div_dimensions.appendChild(div_dimension_value);
            }
            indiceDimension++;
        }

        return div_dimensions;
    }

    /* ------------------------------------------------------
-- Author: [M.C]
-- Name: _showAdvencedFiltreMenu
-- Description: show right menu (advenced filter)
-- Params: event
-- Return: no one
-------------------------------------------------------*/
    function _showAdvencedFiltreMenu(e) {
        //   DataExplorer.showModifySerieMenu(this.dataSrc, false);//todo
        e.stopPropagation();
    }

    /* ------------------------------------------------------
-- Author: [M.C]
-- Name: _createAdvencedLegend
-- Description: create advenced legend bloc
-- Params: idSerie
-- Return: html
-------------------------------------------------------*/
    function _createAdvencedLegend(idSerie) {
        var advanced_Filter = WinJS.Resources.getString("Legend_advanced_Filter").value;
        var div_legend_advencedContainer = document.createElement("div");
        var img_legend_Advenced = document.createElement("div");
        var lbl_legend_Advenced = document.createElement("div");

        div_legend_advencedContainer.className = "div_legend_advencedContainer";
        img_legend_Advenced.className = "img_legend_Advenced";
        lbl_legend_Advenced.className = "lbl_legend_Advenced";

        lbl_legend_Advenced.appendChild(document.createTextNode(advanced_Filter));
        div_legend_advencedContainer.setAttribute("dataSrc", idSerie);
        div_legend_advencedContainer.addEventListener("click", _showAdvencedFiltreMenu);
        div_legend_advencedContainer.appendChild(img_legend_Advenced);
        div_legend_advencedContainer.appendChild(lbl_legend_Advenced);
        return div_legend_advencedContainer;
    }

    /* ------------------------------------------------------
-- Author: [M.C]
-- Name: _createTopLegend
-- Description: create top legend bloc
-- Params: idSerie
-- Return: html
-------------------------------------------------------*/
    function _createTopLegend(serie, canSleep) {
        var title;
        var div_legend_topContainer = document.createElement("div");
        var pictoLegend = document.createElement("div");
        var txt_legend_title = document.createElement("div");
        var img_legend_showHideFlyout = document.createElement("div");

        div_legend_topContainer.className = "div_legend_topContainer";
        pictoLegend.className = "pictoLegend";

        txt_legend_title.className = "txt_legend_title";
        img_legend_showHideFlyout.className = "img_legend_showHideFlyout";

        if (serie.status) {
            pictoLegend.className = 'picto_' + serie.type.toLocaleLowerCase() + '_' + ChartHelper.COLOR_SELCTED_SERIE.replace('#', '');
        }
        else {
            pictoLegend.className = 'picto_' + serie.type.toLocaleLowerCase() + '_' + CDHelper.convertColorToHex(serie.color).replace('#', '');
        }

        img_legend_showHideFlyout.appendChild(_createFlyout(serie.id, serie.status, canSleep));

        title = (serie.title != "") ? CDHelper.capitaliseOnlyFirstLetter(serie.title) : serie.title;
        txt_legend_title.appendChild(document.createTextNode(title));

        img_legend_showHideFlyout.addEventListener("click", _showFlyout, true);


        div_legend_topContainer.appendChild(pictoLegend);
        div_legend_topContainer.appendChild(txt_legend_title);
        div_legend_topContainer.appendChild(img_legend_showHideFlyout);

        return div_legend_topContainer;
    }

    /* ------------------------------------------------------
-- Author: [M.C]
-- Name: addLegend
-- Description: create top legend bloc
-- Params: serie : object ,canSleep:boolean
-- Return: no one
-------------------------------------------------------*/
    function addLegend(serie, canSleep) {

        var contenairLegendGlobal = document.createElement("div");
        var legende = document.createElement("div");

        contenairLegendGlobal.setAttribute("id", serie.id);

        contenairLegendGlobal.addEventListener("click", _showDetailLegend);

        contenairLegendGlobal.className = "contenairLegendGlobal";
        contenairLegendGlobal.style.marginBottom = '20px';
        legende.className = "legende";

        legende.appendChild(_createTopLegend(serie, canSleep));
        legende.appendChild(_createDetailLegend(serie));
        contenairLegendGlobal.appendChild(legende);

        if (serie.source == ConnectorsTemplate.ConnectorType.GoogleAnalytics || serie.source == ConnectorsTemplate.ConnectorType.Atlas) {
            contenairLegendGlobal.appendChild(_createAdvencedLegend(serie.id));
            contenairLegendGlobal.appendChild(_createDimensionLegend(serie.dimensions));
        }

        div_dataExplorer_legendContainer.appendChild(contenairLegendGlobal);

        //if (lastId == serie.id) {//todo : lastid of modified serie ,to be implimented

        //    contenairLegendGlobal.querySelector('.div_ContainerDeatail').style.display = '-ms-grid';
        //    if (contenairLegendGlobal.querySelector('.div_legend_advencedContainer'))
        //        contenairLegendGlobal.querySelector('.div_legend_advencedContainer').style.display = '-ms-grid';
        //    if (serie.dimensions.length && contenairLegendGlobal.querySelector('.div_dimensions'))
        //        contenairLegendGlobal.querySelector('.div_dimensions').style.display = '-ms-grid';
        //}

    }

    /* ------------------------------------------------------
-- Author: [M.C]
-- Name: _createDetailLegend
-- Description: create detail legend bloc
-- Params: serie : object 
-- Return: html
-------------------------------------------------------*/
    function _createDetailLegend(serie) {

        var source = WinJS.Resources.getString("Legend_source").value;
        var account = WinJS.Resources.getString("Legend_account").value;
        var axis = WinJS.Resources.getString("Legend_axis").value;

        var axeValue;
        var div_ContainerDeatail = document.createElement("div");

        var sourceLegend = document.createElement("div");
        var accountLegend = document.createElement("div");
        var yaxisLegend = document.createElement("div");

        var sourceLegendValue = document.createElement("div");
        var accountLegendValue = document.createElement("div");
        var yaxisLegendValue = document.createElement("div");

        var lbl_sourceLegend = document.createElement("div");
        var lbl_accountLegend = document.createElement("div");
        var lbl_yaxisLegend = document.createElement("div");

        lbl_sourceLegend.appendChild(document.createTextNode(source));
        lbl_accountLegend.appendChild(document.createTextNode(account));
        lbl_yaxisLegend.appendChild(document.createTextNode(axis));

        div_ContainerDeatail.className = 'div_ContainerDeatail';

        sourceLegend.className = 'sourceLegend';
        accountLegend.className = 'accountLegend';
        yaxisLegend.className = 'yaxisLegend';

        lbl_sourceLegend.className = 'lbl_legend';
        lbl_accountLegend.className = 'lbl_legend';
        lbl_yaxisLegend.className = 'lbl_legend';

        sourceLegendValue.className = 'legendValue';
        accountLegendValue.className = 'legendValue';
        yaxisLegendValue.className = 'legendValue';

        sourceLegendValue.style.width = '171px';
        accountLegendValue.style.width = '163px';
        yaxisLegendValue.style.width = '190px';

        axeValue = (serie.yAxis) ? LegendHelper.enumYaxis.Secondary : LegendHelper.enumYaxis.Main;

        sourceLegendValue.appendChild(document.createTextNode(CDHelper.capitaliseOnlyFirstLetter(ConnectorsTemplate.Connector.getConnectorLabel(serie.source))));
        accountLegendValue.appendChild(document.createTextNode(CDHelper.capitaliseOnlyFirstLetter(serie.account)));
        yaxisLegendValue.appendChild(document.createTextNode(axeValue));

        sourceLegend.appendChild(sourceLegendValue);
        sourceLegend.appendChild(lbl_sourceLegend);

        accountLegend.appendChild(accountLegendValue);
        accountLegend.appendChild(lbl_accountLegend);

        yaxisLegend.appendChild(yaxisLegendValue);
        yaxisLegend.appendChild(lbl_yaxisLegend);

        div_ContainerDeatail.appendChild(sourceLegend);
        div_ContainerDeatail.appendChild(accountLegend);
        div_ContainerDeatail.appendChild(yaxisLegend);

        return div_ContainerDeatail;
    }

    /* ------------------------------------------------------
-- Author: [M.C]
-- Name: _showDetailLegend
-- Description:collapse all legend and expand selected legend
-- Params: no one
-- Return: no one
-------------------------------------------------------*/
    function _showDetailLegend() {
        hideFlyout();
        //recuperer les trois elements selectionné
        var div_legend_detailsLegend = (document.getElementById(this.id)).querySelector('.div_ContainerDeatail');
        var btn_legend_advencedFilter = (document.getElementById(this.id)).querySelector('.div_legend_advencedContainer');
        var div_legend_dimension = (document.getElementById(this.id)).querySelector('.div_dimensions');

        var listDetailsLegend = document.querySelectorAll('.div_ContainerDeatail');
        for (var count = 0; count < listDetailsLegend.length; count++) {
            if (div_legend_detailsLegend != listDetailsLegend[count])
                _collapseByOne(listDetailsLegend[count], document.querySelectorAll(".contenairLegendGlobal"));
        }

        var listAdvencedFilterBtn = document.querySelectorAll('.div_legend_advencedContainer');
        for (var count = 0; count < listAdvencedFilterBtn.length; count++) {
            if (btn_legend_advencedFilter != listAdvencedFilterBtn[count])
                _collapseByOne(listAdvencedFilterBtn[count], document.querySelectorAll(".contenairLegendGlobal"));
        }

        var listeDimension = document.querySelectorAll('.div_dimensions');
        for (var count = 0; count < listeDimension.length; count++) {
            if (div_legend_dimension != listeDimension[count])
                _collapseByOne(listeDimension[count], document.querySelectorAll(".contenairLegendGlobal"));
        }

        if (btn_legend_advencedFilter) {
            //Disable manipulations on screen until hide animation endsdeleteLegend
            //  CaptainDashLoader.divManageControls.style.visibility = "visible";
        }
        if ((document.getElementById(this.id)).querySelector('.div_ContainerDeatail').style.display != '-ms-grid') {

            _expand(div_legend_detailsLegend, btn_legend_advencedFilter, div_legend_dimension, document.querySelectorAll(".contenairLegendGlobal"));
        }
        else {
            _collapse(div_legend_detailsLegend, btn_legend_advencedFilter, div_legend_dimension, document.querySelectorAll(".contenairLegendGlobal"));
        }
    }

    /* ------------------------------------------------------
-- Author: [M.C]
-- Name: deleteAllLegend
-- Description: delete all legend from html
-- Params: no one
-- Return: no one
-------------------------------------------------------*/
    function deleteAllLegend() {
        div_dataExplorer_legendContainer.innerHTML = "";
    }

    /* ------------------------------------------------------
-- Author: [M.C]
-- Name: _deleteSerie
-- Description: delete serie
-- Params: no one
-- Return: no one
-------------------------------------------------------*/
    function _deleteSerie() {
        hideFlyout();
        DataExplorer.deleteSerie(this.dataSrc);
    }

    /* ------------------------------------------------------
-- Author: [M.C]
-- Name: _modifySerie
-- Description: open modify serie right menu 
-- Params: no one
-- Return: no one
-------------------------------------------------------*/
    function _modifySerie(e) {
        e.stopPropagation();
        hideFlyout();
        DataExplorer.modifySerie(this.dataSrc);
    }

    /* ------------------------------------------------------
-- Author: [M.C]
-- Name: _sleepSerie
-- Description: show hide serie 
-- Params: no one
-- Return: no one
-------------------------------------------------------*/
    function _sleepSerie(e) {
        e.stopPropagation();
        DataExplorer.sleepSerie(this.dataSrc);
        hideFlyout();
    }

    /* ------------------------------------------------------
-- Author: [M.C]
-- Name: hideFlyout
-- Description: hide flyout
-- Params: no one
-- Return: no one
-------------------------------------------------------*/
    function hideFlyout() {
        var flyouts = document.querySelectorAll('.flyoutLegend');
        for (var count = 0; count < flyouts.length; count++) {
            flyouts[count].style.opacity = "0";
            WinJS.UI.Animation.hidePopup(flyouts[count]);
            flyouts[count].style.display = 'none';
        }
    }

    /* ------------------------------------------------------
-- Author: [M.C]
-- Name: _showFlyout
-- Description: show flyout
-- Params: no one
-- Return: no one
-------------------------------------------------------*/
    function _showFlyout(e) {
        e.stopPropagation();
        if (Windows.UI.ViewManagement.ApplicationView.value != Windows.UI.ViewManagement.ApplicationViewState.snapped) {
            hideFlyout();
            this.querySelector('.flyoutLegend').style.display = "-ms-grid";
            this.querySelector('.flyoutLegend').style.opacity = "1";
            WinJS.UI.Animation.showPopup(this.querySelector('.flyoutLegend'), null);
            this.querySelector('.flyoutLegend').querySelector('.containerDeleteLegend').addEventListener("MSPointerDown", _deleteSerie, true);
            this.querySelector('.flyoutLegend').querySelector('.containerModifyLegend').addEventListener("MSPointerDown", _modifySerie, true);
            if (this.querySelector('.flyoutLegend').querySelector('.containerSleepLegend')) {
                this.querySelector('.flyoutLegend').querySelector('.containerSleepLegend').addEventListener("MSPointerDown", _sleepSerie, true);
            }
        }
    }

    /* ------------------------------------------------------
-- Author: [M.C]
-- Name: _collapse
-- Description: annimation collapse all
-- Params: no one
-- Return: no one
-------------------------------------------------------*/
    function _collapse(element1, element2, element3, affected) {
        // Create collapse animation.
        var collapseAnimation1 = WinJS.UI.Animation.createCollapseAnimation(element1, affected);
        var collapseAnimation2 = WinJS.UI.Animation.createCollapseAnimation(element2, affected);
        var collapseAnimation3 = WinJS.UI.Animation.createCollapseAnimation(element3, affected);

        // Remove collapsing item from document flow so that affected items reflow to their new position.
        // Do not remove collapsing item from DOM or display at this point, otherwise the animation on the collapsing item will not display
        element1.style.position = "absolute";
        element1.style.opacity = "0";
        if (element2) {
            element2.style.position = "absolute";
            element2.style.opacity = "0";
        }
        if (element3) {
            element3.style.position = "absolute";
            element3.style.opacity = "0";
        }
        // Execute collapse animation.
        collapseAnimation1.execute().done(
            // After animation is complete (or on error), remove from display.
            function () { element1.style.display = "none"; },
            function () { element1.style.display = "none"; }
        );
        if (element2) {
            collapseAnimation2.execute().done(
               // After animation is complete (or on error), remove from display.
               function () {
                   element2.style.display = "none";
                   //Enable manipulations on screen
                   setTimeout(function () {
                       // CaptainDashLoader.divManageControls.style.visibility = "hidden"//todo
                   }, 300);
               },
               function () {
                   element2.style.display = "none";
                   //Enable manipulations on screen
               }
           );
        }
        if (element3) {
            collapseAnimation3.execute().done(
               // After animation is complete (or on error), remove from display.
               function () { element3.style.display = "none"; },
               function () { element3.style.display = "none"; }
           );
        }
    }

    /* ------------------------------------------------------
-- Author: [M.C]
-- Name: _expand
-- Description: annimation expand
-- Params: no one
-- Return: no one
-------------------------------------------------------*/
    function _expand(element1, element2, element3, affected) {
        // Create expand animation.
        var expandAnimation1 = WinJS.UI.Animation.createExpandAnimation(element1, affected);
        var expandAnimation2 = WinJS.UI.Animation.createExpandAnimation(element2, affected);
        var expandAnimation3 = WinJS.UI.Animation.createExpandAnimation(element3, affected);

        // Insert expanding item into document flow. This will change the position of the affected items.
        element1.style.display = "-ms-grid";
        element1.style.position = "inherit";
        element1.style.opacity = "1";
        if (element2) {
            element2.style.display = "-ms-grid";
            element2.style.position = "inherit";
            element2.style.opacity = "1";
        }
        if (element3) {
            element3.style.display = "-ms-grid";
            element3.style.position = "inherit";
            element3.style.opacity = "1";
        }
        // Execute expand animation.
        expandAnimation1.execute().done(
               // After animation is complete (or on error), remove from display.
               function () {
                   setTimeout(function () {
                       // CaptainDashLoader.divManageControls.style.visibility = "hidden";
                   }, 300);
               }
           );
        if (element2) {
            expandAnimation2.execute();
        }
        if (element3) {
            expandAnimation3.execute();
        }
    }

    /* ------------------------------------------------------
-- Author: [M.C]
-- Name: _collapseByOne
-- Description: annimation collapse one
-- Params: no one
-- Return: no one
-------------------------------------------------------*/
    function _collapseByOne(element, affected) {
        // Create collapse animation.
        var collapseAnimation1 = WinJS.UI.Animation.createCollapseAnimation(element, affected);

        // Remove collapsing item from document flow so that affected items reflow to their new position.
        // Do not remove collapsing item from DOM or display at this point, otherwise the animation on the collapsing item will not display
        element.style.position = "absolute";
        element.style.opacity = "0";

        // Execute collapse animation.
        collapseAnimation1.execute().done(
            // After animation is complete (or on error), remove from display.
            function () { element.style.display = "none"; },
            function () { element.style.display = "none"; }
        );
    }

    WinJS.Namespace.define("Legend", {
        deleteAllLegend: deleteAllLegend,
        addLegend: addLegend,
        addBtnNewSerie: addBtnNewSerie,
        hideFlyout:hideFlyout
    });

})();