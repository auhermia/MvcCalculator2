$(document).ready(function () {

    /* ================================================ *
    *                    DEFININITIONS     	            *
    * ================================================= */

    // --------------- Main Navigation ---------------
    var calculator = $('#calculator');
    var converter = $('#converter');
    var calcbutton = $('#calcbutton');
    var convertbutton = $('#convertbutton');

    // --------------- Calculator ---------------
    //var value1 = "";
    //var value2 = "";
    //var operator = "";
    //var result = 0;
    //var calcFirst = true;

    var topDisplay = $("#topdisplay");
    var bottomDisplay = $("#bottomdisplay");

    // --------------- Unit Converter ---------------
    var type = $('#type');
    var isConverter = true; // to determine ClearMemory button action method

    // converion unit mapping
    var area = [
        { 'Id': 'm2', 'Property': [1.0, 'Square meter (m^2)'] },
        { 'Id': 'cm2', 'Property': [10000, 'Square centimeter (cm^2)'] },
        { 'Id': 'km2', 'Property': [0.000001, 'Square kilometer (km^2)'] },
        { 'Id': 'in2', 'Property': [1550, 'Square inch (in^2)'] },
        { 'Id': 'ft2', 'Property': [10.7639, 'Square foot (ft^2)'] },
        { 'Id': 'mi2', 'Property': [3.861e-7, 'Square mile (mi^2)'] },
        { 'Id': 'acre', 'Property': [0.000247105, 'Acre (acre)'] }
    ];
    var length = [
        { 'Id': 'm', 'Property': [1.0, 'Meter (m)'] },
        { 'Id': 'cm', 'Property': [100, 'Centimeter (cm)'] },
        { 'Id': 'km', 'Property': [.001, 'Kilometer (km)'] },
        { 'Id': 'in', 'Property': [39.36996, 'Inch (in)'] },
        { 'Id': 'ft', 'Property': [3.28084, 'Foot (ft)'] },
        { 'Id': 'yd', 'Property': [1.09361, 'Yard (yd)'] },
        { 'Id': 'mi', 'Property': [0.000621371, 'Mile (mi)'] }
    ];
    var mass = [
        { 'Id': 'kg', 'Property': [1.0, 'Kilogram (kg)'] },
        { 'Id': 'g', 'Property': [1000, 'Gram (g)'] },
        { 'Id': 'oz', 'Property': [35.274, 'Ounce (oz)'] },
        { 'Id': 'lb', 'Property': [2.20462, 'Pound (lb)'] },
        { 'Id': 't', 'Property': [0.00110231, 'Ton (t)'] }
    ];
    var time = [
        { 'Id': 'd', 'Property': [1.0, 'Day (d)'] },
        { 'Id': 'h', 'Property': [24, 'Hour (h)'] },
        { 'Id': 'min', 'Property': [1440, 'Minute (min)'] },
        { 'Id': 'sec', 'Property': [86400, 'Second (sec)'] },
        { 'Id': 'w', 'Property': [0.142857, 'Week (w)'] },
        { 'Id': 'm', 'Property': [0.0328767, 'Month (m)'] },
        { 'Id': 'yr', 'Property': [0.00273973, 'Year (yr)'] }
    ];
    var volume = [
        { 'Id': 'l', 'Property': [1.0, 'Liter (L)'] },
        { 'Id': 'mL', 'Property': [1000, 'Milliliter (mL)'] },
        { 'Id': 'gal', 'Property': [0.264172, 'Gallon (gal)'] }
    ];
    // to do: need to fix calculation ?
    var temperature = [
        { 'Id': '\u00B0F', 'Property': [1.0, 'Farenheit (\u00B0F)'] },
        { 'Id': '\u00B0C', 'Property': [1.0, 'Celcius (\u00B0C)'] }
    ];

    /* ================================================ *
    *                 MAIN NAVIGATION   	            *
    * ================================================= */

    // default - initial page load
    calculator.show();
    converter.hide();
    calcPartial();
    isConverter = false;

    // display calculator portion, hide converter
    calcbutton.click(function () {
        calculator.show();
        converter.hide();
        calcPartial();
        isConverter = false;
    });

    // display converter portion, hide calculatro
    convertbutton.click(function () {
        calculator.hide();
        converter.show();
        convertPartial();
        appendOption(length);
        isConverter = true;
    });


    // Partial View Load function - calculator
    function calcPartial() {
        $.ajax({
            url: "/Calculator/CalcPartial",
            type: "GET",
            success: function (result) {
                alert("calcpartial");
                $("#expression").html(result);
            }
        });
    }
    // Partial View Load function - converter
    function convertPartial() {
        $.ajax({
            url: "/Converter/ConvertPartial",
            type: "GET",
            success: function (result) {
                $("#expression").html(result);
            }
        });
    }

    // Clear Memory
    $("#clearMem").click(function () {
        $.ajax({
            method: "POST",
            url: (isConverter == true) ? "/Converter/Delete" : "/Calculator/Delete",
            success: function () {
                if (isConverter == true) {
                    $("#convexp").hide();
                }
                else {
                    $("#calcexp").hide();
                }
            }
        })
    });

    /* ================================================ *
    *                   CALCULATOR			            *
    * ================================================= */

    topDisplay.text('');
    bottomDisplay.text('0');

    var calculatorObj = Calculator();

    calculatorObj.change( function (){
        bottomDisplay.text(calculatorObj.currentState());
        topDisplay.text(calculatorObj.previousState());
    });

    $('.num').click(function (e) {
        calculatorObj.num($(e.target).text());
    });
    
    $('#plusminus').click(function () {
        calculatorObj.plusMinus();
    });
    
    $(".operator").click(function (e) {
        calculatorObj.Operator($(e.target).text());
    });

    $("#equal").click(function () {
        //Eval(calculatorObj.getVal2(), calculatorObj.getVal1(), calculatorObj.getOperator());
        calculatorObj.Eval(calculatorObj.getVal2(), calculatorObj.getVal1(), calculatorObj.getOperator());
        calculatorObj.Reset();
    });

    // Clear everything on display
    $('#clear').click(function () {
        calculatorObj.Clear();
    });


    
        // square root
    $('#sqrt').click(function () {
        var self = $(this);
        if (calcFirst == false) {
            value1 = result;
        }
        value1n = parseFloat(value1);
        result = Math.sqrt(value1n);
        topDisplay.text(self.text() + value1);
        bottomDisplay.text(result);
        value1 = "";
    });
    
    // Ajax call to evaluate data
    //function Eval(v2, v1, operator) {
    //    $.ajax({
    //        method: "POST",
    //        async: false, // keep or value1 & value = ""
    //        url: "/Calculator/Evaluate",
    //        data: { a: v2, b: v1, operation: operator },
    //        success: function (resultMVC) {
    //            topDisplay.text(v2 + " " + operator + " " + v1);
    //            bottomDisplay.text(resultMVC);
    //            result = resultMVC;
    //            AddCalc(calculatorObj.getVal2(), calculatorObj.getVal1(), calculatorObj.getOperator(), result);
    //        },
    //        error: function (error) {
    //            alert(error);
    //        }
    //    });
    //}

    // Ajax call to save data to db
    function AddCalc(v2, v1, operator, result) {
        $.ajax({
            method: "POST",
            async: false,
            url: "/Calculator/AddCalc",
            data: { Operand1: v2, Operand2: v1, Operator: operator, Result: result },
            success: function (response) {
                alert("test");
                calcPartial();
            }
        });
    }



        //siri.on(function (text) {
        //    if (text == '2') {
        //        calculatorObj.num(2)
        //    }
        //})

    // enable user to use keyboard for calculations
    // note: currently unable to use +/-, esc, and carriage return on some keyboards
    $(document).keypress(function (e) {
        var key = e.which;
        if (key === 48) { calculatorObj.num(0);; }
        else if (key === 49) { calculatorObj.num(1); }
        else if (key === 50) { calculatorObj.num(2); }
        else if (key === 51) { calculatorObj.num(3); }
        else if (key === 52) { calculatorObj.num(4); }
        else if (key === 53) { calculatorObj.num(5); }
        else if (key === 54) { calculatorObj.num(6); }
        else if (key === 55) { calculatorObj.num(7); }
        else if (key === 56) { calculatorObj.num(8); }
        else if (key === 57) { calculatorObj.num(9); }
        else if (key === 42) { calculatorObj.Operator('×'); }
        else if (key === 43) { calculatorObj.Operator('+'); }
        else if (key === 45) { calculatorObj.Operator('-'); }
        else if (key === 46) { calculatorObj.Operator('.'); }
        else if (key === 47) { calculatorObj.Operator('÷'); }
        else if (key === 94) { calculatorObj.Operator('^'); }
        else if (key === 27) { calculatorObj.Clear(); } // fix
        else if (key === 61 || key === 13) { $("#equal").click(); } // return fix
        else { return false; }
    });

    /* ================================================ *
    *                   UNIT CONVERSION		            *
    * ================================================= */


    // function to append units of conversion type
    function appendOption(convert_type) {
        $.each(convert_type, function (i, item) {
            $("#fromUnit, #toUnit").append("<option value='" + item.Id + "'>" + item.Property[1] + "</option>");
        });
    }

    // when user switches conversion type in dropdown
    type.on('change', function () {

        //reset unit dropdown to ''
        $('#fromUnit, #toUnit').html('');
        $('#from, #to').val('');

        let typeVal = type.val();

        // display appropriate units when unit type is selected
        if (typeVal == "Mass") {
            appendOption(mass);
        } else if (typeVal == "Temperature") {
            appendOption(temperature);
        } else if (typeVal == "Time") {
            appendOption(time);
        } else if (typeVal == "Volume") {
            appendOption(volume);
        } else if (typeVal == "Area") {
            appendOption(area);
        } else {
            appendOption(length);
        }
    });

    // Enable keyboard input: allow only numeric values (ascii 48-57), decimal (ascii 46), 
    //      '-', and backspace (ascii 8)

    // to do - check negative sign
    $("#from").keypress(function (e) {
        if (e.which != 8 && e.which != 46 && (e.which < 48 || e.which > 57)) {
            return false;
        }
    });

    // Conversions
    // ex: yd to in: yd to base unit, base unit to in
    //               yd to base unit = inverse of base unit to yd

    $('#convert_equal').click(function () {
        var fromUnit = document.getElementById("fromUnit").value;
        var toUnit = document.getElementById("toUnit").value;
        
        var fromValue = parseFloat(document.getElementById("from").value);
        var toValue = 0;

        let typeVal = type.val();
        
        // length
        if (typeVal == "Length") {
            var fromCoeff = length.filter(function (unit) {
                return (unit.Id == fromUnit);
            }).map(function (unit) {
                return (unit.Property[0]);
            });

            var toCoeff = length.filter(function (unit) {
                return (unit.Id == toUnit);
            }).map(function (unit) {
                return unit.Property[0];
            });
        }
        // area
        else if (typeVal == "Area") {
            var fromCoeff = area.filter(function (unit) {
                return (unit.Id == fromUnit);
            }).map(function (unit) {
                return (unit.Property[0]);
            });

            var toCoeff = area.filter(function (unit) {
                return (unit.Id == toUnit);
            }).map(function (unit) {
                return unit.Property[0];
            });
        }
        // mass
        else if (typeVal == "Mass") {
            var fromCoeff = mass.filter(function (unit) {
                return (unit.Id == fromUnit);
            }).map(function (unit) {
                return (unit.Property[0]);
            });

            var toCoeff = mass.filter(function (unit) {
                return (unit.Id == toUnit);
            }).map(function (unit) {
                return unit.Property[0];
            });
        }
        // time
        else if (typeVal == "Time") {
            var fromCoeff = time.filter(function (unit) {
                return (unit.Id == fromUnit);
            }).map(function (unit) {
                return (unit.Property[0]);
            });

            var toCoeff = time.filter(function (unit) {
                return (unit.Id == toUnit);
            }).map(function (unit) {
                return unit.Property[0];
            });
        }
        // volume
        else if (typeVal == "Volume") {
            var fromCoeff = volume.filter(function (unit) {
                return (unit.Id == fromUnit);
            }).map(function (unit) {
                return (unit.Property[0]);
            });

            var toCoeff = volume.filter(function (unit) {
                return (unit.Id == toUnit);
            }).map(function (unit) {
                return unit.Property[0];
            });
        }
        // temperature
        else {
            var toCoeff = 1;
            var fromCoeff = 1;
        }
        
        Convert(fromUnit, fromValue, fromCoeff, toUnit, toCoeff);
    });

    // Perform conversion
    function Convert(fromUnit, fromValue, fromCoeff, toUnit, toCoeff) {
        $.ajax({
            method: "POST",
            url: "/Converter/Convert",
            data: {
                FromUnit: fromUnit, FromValue: fromValue, FromCoeff: fromCoeff,
                ToUnit: toUnit, ToCoeff: toCoeff
            },
            success: function (result) {
                toValue = result;
                $('#to').val(toValue);
                AddConvert(toValue, fromValue, toUnit, fromUnit);
            }
        })
    }
    // Save conversion to db
    function AddConvert(toValue, fromValue, toUnit, fromUnit) {
        $.ajax({
            method: "POST",
            async: false,
            url: "/Converter/AddConvert",
            data: {
                ToValue: toValue, FromUnit: fromUnit, FromValue: fromValue, ToUnit: toUnit
            },
            success: function () {
                convertPartial();
            }
        })
    }

}); // end of script