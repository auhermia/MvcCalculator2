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
    var value1 = "";
    var value2 = "";
    var operator = "";
    var result = 0;
    var calcFirst = true;

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
        { 'Id': 'F', 'Property': [1.0, 'Farenheit (F)'] },
        { 'Id': 'C', 'Property': [1.0, 'Celcius (C)'] }
    ];

    /* ================================================ *
    *                 MAIN NAVIGATION   	            *
    * ================================================= */

    // default - initial page load
    calculator.show();
    converter.hide();
    calcPartial();
    isConverter = false;

    // display calculator portion
    calcbutton.click(function () {
        calculator.show();
        converter.hide();
        calcPartial();
        isConverter = false;
    });

    // display converter portion
    convertbutton.click(function () {
        calculator.hide();
        converter.show();
        convertPartial();
        appendOption(length);
        isConverter = true;
    });


    // Partial View Load functions
    function calcPartial() {
        $.ajax({
            url: "/Calculator/CalcPartial",
            type: "GET",
            success: function (result) {
                $("#expression").html(result);
            }
        });
    }

    function convertPartial() {
        $.ajax({
            url: "/Converter/ConvertPartial",
            type: "GET",
            success: function (result) {
                $("#expression").html(result);
            }
        });
    }

    /* ================================================ *
    *                   CALCULATOR			            *
    * ================================================= */

    topDisplay.text('');
    bottomDisplay.text('0');

    // retrieves text of num key entered and show on display
    $('.num').click(function () {
        var self = $(this);
        value1 += self.text();
        bottomDisplay.text(value1);
        if (operator == '') {
            calcFirst = true;
            topDisplay.text('');
        }
    });

    // positive/negative values
    //$('#plusminus').click({ plusminus(); });

    //function plusminus() {
    //    value1 = value1 * -1;
    //    bottomDisplay.text(value1);
    //}
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

    // + - * / ^
    $(".operator").not('#equal,#signop,#sqrt').click(function () {
        var self = $(this);
        operator = self.text();
        if (calcFirst == false) {
            value1 = result;
        }
        topDisplay.text(value1 + " " + operator);
        bottomDisplay.text("");
        value2 = value1;
        value1 = "";
    });

    $("#equal").click(function () {

        // to do: error handling

        //function findLength(val) {
        //    var valLength = "";
        //    if (val != Math.floor(val)) {
        //        valLength = val.toString().split('.')[1].length;
        //        return valLength;
        //        console.log(typeof valLength);
        //    }
        //    else
        //        valLength = "0";
        //    return parseFloat(valLength);
        //}
        //var length1 = findLength(value1);
        //var length2 = findLength(value2);

        //valLength = (length1 > length2) ? length1 : length2;

        Eval(value2, value1, operator);
        //result = bottomDisplay.text();

        value1 = "";
        value2 = "";
        operator = "";
        calcFirst = false;
    });

    function Eval(v2, v1, operator) {
        $.ajax({
            method: "POST",
            async: false, // keep or value1 & value = ""
            url: "/Calculator/Evaluate",
            data: { a: value2, b: value1, operation: operator },
            success: function (resultMVC) {
                topDisplay.text(value2 + " " + operator + " " + value1);
                bottomDisplay.text(resultMVC);
                result = resultMVC;
                // save to db
                AddCalc();
                $("table tr:last").after("(<tr><td>" + value2 + "</td>" + " " + "<td>" + operator +
                    "</td>" + "<td>" + value1 + "</td>" + "<td> = </td>" + "<td>" + result + "</td></tr>");
            },
            error: function (error) {
                alert(error);
            }
        });
    }

    function AddCalc() {
        $.ajax({
            method: "POST",
            url: "/Calculator/AddCalc",
            data: { Operand1: value2, Operand2: value1, Operator: operator, Result: result },
            success: function (response) {
                alert("Test Result " + result);
            }
        });
    }

    // Clear Memory
    $("#clearMem").click(function () {
        // clear Memory display
        // ajax call to db to delete all records 
        $.ajax({
            method: "POST",
            url: (isConverter == true) ? "/Converter/Delete" : "/Calculator/Delete",
            success: function () {
                $("#expression").hide();
            }
        })
    });

    // Clear everything on display
    $('#clear').click(function () {
        value1 = "";
        value2 = "";
        bottomDisplay.text('0');
        topDisplay.empty();
        calcFirst = true;
    });

    // enable user to use keyboard for calculations
    // note: currently unable to use +/-, esc, and carriage return on some keyboards
    $(document).keypress(function (e) {
        var key = event.which;
        if (key === 48) { $("#0").click(); }
        else if (key === 49) { $("#1").click(); }
        else if (key === 50) { $("#2").click(); }
        else if (key === 51) { $("#3").click(); }
        else if (key === 52) { $("#4").click(); }
        else if (key === 53) { $("#5").click(); }
        else if (key === 54) { $("#6").click(); }
        else if (key === 55) { $("#7").click(); }
        else if (key === 56) { $("#8").click(); }
        else if (key === 57) { $("#9").click(); }
        else if (key === 42) { $("#multiply").click(); }
        else if (key === 43) { $("#plus").click(); }
        else if (key === 45) { $("#minus").click(); }
        else if (key === 46) { $("#decimal").click(); }
        else if (key === 47) { $("#divide").click(); }
        else if (key === 94) { $("#expo").click(); }
        else if (key === 27) { $("#clear").click(); } // fix
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

        //var fromValue = parseFloat(document.getElementById("from").value);
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

        alert(fromUnit + " " + fromValue + " " + fromCoeff + " " + toUnit + " " + toCoeff);
        Convert(fromUnit, fromValue, fromCoeff, toUnit, toCoeff);
        //AddConvert(toValue, fromValue, toUnit, fromUnit);
    });

    // Ajax calls to server
    function Convert(fromUnit, fromValue, fromCoeff, toUnit, toCoeff) {
        $.ajax({
            method: "POST",
            async: false,
            url: "/Converter/Convert",
            data: {
                FromUnit: fromUnit, FromValue: fromValue, FromCoeff: fromCoeff,
                ToUnit: toUnit, ToCoeff: toCoeff
            },
            success: function (result) {
                toValue = result;
                $('#to').val(toValue);
                AddConvert(toValue, fromValue, toUnit, fromUnit);
                $("table tr:last").after("(<tr><td>" + fromValue + "</td>" + " " + "<td>" + fromUnit +
                    "</td>" + "<td> = </td>" + "<td>" + toValue + "</td>" + "<td>" + toUnit + "</td></tr>");
            }
        })
    }

    function AddConvert(toValue, fromValue, toUnit, fromUnit) {
        $.ajax({
            method: "POST",
            url: "/Converter/AddConvert",
            data: {
                ToValue: toValue, FromUnit: fromUnit, FromValue: fromValue, ToUnit: toUnit
            },
            success: function (response) {
                alert("save successful");
            }
        })
    }

}); // end of script