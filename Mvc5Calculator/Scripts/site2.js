// main function
var runCalcConv = (function () {

    // object to hold all selector assignments
    var selectorCtrl = {};

    // selector assignments
    var bindSelectorCtrl = function () {
        var self = {};

        self.document = $(document);

        // --------------- Main Navigation ---------------
        self.calculator = $('#calculator');
        self.converter = $('#converter');
        self.calcbutton = $('#calcButton');
        self.convertbutton = $('#convertButton');

        // --------------- Calculator ---------------
        self.topDisplay = $("#topdisplay");
        self.bottomDisplay = $("#bottomdisplay");
        self.num = $('.num');
        self.plusMinus = $('#plusminus');
        self.backSpace = $('#backspace');
        self.operator = $('.operator');
        self.equal = $('#equal');
        self.clear = $('#clear');

        // --------------- Unit Converter ---------------
        self.unitType = $('#unitType');
        self.isConverter = true; // to determine ClearMemory button action method
        self.convertEqual = $('#convert_equal');
        self.fromToUnit = $('#fromUnit, #toUnit');
        self.from = $('#from');
        self.to = $('#to');

        // --------------- Memory ---------------
        self.clearMem = $("#clearMem");

        return self;
    }

    /* ================================================ *
    *             1.  MAIN NAVIGATION   	            *
    * ================================================= */

    // Initial app load (show calculator)
    var initLoad = function () {
        selectorCtrl.isConverter = false
        calcPartial();                      // load calculator partial view
        LoadUnitsIntoDropdown();

        updateDisplay();                       // ------------- WHAT IS THIS FOR AGAIN?????!!!!!!!!! -----#@&^*$
    }
    // show calculator, hide converter
    var calcLoad = function () {
        console.log("CALCULATOR");
        selectorCtrl.isConverter = false;
        calcPartial();                      // load calculator partial view
    }
    // show converter, hide calculator
    var convLoad = function () {
        console.log("Converter");
        selectorCtrl.isConverter = true;
        convertPartial();                   // load converter partial view
    }
    // Partial View Load function - previous calculations
    var calcPartial = function () {
        $.ajax({
            url: "/Calculator/CalcPartial",
            type: "GET",
            success: function (result) {
                $("#expression").html(result);
            }
        });
    }
    // Partial View Load function - previous conversions
    var convertPartial = function () {
        $.ajax({
            url: "/Converter/ConvertPartial",
            type: "GET",
            success: function (result) {
                $("#expression").html(result);
            }
        });
    }
    // Function to clear Memory section
    var clearMem = function () {
        $.ajax({
            method: "POST",
            url: (selectorCtrl.isConverter === true) ? "/Converter/Delete" : "/Calculator/Delete",
            success: (selectorCtrl.isConverter === true) ? convertPartial() : calcPartial()
        });
    }

    /* ================================================ *
    *               2.  CALCULATOR			            *
    * ================================================= */

    // define object (see calc.js)
    var calculatorObj = Calculator();
    
    // refresh display upon each action (below)
    var updateDisplay = function () {
        selectorCtrl.bottomDisplay.text(calculatorObj.currentState());
        selectorCtrl.topDisplay.text(calculatorObj.previousState());
    }
    /* ========== ACTIONS ========== */

    // when num key is pressed
    var numFunc = function (e) {
        calculatorObj.num($(e.target).text());
    }
    //  switch between negative or positive value
    var plusMinusFunc = function () {
        calculatorObj.plusMinus();
    }
    //  delete previous digit
    var backSpaceFunc = function () {
        calculatorObj.backspace();
    }
    // when + - * / ^ are pressed
    var operatorFunc = function (e) {
        calculatorObj.operator($(e.target).text());
    }
    // when '=' is pressed.  sends values to controller via Eval()
    var equalFunc = function () {
        calculatorObj.Eval(calculatorObj.getVal2(), calculatorObj.getVal1(), calculatorObj.getOperator());
        // note - AddCalc does not call calcPartial after success because calc.js is loaded first
        calcPartial();
        calculatorObj.Reset();
    }
    var clearFunc = function () {
        calculatorObj.Clear();
    }
 
    /* ================================================ *
    *               3.  UNIT CONVERTER		            *
    * ================================================= */

    // WHAT: Changing unit types
    var ChangeUnitType = function () {

        selectorCtrl.fromToUnit.empty();
        LoadUnitsIntoDropdown();
    }

    // WHAT: Refresh unit dropdowns upon selecting a new unit type
    var LoadUnitsIntoDropdown = function () {
        
        let selectedUnitType = $('#unitType :selected').text();
        let fromToUnit = $('#fromUnit, #toUnit');

        $.ajax({
            type: "POST",
            url: "/Converter/GetUnitsByType",
            data: {
                unitType: selectedUnitType
            },
            success: function (units) {
                console.log(units);
                $.each(units, function (key, value) {
                    fromToUnit.append("<option value='" + value.Id + "'>" + value.UnitLongName + "</option>");
                });
            }
        });
    }

    var DoConversion = function () {
        
        let fromUnit = $('#fromUnit :selected').text();
        let toUnit = $('#toUnit :selected').text();

        /*  Regular expressions - throw error if entered value does not match accepted pattern     *
        *   ^ (beginning of input) -? (optional negative) \d* (0-9 0 or more times)                *
        *   \.? (optional decimal) d+ (0-9 1 or more times) $ (end of input)                       */
        let fromValueRaw = document.getElementById("from").value;
        let pattern = /^-?\d*\.?\d+$/;
        let fromValue = fromValueRaw.match(pattern);
        (fromValue === '') ? selectorCtrl.to.val("Syntax Error") : fromValue = parseFloat(fromValue);

        // send to controller to do conversions
        Convert(fromUnit, fromValue, toUnit);
    }

    // Ajax call to controller to perform conversion
    var Convert = function (fromUnit, fromValue, toUnit) {
        //console.log()
        $.ajax({
            method: "POST",
            url: "/Converter/Convert",
            data: {
                FromUnit: fromUnit, FromValue: fromValue, ToUnit: toUnit
            },
            success: function (result) {
                let toValue = result;
                selectorCtrl.to.val(toValue);
                console.log(result);
                //AddConvert(toValue, fromValue, toUnit, fromUnit);
            },
            error: function () {
                selectorCtrl.to.val("Syntax Error");
            }
        });
    }
    // Ajax call to save conversion to db
    var AddConvert = function (toValue, fromValue, toUnit, fromUnit) {
        $.ajax({
            method: "POST",
            async: false,
            url: "/Converter/AddConvert",
            data: {
                ToValue: toValue, FromUnit: fromUnit, FromValue: fromValue, ToUnit: toUnit
            },
            success: function () {
                // refresh partial view. new conversion will appear
                convertPartial();
            }
        });
    }

    // --------------- Enable keyboard input ---------------
    var keyPress = function (e) {
        let key = e.which;
        // converter - does not allow keypress from here to affect calculator
        if ($(e.target).is('input')) {
            if (e.which != 8                        // backspace
                && e.which != 45                        // negative sign (temperature)
                && e.which != 46                        // decimal pt
                && (e.which < 48 || e.which > 57)) {    // 0-9
                return false;
            }
            return;
        }
        // calculator
        if (key === 48) { calculatorObj.num(0); }
        else if (key === 49) { calculatorObj.num(1); }
        else if (key === 50) { calculatorObj.num(2); }
        else if (key === 51) { calculatorObj.num(3); }
        else if (key === 52) { calculatorObj.num(4); }
        else if (key === 53) { calculatorObj.num(5); }
        else if (key === 54) { calculatorObj.num(6); }
        else if (key === 55) { calculatorObj.num(7); }
        else if (key === 56) { calculatorObj.num(8); }
        else if (key === 57) { calculatorObj.num(9); }
        else if (key === 46) { calculatorObj.num('.'); }        // .
        else if (key === 42) { calculatorObj.operator('×'); }   // *
        else if (key === 43) { calculatorObj.operator('+'); }   // +
        else if (key === 45) { calculatorObj.operator('-'); }   // -
        else if (key === 47) { calculatorObj.operator('÷'); }   // /
        else if (key === 94) { calculatorObj.operator('^'); }   // ^
        else if (key === 99) { calculatorObj.Clear(); }         // keyboard c
        else if (key === 8) { calculatorObj.backspace(); }      // backspace
        else if (key === 13 || key === 61) { equalFunc(); }     // = & carriage rtn (finicky)
        else { return false; }
    }
    
    /* ================================================ *
    *                   4.  SET UP  		            *
    * ================================================= */

    // enable all functions when init is called
    var bindFunctions = function () {
        // Loading Views
        initLoad();                 // --------- can i just do it here?
        selectorCtrl.calcbutton.click(calcLoad);
        selectorCtrl.convertbutton.click(convLoad);
        selectorCtrl.clearMem.click(clearMem);

        // Calulator functions
        calculatorObj.change(updateDisplay);
        selectorCtrl.num.click(numFunc);
        selectorCtrl.plusMinus.click(plusMinusFunc);
        selectorCtrl.backSpace.click(backSpaceFunc);
        selectorCtrl.operator.click(operatorFunc);
        selectorCtrl.equal.click(equalFunc);
        selectorCtrl.clear.click(clearFunc);

        // Converter functions        
        selectorCtrl.unitType.change(ChangeUnitType);
        selectorCtrl.convertEqual.click(DoConversion);

        // Keypress
        selectorCtrl.document.keypress(keyPress);
    }
    var init = function () {
        selectorCtrl = bindSelectorCtrl();
        bindFunctions();
    }
    return {
        init: init
    }

})();

$(document).ready(function () {

    runCalcConv.init();

});