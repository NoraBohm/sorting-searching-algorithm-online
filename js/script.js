const bar_graph = document.getElementById("bar-graph");

function make_bar(percentage) {
    return `<div class="bar" style="--level: ${percentage}%"></div>`;
}