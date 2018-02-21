function Calculator() {
    var _value1 = "";
    var _value2 = "";
    var changeHandler;
    var _operator = "";
    var calcFirst = true;
    var self = this;
    var _previousState;
    var _currentState;
    var result = "";

    function change(handler) {
        changeHandler = handler;
    }
    function currentState() {
        return _currentState;
    }
    function previousState() {
        return _previousState;
    }
    function getVal1() {
        return _value1;
    }
    function getVal2() {
        return _value2;
    }
    function getOperator() {
        return _operator;
    }

    function num(val) {
        _value1 += val;
        _currentState = _value1;
        //if (operator == '') {
        //    _previousState = "";
        //    calcFirst = true;
        //}
        changeHandler();
    }
    function plusMinus() {
        _value1 = _value1 * -1;
        _currentState = _value1;
        changeHandler();
    }
    function Operator(op) {
        _operator = op;
        _previousState = _value1 + " " + _operator;
        _currentState = "";
        _value2 = _value1;
        _value1 = "";
        //if (calcFirst == false) {
        //    value1 = result;
        //}
        changeHandler();
    }
    function Reset() {

        // reset values
        _value1 = "";
        _value2 = "";
        operator = "";
        calcFirst = false;
    }
    function Clear() {
        _value1 = "";
        _value2 = "";
        _previousState = "";
        _currentState = 0;
        calcFirst = true;
        changeHandler();
    }

    // ajax call test
    function Eval(v2, v1, operator) {
        $.ajax({
            method: "POST",
            async: false, // keep or value1 & value = ""
            url: "/Calculator/Evaluate",
            data: { a: v2, b: v1, operation: operator },
            success: function (resultMVC) {
                //topDisplay.text(v2 + " " + operator + " " + v1);
                _previousState = _value2 + " " + _operator + " " + _value1;
               // bottomDisplay.text(resultMVC);
                _currentState = resultMVC;
                result = resultMVC;
               // AddCalc(calculatorObj.getVal2(), calculatorObj.getVal1(), calculatorObj.getOperator(), result);
            },
            error: function (error) {
                alert(error);
            }
        });
    }

    //exposing functions
    self.getVal1 = getVal1;
    self.getVal2 = getVal2;
    self.change = change;
    self.currentState = currentState;
    self.previousState = previousState;
    self.num = num;
    self.plusMinus = plusMinus;
    self.Operator = Operator;
    self.getOperator = getOperator
    self.Reset = Reset;
    self.Clear = Clear;
    self.Eval = Eval;
    return self;
}