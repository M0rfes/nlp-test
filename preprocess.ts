import * as fs from "fs/promises";

const process = async () => {
  const file1 = await fs.readFile("file1.csv", "utf8");
  const lines = file1.split("\n");
  const tail = lines.slice(1);
  const file2 = [];
  for (const line of tail) {
    const cols = line.split(",");
    let type = cols[cols.length - 1];
    const sen = cols.slice(0, cols.length - 1).join(" ");
    if (sen.toLowerCase().startsWith("can ")) {
      type = "command";
    }
    file2.push(
      `${type.replace(/[\r\n]+/g, "")},${sen.replace(/[\r\n]+/g, "")}`
    );
  }
  await fs.writeFile("file2.csv", file2.join("\n"));
};

process();
