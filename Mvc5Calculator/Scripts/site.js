//// 2/26/18 - fix newCalc order

//$(document).ready(function () {

//    /* ================================================ *
//    *                    DEFININITIONS     	            *
//    * ================================================= */

//    // --------------- Main Navigation ---------------
//    var calculator = $('#calculator');
//    var converter = $('#converter');
//    var calcbutton = $('#calcbutton');
//    var convertbutton = $('#convertbutton');

//    // --------------- Calculator ---------------
//    var topDisplay = $("#topdisplay");
//    var bottomDisplay = $("#bottomdisplay");

//    // --------------- Unit Converter ---------------
//    var type = $('#type');
//    var isConverter = true; // to determine ClearMemory button action method

//    // converion unit mapping
//    var area = [
//        { 'Id': 'm2', 'Property': [1.0, 'Square meter (m^2)'] },
//        { 'Id': 'cm2', 'Property': [10000, 'Square centimeter (cm^2)'] },
//        { 'Id': 'km2', 'Property': [0.000001, 'Square kilometer (km^2)'] },
//        { 'Id': 'in2', 'Property': [1550, 'Square inch (in^2)'] },
//        { 'Id': 'ft2', 'Property': [10.7639, 'Square foot (ft^2)'] },
//        { 'Id': 'mi2', 'Property': [3.861e-7, 'Square mile (mi^2)'] },
//        { 'Id': 'acre', 'Property': [0.000247105, 'Acre (acre)'] }
//    ];
//    var length = [
//        { 'Id': 'm',  'Property': [1.0, 'Meter (m)'] },
//        { 'Id': 'cm', 'Property': [100, 'Centimeter (cm)'] },
//        { 'Id': 'km', 'Property': [.001, 'Kilometer (km)'] },
//        { 'Id': 'in', 'Property': [39.36996, 'Inch (in)'] },
//        { 'Id': 'ft', 'Property': [3.28084, 'Foot (ft)'] },
//        { 'Id': 'yd', 'Property': [1.09361, 'Yard (yd)'] },
//        { 'Id': 'mi', 'Property': [0.000621371, 'Mile (mi)'] }
//    ];
//    var mass = [
//        { 'Id': 'kg', 'Property': [1.0, 'Kilogram (kg)'] },
//        { 'Id': 'g',  'Property': [1000, 'Gram (g)'] },
//        { 'Id': 'oz', 'Property': [35.274, 'Ounce (oz)'] },
//        { 'Id': 'lb', 'Property': [2.20462, 'Pound (lb)'] },
//        { 'Id': 't',  'Property': [0.00110231, 'Ton (t)'] }
//    ];
//    var time = [
//        { 'Id': 'day', 'Property': [1.0, 'Day (day)'] },
//        { 'Id': 'hr',  'Property': [24, 'Hour (hr)'] },
//        { 'Id': 'min', 'Property': [1440, 'Minute (min)'] },
//        { 'Id': 'sec', 'Property': [86400, 'Second (sec)'] },
//        { 'Id': 'wk',  'Property': [0.142857, 'Week (wk)'] },
//        { 'Id': 'mo',  'Property': [0.0328767, 'Month (mo)'] },
//        { 'Id': 'yr',  'Property': [0.00273973, 'Year (yr)'] }
//    ];
//    var volume = [
//        { 'Id': 'l', 'Property': [1.0, 'Liter (L)'] },
//        { 'Id': 'mL', 'Property': [1000, 'Milliliter (mL)'] },
//        { 'Id': 'gal', 'Property': [0.264172, 'Gallon (gal)'] }
//    ];
//    // to do: need to fix calculation ?
//    var temperature = [
//        { 'Id': '\u00B0F', 'Property': [1.0, 'Farenheit (\u00B0F)'] },
//        { 'Id': '\u00B0C', 'Property': [1.0, 'Celcius (\u00B0C)'] }
//    ];

//    /* ================================================ *
//    *                 MAIN NAVIGATION   	            *
//    * ================================================= */

//    // default - initial page load
//    calculator.show();
//    converter.hide();
//    calcPartial();
//    isConverter = false;

//    // display calculator portion, hide converter
//    calcbutton.click(function () {
//        calculator.show();
//        converter.hide();
//        calcPartial();
//        isConverter = false;
//    });

//    // display converter portion, hide calculator
//    convertbutton.click(function () {
//        calculator.hide();
//        converter.show();
//        convertPartial();
//        appendOption(length);
//        isConverter = true;
//    });

