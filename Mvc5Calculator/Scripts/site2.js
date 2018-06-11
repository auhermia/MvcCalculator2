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
        self.calcbutton = $('#calcbutton');
        self.convertbutton = $('#convertbutton');

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
        self.unitType = $('#unittype');
        self.isConverter = true; // to determine ClearMemory button action method
        self.convertEqual = $('#convert_equal');
        self.from = $('#from');
        self.to = $('#to');

        // --------------- Memory ---------------
        self.clearMem = $("#clearMem");

        return self;
    }

    // object to hold all unit conversion mapping
    var unitMappingCtrl = {};

    // unit conversion mapping
    var bindUnitMappingCtrl = function () {
        //data from the server is like this
        /**
        *
        [
        {
            unitType: 'Length',
            unitName: 'm'
        },
        {
            unitType: 'Area',
            unitName: 'm2'
        }
        ]

        self/.area = [];
        for(var i = 0; i < self.a; i++) {
        if(self.a[i]['unitType'] == 'Area') {
        self.area.push(self.a[i]);
}
}
         * 
         */



        var self = {};
        self.area = [
            { 'Id': 'm2', 'Property': [1.0, 'Square meter (m^2)'] },
            { 'Id': 'cm2', 'Property': [10000, 'Square centimeter (cm^2)'] },
            { 'Id': 'km2', 'Property': [0.000001, 'Square kilometer (km^2)'] },
            { 'Id': 'in2', 'Property': [1550, 'Square inch (in^2)'] },
            { 'Id': 'ft2', 'Property': [10.7639, 'Square foot (ft^2)'] },
            { 'Id': 'mi2', 'Property': [3.861e-7, 'Square mile (mi^2)'] },
            { 'Id': 'acre', 'Property': [0.000247105, 'Acre (acre)'] }
        ];
        self.length = [
            { 'Id': 'm', 'Property': [1.0, 'Meter (m)'] },
            { 'Id': 'cm', 'Property': [100, 'Centimeter (cm)'] },
            { 'Id': 'km', 'Property': [.001, 'Kilometer (km)'] },
            { 'Id': 'in', 'Property': [39.36996, 'Inch (in)'] },
            { 'Id': 'ft', 'Property': [3.28084, 'Foot (ft)'] },
            { 'Id': 'yd', 'Property': [1.09361, 'Yard (yd)'] },
            { 'Id': 'mi', 'Property': [0.000621371, 'Mile (mi)'] }
        ];
        self.mass = [
            { 'Id': 'kg', 'Property': [1.0, 'Kilogram (kg)'] },
            { 'Id': 'g', 'Property': [1000, 'Gram (g)'] },
            { 'Id': 'oz', 'Property': [35.274, 'Ounce (oz)'] },
            { 'Id': 'lb', 'Property': [2.20462, 'Pound (lb)'] },
            { 'Id': 't', 'Property': [0.00110231, 'Ton (t)'] }
        ];
        self.time = [
            { 'Id': 'day', 'Property': [1.0, 'Day (day)'] },
            { 'Id': 'hr', 'Property': [24, 'Hour (hr)'] },
            { 'Id': 'min', 'Property': [1440, 'Minute (min)'] },
            { 'Id': 'sec', 'Property': [86400, 'Second (sec)'] },
            { 'Id': 'wk', 'Property': [0.142857, 'Week (wk)'] },
            { 'Id': 'mo', 'Property': [0.0328767, 'Month (mo)'] },
            { 'Id': 'yr', 'Property': [0.00273973, 'Year (yr)'] }
        ];
        self.volume = [
            { 'Id': 'l', 'Property': [1.0, 'Liter (L)'] },
            { 'Id': 'mL', 'Property': [1000, 'Milliliter (mL)'] },
            { 'Id': 'gal', 'Property': [0.264172, 'Gallon (gal)'] }
        ];
        self.temperature = [
            { 'Id': '\u00B0F', 'Property': [1.0, 'Farenheit (\u00B0F)'] },
            { 'Id': '\u00B0C', 'Property': [1.0, 'Celcius (\u00B0C)'] }
        ];

        return self;
    }

    /* ================================================ *
    *             1.  MAIN NAVIGATION   	            *
    * ================================================= */

    // Initial app load (show calculator)
    var initLoad = function () {
        //selectorCtrl.calculator.show();
        //selectorCtrl.converter.hide();
        selectorCtrl.isConverter = false
        calcPartial();                      // load calculator partial view
        updateDisplay();
    }
    // show calculator, hide converter
    var calcLoad = function () {
        //selectorCtrl.calculator.show();
        //selectorCtrl.converter.hide();
        selectorCtrl.isConverter = false;
        calcPartial();                      // load calculator partial view
    }
    // show converter, hide calculator
    var convLoad = function () {
        //selectorCtrl.calculator.hide();
        //selectorCtrl.converter.show();
        selectorCtrl.isConverter = true;
        convertPartial();                   // load converter partial view
        appendOption(unitMappingCtrl.length);
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

    // what: referesh unit dropdowns upon selecting a new unit type
    // how: filter ConverterUnitTables in db  based on unit type
    

    // refresh unit dropdowns upon selecting a new unit type
    var appendOption = function (convert_type) {
        let fromToUnit = $('#fromUnit, #toUnit');
        $.each(convert_type, function (i, item) {
            fromToUnit.append("<option value='" + item.Id + "'>" + item.Property[1] + "</option>");
        });
    }
    // invoking changes to unit type and unit dropdowns
    var changeUnitType = function () {
        let typeVal = selectorCtrl.type.val();
        let fromToUnit = $('#fromUnit, #toUnit');
        let fromToInput = $('#from, #to');

        //reset unit dropdown and input to ''
        fromToUnit.html('');
        fromToInput.val('');

        // display appropriate units when unit type is selected
        if (typeVal === "Mass") {
            appendOption(unitMappingCtrl.mass);
        } else if (typeVal === "Temperature") {
            appendOption(unitMappingCtrl.temperature);
        } else if (typeVal === "Time") {
            appendOption(unitMappingCtrl.time);
        } else if (typeVal === "Volume") {
            appendOption(unitMappingCtrl.volume);
        } else if (typeVal === "Area") {
            appendOption(unitMappingCtrl.area);
        } else {
            appendOption(unitMappingCtrl.length);
        }
    }

    var convEqualFunc = function () {
        let typeVal = selectorCtrl.type.val();
        let fromUnit = document.getElementById("fromUnit").value;
        let toUnit   = document.getElementById("toUnit").value;
        let fromValueRaw = document.getElementById("from").value;
        /*  Regex - throw error if entered value does not match accepted pattern     *
        *   ^ (beginning of input) -? (optional negative) \d* (0-9 0 or more times)  *
        *   \.? (optional decimal) d+ (0-9 1 or more times) $ (end of input)         */
        let pattern = /^-?\d*\.?\d+$/;
        let fromValue = fromValueRaw.match(pattern);
        (fromValue === '') ? selectorCtrl.to.val("Syntax Error") : fromValue = parseFloat(fromValue);

        // length
        if (typeVal === "Length") {
            // find unit ID in array based on fromUnit
            var fromCoeff = unitMappingCtrl.length.filter(function (unit) {
                return (unit.Id === fromUnit);
                //  find coefficient based on unit ID
            }).map(function (unit) {
                return (unit.Property[0]);
            });

            var toCoeff = unitMappingCtrl.length.filter(function (unit) {
                return (unit.Id === toUnit);
            }).map(function (unit) {
                return unit.Property[0];
            });
        }
        // area
        else if (typeVal === "Area") {
            var fromCoeff = unitMappingCtrl.area.filter(function (unit) {
                return (unit.Id === fromUnit);
            }).map(function (unit) {
                return (unit.Property[0]);
            });

            var toCoeff = unitMappingCtrl.area.filter(function (unit) {
                return (unit.Id === toUnit);
            }).map(function (unit) {
                return unit.Property[0];
            });
        }
        // mass
        else if (typeVal === "Mass") {
            var fromCoeff = unitMappingCtrl.mass.filter(function (unit) {
                return (unit.Id === fromUnit);
            }).map(function (unit) {
                return (unit.Property[0]);
            });

            var toCoeff = unitMappingCtrl.mass.filter(function (unit) {
                return (unit.Id == toUnit);
            }).map(function (unit) {
                return unit.Property[0];
            });
        }
        // time
        else if (typeVal === "Time") {
            var fromCoeff = unitMappingCtrl.time.filter(function (unit) {
                return (unit.Id === fromUnit);
            }).map(function (unit) {
                return (unit.Property[0]);
            });

            var toCoeff = unitMappingCtrl.time.filter(function (unit) {
                return (unit.Id === toUnit);
            }).map(function (unit) {
                return unit.Property[0];
            });
        }
        // volume
        else if (typeVal === "Volume") {
            var fromCoeff = unitMappingCtrl.volume.filter(function (unit) {
                return (unit.Id === fromUnit);
            }).map(function (unit) {
                return (unit.Property[0]);
            });

            var toCoeff = unitMappingCtrl.volume.filter(function (unit) {
                return (unit.Id == toUnit);
            }).map(function (unit) {
                return unit.Property[0];
            });
        }
        // temperature
        else {
            // note - equations not linearly scaled.  equations in controller
            var toCoeff = 1;
            var fromCoeff = 1;
        }
        // Make ajax call
        Convert(fromUnit, fromValue, fromCoeff, toUnit, toCoeff);
    }

    // Ajax call to controller to perform conversion
    var Convert = function (fromUnit, fromValue, fromCoeff, toUnit, toCoeff) {
        $.ajax({
            method: "POST",
            url: "/Converter/Convert",
            data: {
                FromUnit: fromUnit, FromValue: fromValue, FromCoeff: fromCoeff,
                ToUnit: toUnit, ToCoeff: toCoeff
            },
            success: function (result) {
                let toValue = result;
                selectorCtrl.to.val(toValue);
                AddConvert(toValue, fromValue, toUnit, fromUnit);
            },
            error: function () {
                selectorCtrl.to.val("Syntax Error");
            }
        })
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
        })
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
        //selectorCtrl.type.change(changeUnitType);
        //selectorCtrl.convertEqual.click(convEqualFunc);

        // Keypress
        selectorCtrl.document.keypress(keyPress);
    }
    var init = function () {
        selectorCtrl = bindSelectorCtrl();
        unitMappingCtrl = bindUnitMappingCtrl();
        bindFunctions();
    }
    return {
        init: init
    }

})();

$(document).ready(function () {
    console.log("this runs");

    $('#unitType').change(function () {
        alert($('#unitType :selected').text());
    });

    var unitName = $('#unitType :selected').text();
    $.ajax({
        method: "GET",
        async: false,
        url: "/Converter/FilterUnitTypes",
        data: "unitName",
        success: function (result) {
            // refresh partial view. new conversion will appear
            alert(result);
        }
    })

        
    runCalcConv.init();
});