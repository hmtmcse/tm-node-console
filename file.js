//requiring path and fs modules
const path = require('path');
const fs = require('fs');
//joining path of directory
const directoryPath = path.join(__dirname, '../react-mui-ui/ui');
//passsing directoryPath and callback function

let template = "---\n" +
    "name: ___name\n" +
    "route: /react-mui-ui/___url\n" +
    "menu: React MUI UI\n" +
    "---\n" +
    "\n" +
    "# ___name";


function toTitleCase(str) {
    return str.toLowerCase().replace(/(?:^|[\s-/])\w/g, function (match) {
        return match.toUpperCase();
    });
}

fs.readdir(directoryPath, function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }
    //listing all files using forEach
    files.forEach(function (file) {
        let name = file.replace(/.tsx|.ts/g, "");
        let title = toTitleCase(name);
        title = title.replace(/-/g, " ");
        let tmp = template.replace("___url", name);
        tmp = tmp.replace(/___name/g, title);
        console.log(tmp);
        fs.writeFile('./tmp/' + name + ".mdx", tmp, function (err) {
            if (err) throw err;
            console.log('Saved!');
        });
    });
});

