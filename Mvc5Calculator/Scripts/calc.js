function Calculator() {
    var self = this;
    var _value1 = "";
    var _value2 = "";
    var _operator = "";
    var _result = "";
    var _previousState;     // topDisplay
    var _currentState;      // bottomDisplay
    var changeHandler;      // update display for currentState and previousState
    var newCalc = true;     // no previous calculation exist on display
    

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
    function getResult() {
        return _result;
    }

    function num(val) {
        // allow 1 instance of decimal pt
        if (val === '.' && _value1.indexOf('.') !== -1) {S
            return false;
        }
        _value1 += val;
        _currentState = _value1;
        changeHandler();       
    }
    function plusMinus() {
        _value1 = _value1 * -1;
        _currentState = _value1;
        changeHandler();
    }
    function backspace() {
        _value1 = _value1.slice(0, -1);
        _currentState = _value1;
        changeHandler();
    }
    function operator(op) {
        if (newCalc == false) {
            _value1 = _result;
        }
        _operator = op;
        _previousState = _value1 + " " + _operator;
        _currentState = "";
        _value2 = _value1;
        _value1 = "";
        changeHandler();
    }
    // reset values post evaluation
    function Reset() {
        _value1 = "";
        _value2 = "";
        _operator = "";
        newCalc = false;
    }
    // reset current expression
    function Clear() {
        _value1 = "";
        _value2 = "";
        _previousState = "";
        _currentState = 0;
        newCalc = true;
        changeHandler();
    }

    // evaluate expression through server
    function Eval(v2, v1, operator) {
        $.ajax({
            method: "POST",
            async: false, // keep or value1 & value = ""
            url: "/Calculator/Evaluate",
            data: { a: v2, b: v1, operation: operator },
            success: function (resultMVC) {
                _previousState = _value2 + " " + _operator + " " + _value1;
                _currentState = resultMVC;
                _result = resultMVC;
                AddCalc(_value2, _value1, _operator, _result);
                changeHandler();
                newCalc = false;
                console.log(newCalc);
            },
            error: function () {
                _previousState = "";
                _currentState = "Syntax Error";
                changeHandler();
            }
        });
    }
    // save data to db
    function AddCalc(v2, v1, operator, result) {
        $.ajax({
            method: "POST",
            async: false,
            url: "/Calculator/AddCalc",
            data: { Operand1: v2, Operand2: v1, Operator: operator, Result: result }
            //success: function (response) {
            //    alert("successful db save");
            //    // cant call calcPartial from here
            //    //calcPartial.call();
            //}
        });
    }
    
    //exposing functions
    self.getVal1 = getVal1;
    self.getVal2 = getVal2;
    self.getResult = getResult;
    self.change = change;
    self.currentState = currentState;
    self.previousState = previousState;
    self.num = num;
    self.backspace = backspace;
    self.plusMinus = plusMinus;
    self.operator = operator;
    self.getOperator = getOperator;
    self.Reset = Reset;
    self.Clear = Clear;
    self.Eval = Eval;
    self.AddCalc = AddCalc;
    return self;
}