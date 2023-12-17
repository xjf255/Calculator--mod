const d = document,
    $select = d.querySelectorAll('[theme]')
$screen = d.querySelector(".screen__result"),
    $inputs = d.querySelector('.inputs'),
    $number = d.querySelectorAll(".number"),
    $del = d.getElementById("del"),
    $equal = d.getElementById("equal"),
    $reset = d.getElementById("reset"),
    $operators = d.querySelectorAll(".operators"),
    data = [],
    $themes = d.getElementById("theme--default"),
    $themes1 = d.getElementById("theme--light"),
    $themes2 = d.getElementById("theme--neon");
let result = 0,
    operatorSign,
    op = true,
    values = '',
    values2 = '',
    data1,
    data2,
    i = 0;

function del(value = 0) {
    let fragment = value.split('');
    fragment.pop();
    return fragment.join('');
}
del('hola')
d.addEventListener("click", e => {
    if (e.target === $reset) {
        op = true;
        values = '';
        values2 = '';
        $screen.textContent = 0;
        // El método splice() cambia el contenido de un array eliminando 
        // elementos existentes y/o agregando nuevos elementos.
        data.splice(0, data.length);
    }
    if (e.target === $del) {
        if (op) {
            values = del(values);
            // console.log(values)
            $screen.textContent = values;
        }
        else {
            values2 = del(values2);
            // console.log(values2)
            $screen.textContent = values2;
        }
    }
    if (e.target === $equal) {
        data.push(values2);
        result = 0;
        if (data.length > 1) {
            if (operatorSign == "+") {
                result = Number(data[data.length - 2]) + Number(data[data.length - 1]);
            } else if (operatorSign == "-") {
                result = Number(data[data.length - 2]) - Number(data[data.length - 1]);
            } else if (operatorSign == "/") {
                result = Number(data[data.length - 2]) / Number(data[data.length - 1]);
            } else if (operatorSign == "*") {
                result = Number(data[data.length - 2]) * Number(data[data.length - 1]);
            }
            $screen.textContent = result.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            data.push(result);
        } else {
            $screen.textContent = values;
        }
        op = true
        values = '';
        values2 = '';
    }

    $number.forEach(el => {
        if (op) {
            if (e.target === el) {
                values += el.textContent;
                data1 = values.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                $screen.textContent = data1
            }
        } else {
            if (e.target === el) {
                values2 += el.textContent;
                data2 = values2.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                $screen.textContent += data2;
            }
        }
    })

    $operators.forEach(el => {
        if (e.target === el) {
            operatorSign = el.dataset.sign;
            $screen.textContent = data1 + operatorSign;
            op = false;
            data.push(values)
        }
    })
})
d.addEventListener('click', e => {
    if (e.target === $themes) {
        $select.forEach(element => {
            element.classList.remove('light');
            element.classList.remove('neon');
        })
    }
    if (e.target === $themes1) {
        $select.forEach(element => {
            element.classList.add('light');
            element.classList.remove('neon');
        })
    }
    if (e.target === $themes2) {
        $select.forEach(element => {
            element.classList.remove('light');
            element.classList.add('neon');
        })
    }
})