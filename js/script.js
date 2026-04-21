const bar_graph = document.getElementById("bar-graph");

function make_bar(value, selected) {
    return `<div class="bar${selected ? ' selected' : ''}" style="--value: ${value}"></div>`;
}

function set_max(max_value) {
    bar_graph.style.setProperty('--max-value', `${max_value}`);
}

function set_graph(bar_array) {
    bar_graph.style.setProperty('--bars', `${bar_array.length}`);
    bar_graph.innerHTML = bar_array.join("");
}

function barify_array(values, active_index) {
    let bars = [];
    for (let i = 0; i < values.length; i++) {
        bars[i] = make_bar(values[i], active_index == i);
    }
    return bars;
}

function barify_array_simple(values) {
    let bars = [];
    for (let i = 0; i < values.length; i++) {
        bars[i] = make_bar(values[i], false);
    }
    return bars;
}

function render_bars(values, active_index) {
    const bars = barify_array(values, active_index);
    set_graph(bars);
}

function render_bars_simple(values) {
    const bars = barify_array_simple(values);
    set_graph(bars);
}

async function insert_sort(values, wait_time) {
    for (let temp_pos = 0; temp_pos < values.length; temp_pos++) {
        let temp = values[temp_pos];
        let look = temp_pos - 1;

        while (look >= 0 && values[look] > temp) {
            values[look+1] = values[look];
            render_bars(values, look+1);
            await delay(wait_time);
            look--;
        }

        values[look+1] = temp;
    }
    render_bars_simple(values);
    return values;
}

async function bubble_sort(values, wait_time) {
    for (let m = values.length; m > 0; m--) {
        for (let j = 0; j < m; j++) {
            if (values[j] > values[j+1]) {
                const temp = values[j];
                values[j] = values[j+1];
                values[j+1] = temp;

                render_bars(values, j+1);
                await delay(wait_time);
            }
        }
    }
    render_bars_simple(values);
    return values;
}

// Source - https://stackoverflow.com/a/47480429
// Posted by Etienne Martin, modified by community. See post 'Timeline' for change history
// Retrieved 2026-04-21, License - CC BY-SA 4.0
const delay = ms => new Promise(res => setTimeout(res, ms));


async function main() {
    set_max(100);

    const wait_ms = 1000;

    let values = [50, 75, 25, 100, 15, 10];
    console.log(values);

    render_bars_simple(values);

    let new_values = bubble_sort(values, wait_ms);
    console.log(new_values);
}

main().then();