//    // Partial View Load function - calculator
//    function calcPartial() {
//        $.ajax({
//            url: "/Calculator/CalcPartial",
//            type: "GET",
//            success: function (result) {
//                $("#expression").html(result);
//            }
//        });
//    }
//    // Partial View Load function - converter
//    function convertPartial() {
//        $.ajax({
//            url: "/Converter/ConvertPartial",
//            type: "GET",
//            success: function (result) {
//                $("#expression").html(result);
//            }
//        });
//    }

//    // Clear Memory section
//    $("#clearMem").click(function () {
//        $.ajax({
//            method: "POST",
//            url: (isConverter == true) ? "/Converter/Delete" : "/Calculator/Delete",
//            success: function () {
//                if (isConverter == true) {
//                    convertPartial();
//                }
//                else {
//                    calcPartial();
//                }
//            }
//        })
//    });

//    /* ================================================ *
//    *                   CALCULATOR			            *
//    * ================================================= */

//    // set default display values
//    topDisplay.text('');
//    bottomDisplay.text('0');

//    // define object 
//    var calculatorObj = Calculator();

//    // refresh display upon each action
//    calculatorObj.change( function (){
//        bottomDisplay.text(calculatorObj.currentState());
//        topDisplay.text(calculatorObj.previousState());
//    });

//    // actions 
//    $('.num').click(function (e) {
//        calculatorObj.num($(e.target).text());
//    });
    
//    $('#plusminus').click(function () {
//        calculatorObj.plusMinus();
//    });

//    $('#backspace').click(function () {
//        calculatorObj.backspace();
//    });

//    $(".operator").click(function (e) {
//        calculatorObj.operator($(e.target).text());
//    });

//    $("#equal").click(function () {
//        calculatorObj.Eval(calculatorObj.getVal2(), calculatorObj.getVal1(), calculatorObj.getOperator());
//        calcPartial();
//        calculatorObj.Reset();
//    });

//    $('#clear').click(function () {
//        calculatorObj.Clear();
//    });

//    // enable user to use keyboard for calculations
//    $(document).keypress(function (e) {
//        var key = e.which;
//        if (key === 48) { calculatorObj.num(0);; }
//        else if (key === 49) { calculatorObj.num(1); }
//        else if (key === 50) { calculatorObj.num(2); }
//        else if (key === 51) { calculatorObj.num(3); }
//        else if (key === 52) { calculatorObj.num(4); }
//        else if (key === 53) { calculatorObj.num(5); }
//        else if (key === 54) { calculatorObj.num(6); }
//        else if (key === 55) { calculatorObj.num(7); }
//        else if (key === 56) { calculatorObj.num(8); }
//        else if (key === 57) { calculatorObj.num(9); }
//        else if (key === 46) { calculatorObj.num('.'); }
//        else if (key === 42) { calculatorObj.operator('×'); }
//        else if (key === 43) { calculatorObj.operator('+'); }
//        else if (key === 45) { calculatorObj.operator('-'); }
//        else if (key === 47) { calculatorObj.operator('÷'); }
//        else if (key === 94) { calculatorObj.operator('^'); }
//        else if (key === 27) { calculatorObj.Clear(); } // to-do: fix
//        else if (key === 8) { calculatorObj.backspace(); }
//        else if (key === 13 || key === 61) { $("#equal").click(); } // to-do - fix carriage return equal
//        else { return false; }
//    });

//    /* ================================================ *
//    *                   UNIT CONVERTER		            *
//    * ================================================= */
    
//    // to determine which subtypes to display
//    function appendOption(convert_type) {
//        $.each(convert_type, function (i, item) {
//            $("#fromUnit, #toUnit").append("<option value='" + item.Id + "'>" + item.Property[1] + "</option>");
//        });
//    }
//    // when user switches conversion type in dropdown
//    type.on('change', function () {

//        let typeVal = type.val();

//        //reset unit dropdown to ''
//        $('#fromUnit, #toUnit').html('');
//        $('#from, #to').val('');

//        // display appropriate units when unit type is selected
//        if (typeVal == "Mass") {
//            appendOption(mass);
//        } else if (typeVal == "Temperature") {
//            appendOption(temperature);
//        } else if (typeVal == "Time") {
//            appendOption(time);
//        } else if (typeVal == "Volume") {
//            appendOption(volume);
//        } else if (typeVal == "Area") {
//            appendOption(area);
//        } else {
//            appendOption(length);
//        }
//    });

