function Calculator() {
    var value1 = "";
    var value2 = "";
    var changeHandler;
    var operator = "";
    var calcFirst = true;
    var self = this
    var _previousState;
    var _currentState;

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
        return value1;
    }
    function getVal2() {
        return value2;
    }

    function getOperator() {
        return operator;
    }

    function num(val) {
        value1 += val;
        _currentState = value1;
        if (operator == '') {
            _previousState = "";
            calcFirst = true;
        }
        changeHandler();
    }
    function plusMinus() {
        value1 = value1 * -1;
        _currentState = value1;
        changeHandler();
    }
    function Operator(op) {
        operator = op;
        _previousState = value1 + " " + operator;
        _currentState = "";
        value2 = value1;
        value1 = "";
        //if (calcFirst == false) {
        //    value1 = result;
        //}
        changeHandler();
    }
    function Reset() {

        // reset values
        value1 = "";
        value2 = "";
        operator = "";
        calcFirst = false;
    }
    function Clear() {
        value1 = "";
        value2 = "";
        _previousState = "";
        _currentState = 0;
        calcFirst = true;
        changeHandler();
    }

    //exposing functions
    self.val1 = val1;
    self.val2 = val2;
    self.change = change;
    self.currentState = currentState;
    self.previousState = previousState;
    self.num = num;
    self.plusMinus = plusMinus;
    self.Operator = Operator;
    self.getOperator = getOperator
    self.Reset = Reset;
    self.Clear = Clear;

    return self;
}