const colors = ['white', '#f0f0f0', '#2ecc71', 'black', '#3498db', '#e74c3c', '#f1c40f'];
const treeColors = ['#333', '#2ecc71', '#3498db', '#e74c3c', '#f1c40f', '#9b59b6', 'white'];
let currentColorIndex = 0;
let currentTreeColorIndex = 0;

function generateChristmasTree(height, top, selectedEmojis, probability) {
    let tree = [];
    // 添加 top 作为第一层
    for (let j = 0; j < height - top.length / 2 - 1; j++) {
        tree.push("&nbsp;");
    }
    tree.push(top);
    tree.push("<br>");
    
    // 生成树的主体部分
    for (let i = 0; i < height; i++) {
        let line = "";
        for (let j = 0; j < height - i - 1; j++) {
            line += "&nbsp;";
        }
        for (let k = 0; k < 2 * i + 1; k++) {
            if (Math.random() < probability) {  // 用户指定的概率添加装饰物
                if (selectedEmojis.length > 0) {
                    line += selectedEmojis[Math.floor(Math.random() * selectedEmojis.length)];
                } else {
                    line += ["O", "@", "o", ".", "💖", "🦦", "✨", "❤️", "🎀", "🌟", "❄️"][Math.floor(Math.random() * 11)];
                }
            } else {
                line += "*";
            }
        }
        tree.push(line);
        tree.push("<br>");
    }
    
    // 添加树的底部
    for (let i = 0; i < 2; i++) {
        let line = "";
        for (let j = 0; j < height - 1; j++) {
            line += "&nbsp;";
        }
        line += "|";
        tree.push(line);
        tree.push("<br>");
    }
    
    return tree.join("");
}

document.getElementById('treeForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const height = parseInt(document.getElementById('height').value);
    const top = document.getElementById('top').value;
    const probability = parseFloat(document.getElementById('probability').value);
    const selectedEmojis = Array.from(document.querySelectorAll('input[name="emojis"]:checked')).map(checkbox => checkbox.value);
    const tree = generateChristmasTree(height, top, selectedEmojis, probability);
    document.getElementById('tree').innerHTML = tree;
});

function copyTree() {
    const tree = document.getElementById('tree');
    const range = document.createRange();
    range.selectNode(tree);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
    alert('Tree copied to clipboard!');
}

function downloadTree() {
    const tree = document.getElementById('tree').innerText;
    const blob = new Blob([tree], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'christmas_tree.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function toggleBackgroundColor() {
    currentColorIndex = (currentColorIndex + 1) % colors.length;
    document.body.style.backgroundColor = colors[currentColorIndex];
}

function toggleTreeColor() {
    currentTreeColorIndex = (currentTreeColorIndex + 1) % treeColors.length;
    document.getElementById('tree').style.color = treeColors[currentTreeColorIndex];
}