//    // Enable keyboard input
//    // to do - check negative sign
//    $("#from").keypress(function (e) {
//        if (e.which != 8                            // backspace
//            && e.which != 45                        // negative sign (temperature)
//            && e.which != 46                        // decimal pt
//            && (e.which < 48 || e.which > 57)) {    // 0-9
//            return false;
//        }
//    });

//    // Conversions
//    // ex: yd to in: yd to base unit * base unit to in
//    //               yd to base unit = inverse of base unit to yd

//    $('#convert_equal').click(function () {
//        var fromUnit = document.getElementById("fromUnit").value;
//        var toUnit = document.getElementById("toUnit").value;
        
//        var fromValue = parseFloat(document.getElementById("from").value);
//        var toValue = 0;

//        let typeVal = type.val();
        
//        // length
//        if (typeVal === "Length") {
//            // find unit ID in array based on fromUnit
//            var fromCoeff = length.filter(function (unit) {
//                return (unit.Id == fromUnit);
//            //  find coefficient based on unit ID
//            }).map(function (unit) {
//                return (unit.Property[0]);
//            });

//            var toCoeff = length.filter(function (unit) {
//                return (unit.Id == toUnit);
//            }).map(function (unit) {
//                return unit.Property[0];
//            });
//        }
//        // area
//        else if (typeVal === "Area") {
//            var fromCoeff = area.filter(function (unit) {
//                return (unit.Id == fromUnit);
//            }).map(function (unit) {
//                return (unit.Property[0]);
//            });

//            var toCoeff = area.filter(function (unit) {
//                return (unit.Id == toUnit);
//            }).map(function (unit) {
//                return unit.Property[0];
//            });
//        }
//        // mass
//        else if (typeVal === "Mass") {
//            var fromCoeff = mass.filter(function (unit) {
//                return (unit.Id == fromUnit);
//            }).map(function (unit) {
//                return (unit.Property[0]);
//            });

//            var toCoeff = mass.filter(function (unit) {
//                return (unit.Id == toUnit);
//            }).map(function (unit) {
//                return unit.Property[0];
//            });
//        }
//        // time
//        else if (typeVal === "Time") {
//            var fromCoeff = time.filter(function (unit) {
//                return (unit.Id == fromUnit);
//            }).map(function (unit) {
//                return (unit.Property[0]);
//            });

//            var toCoeff = time.filter(function (unit) {
//                return (unit.Id == toUnit);
//            }).map(function (unit) {
//                return unit.Property[0];
//            });
//        }
//        // volume
//        else if (typeVal === "Volume") {
//            var fromCoeff = volume.filter(function (unit) {
//                return (unit.Id == fromUnit);
//            }).map(function (unit) {
//                return (unit.Property[0]);
//            });

//            var toCoeff = volume.filter(function (unit) {
//                return (unit.Id == toUnit);
//            }).map(function (unit) {
//                return unit.Property[0];
//            });
//        }
//        // temperature
//        else {
//            // note - equations not linearly scaled.  equations in controller
//            var toCoeff = 1;
//            var fromCoeff = 1;
//        }
        
//        Convert(fromUnit, fromValue, fromCoeff, toUnit, toCoeff);
//    });

//    // Ajax call to controller to perform conversion
//    function Convert(fromUnit, fromValue, fromCoeff, toUnit, toCoeff) {
//        $.ajax({
//            method: "POST",
//            url: "/Converter/Convert",
//            data: {
//                FromUnit: fromUnit, FromValue: fromValue, FromCoeff: fromCoeff,
//                ToUnit: toUnit, ToCoeff: toCoeff
//            },
//            success: function (result) {
//                toValue = result;
//                $('#to').val(toValue);
//                AddConvert(toValue, fromValue, toUnit, fromUnit);
//            }
//        })
//    }
//    // Save conversion to db
//    function AddConvert(toValue, fromValue, toUnit, fromUnit) {
//        $.ajax({
//            method: "POST",
//            async: false,
//            url: "/Converter/AddConvert",
//            data: {
//                ToValue: toValue, FromUnit: fromUnit, FromValue: fromValue, ToUnit: toUnit
//            },
//            success: function () {
//                // refresh partial view. new conversion will appear
//                convertPartial();
//            }
//        })
//    }

//}); // end of script


///* graveyard

//        //siri.on(function (text) {
//        //    if (text == '2') {
//        //        calculatorObj.num(2)
//        //    }
//        //})



//*/